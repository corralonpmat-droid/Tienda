// Service worker de Corralón PMAT — cachea el shell de la app para que abra
// al instante. El catálogo (productos.json) es siempre network-first: los
// precios nunca deben mostrarse viejos si hay señal.
//
// Subir CACHE_VERSION cuando cambie algo en ARCHIVOS_PRECACHE (mismo criterio
// que el "?v=16" de estilos.css en index.html) para que los celulares con la
// versión anterior instalada bajen la nueva.
var CACHE_VERSION = "pmat-v8";

// Los nombres de estilos.css/app.js llevan el mismo "?v=N" que pide
// index.html — si no coinciden exacto, cachea una URL que la página nunca
// pide y el precache no sirve de nada. Al subir esos "?v=" en index.html,
// actualizar acá también (y subir CACHE_VERSION de arriba para que los
// celulares con el service worker viejo bajen la lista nueva).
var ARCHIVOS_PRECACHE = [
  "./",
  "index.html",
  "estilos.css?v=23",
  "app.js?v=24",
  "manifest.json",
  "logo.png",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", function(event){
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache){
      return cache.addAll(ARCHIVOS_PRECACHE);
    })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(nombres){
      return Promise.all(
        nombres.filter(function(n){ return n !== CACHE_VERSION; })
               .map(function(n){ return caches.delete(n); })
      );
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(event){
  var req = event.request;
  if(req.method !== "GET") return;

  var url = new URL(req.url);
  if(url.origin !== self.location.origin) return; // Google Fonts, etc. — sin tocar

  // productos.json y sugeridos.json: siempre intenta la red primero. Un
  // precio viejo (o un "Llevá también" desactualizado) es peor que una
  // espera de medio segundo.
  if(url.pathname.indexOf("productos.json") !== -1 || url.pathname.indexOf("sugeridos.json") !== -1){
    event.respondWith(
      fetch(req).then(function(res){
        var copia = res.clone();
        caches.open(CACHE_VERSION).then(function(cache){ cache.put(req, copia); });
        return res;
      }).catch(function(){ return caches.match(req); })
    );
    return;
  }

  // Resto del shell: cache-first, y de paso actualiza la copia guardada.
  event.respondWith(
    caches.match(req).then(function(cacheado){
      var red = fetch(req).then(function(res){
        if(res && res.ok){
          var copia = res.clone();
          caches.open(CACHE_VERSION).then(function(cache){ cache.put(req, copia); });
        }
        return res;
      }).catch(function(){ return cacheado; });
      return cacheado || red;
    })
  );
});
