(function(){
  "use strict";

  // Número de WhatsApp que recibe los pedidos (el de Configuración fiscal del sistema).
  var PHONE = "5493874493082";

  var CATS = [
    {key:"cemento",      label:"Cemento y Áridos"},
    {key:"ladrillos",    label:"Ladrillos y Bloques"},
    {key:"hierros",      label:"Hierros y Alambres"},
    {key:"plomeria",     label:"Sanitarios y Plomería"},
    {key:"electricidad", label:"Electricidad"},
    {key:"pinturas",     label:"Pinturas"},
    {key:"ceramicos",    label:"Cerámicos y Pisos"},
    {key:"ferreteria",   label:"Ferretería y Bulonería"}
  ];

  // Catálogo: hoy escrito a mano acá, con precios y códigos reales tomados de
  // corralon.db (2026-09-14). El sistema interno ya tiene listo el endpoint
  // GET /api/catalogo-web (server.py) que devuelve los artículos marcados
  // "Mostrar en la web" con su precio, unidad, rubro y foto — cuando se
  // decida cómo van a viajar esos datos hasta este sitio (llamada en vivo,
  // exportación periódica, lo que arme el proveedor de hosting) esta lista
  // se reemplaza por ese resultado. `cod` es el código real del artículo:
  // de ahí sale el nombre de archivo de la foto en imagenes/<cod>.jpg.
  var ITEMS = [
    {id:"cem-negra",   cod:"CLN",  cat:"cemento", desc:"Bolsa de cemento Loma Negra x 25 kg", unit:"la bolsa", price:7700.00, frac:false},
    {id:"cem-holcim",  cod:"CHO",  cat:"cemento", desc:"Bolsa de cemento Holcim x 25 kg", unit:"la bolsa", price:7700.00, frac:false},
    {id:"cem-blanco",  cod:"6470", cat:"cemento", desc:"Cemento blanco Prego", unit:"el kg", price:3125.92, frac:true},
    {id:"cal-viva",    cod:"C",    cat:"cemento", desc:"Bolsa de cal viva", unit:"la bolsa", price:2880.00, frac:false},
    {id:"cal-sta-elena", cod:"CHS", cat:"cemento", desc:"Bolsa de cal hidratada Santa Elena x 20 kg", unit:"la bolsa", price:6600.00, frac:false},
    {id:"arena-med",   cod:"BM",   cat:"cemento", desc:"Bolsa de arena mediana", unit:"la bolsa", price:800.00, frac:false},
    {id:"arena-fina",  cod:"BF",   cat:"cemento", desc:"Bolsa de arena fina", unit:"la bolsa", price:900.00, frac:false},

    {id:"ladr-12",     cod:"L12", cat:"ladrillos", desc:"Ladrillón 12 x 18 x 30 cm", unit:"la unidad", price:970.90, frac:false},
    {id:"ladr-8",      cod:"L8",  cat:"ladrillos", desc:"Ladrillón 8 x 18 x 30 cm", unit:"la unidad", price:734.08, frac:false},
    {id:"ladr-18",     cod:"L18", cat:"ladrillos", desc:"Ladrillón 18 x 18 x 30 cm", unit:"la unidad", price:1302.38, frac:false},

    {id:"hierro-6",    cod:"-6",   cat:"hierros", desc:"Barra de hierro del 6", unit:"la barra", price:6592.30, frac:false},
    {id:"hierro-10",   cod:"-10",  cat:"hierros", desc:"Barra de hierro del 10", unit:"la barra", price:17468.37, frac:false},
    {id:"alambre-14",  cod:"KA14", cat:"hierros", desc:"Alambre negro N°14", unit:"el kg", price:4400.14, frac:true},
    {id:"alambre-16",  cod:"KA16", cat:"hierros", desc:"Alambre negro N°16", unit:"el kg", price:4400.14, frac:true},

    {id:"cano-34",     cod:"9586", cat:"plomeria", desc:"Caño flexible blanco 3/4\" (Genrod)", unit:"el metro", price:453.24, frac:true},
    {id:"cano-78",     cod:"940",  cat:"plomeria", desc:"Caño flexible blanco 7/8\" (Genrod)", unit:"el metro", price:566.79, frac:true},
    {id:"llave-palanca", cod:"VI1-2", cat:"plomeria", desc:"Llave de paso metal a palanca 1/2\" (Valfort)", unit:"la unidad", price:10331.88, frac:false},
    {id:"llave-plastica", cod:"VD1-2", cat:"plomeria", desc:"Llave de paso plástica 1/2\" (Duke)", unit:"la unidad", price:4848.29, frac:false},
    {id:"fuelle-inodoro", cod:"FG07M", cat:"plomeria", desc:"Fuelle de goma para inodoro N°50 (Malvar)", unit:"la unidad", price:4756.04, frac:false},

    {id:"cable-25",    cod:"117119", cat:"electricidad", desc:"Cable 1 x 2,5 mm rojo (Wireflex)", unit:"el metro", price:556.56, frac:true},
    {id:"cable-utp",   cod:"4740",   cat:"electricidad", desc:"Cable UTP Cat 5E exterior", unit:"el metro", price:649.38, frac:true},
    {id:"cable-coaxil", cod:"6646",  cat:"electricidad", desc:"Cable coaxil CCTV RG-6", unit:"el metro", price:650.00, frac:true},

    {id:"pint-agua-vento", cod:"9808", cat:"pinturas", desc:"Pintura al agua blanca (Vento)", unit:"el envase", price:7299.85, frac:false},
    {id:"latex-solar", cod:"1176", cat:"pinturas", desc:"Látex interior x 1 L (Solar)", unit:"la unidad", price:4623.68, frac:false},
    {id:"esmalte-vento", cod:"1417", cat:"pinturas", desc:"Esmalte sintético blanco x 1/2 L (Vento)", unit:"la unidad", price:7089.15, frac:false},
    {id:"pint-asfaltica", cod:"PINT.CLIP.001", cat:"pinturas", desc:"Pintura asfáltica x 1 L (Clipperflex)", unit:"la unidad", price:6682.20, frac:false},

    {id:"ceram-mapuche", cod:"PIS.AL.3636.1.060", cat:"ceramicos", desc:"Cerámico piso Mapuche 1° 36 x 36 cm", unit:"el m²", price:9453.50, frac:true},
    {id:"crucetas",    cod:"598", cat:"ceramicos", desc:"Crucetas para cerámico 2,5 mm x 250 u (Crechio)", unit:"la caja", price:4099.15, frac:false},

    {id:"tornillo-fix", cod:"TFE344", cat:"ferreteria", desc:"Tornillo Fix 18 x 19", unit:"la unidad", price:32.40, frac:false},
    {id:"tirafondo",   cod:"1210", cat:"ferreteria", desc:"Tirafondo 5/16\" (7,9 mm) x 2\"", unit:"la unidad", price:212.47, frac:false},
    {id:"bisagra-pomela", cod:"M00704RO", cat:"ferreteria", desc:"Bisagra pomela italiana 7 mm", unit:"la unidad", price:19.16, frac:false},
    {id:"bisagra-libro", cod:"76-J77902R3", cat:"ferreteria", desc:"Bisagra libro de zinc 25 mm (Fumaca)", unit:"la unidad", price:211.24, frac:false},
    {id:"grampa-omega", cod:"GO06E", cat:"ferreteria", desc:"Grampa omega para caño de agua 3/4\" (Eco)", unit:"la unidad", price:256.35, frac:false}
  ];

  var BRANDS = [
    "Loma Negra","Holcim","Santa Elena","Prego","Saladillo","IPS","Plastiferro","Genrod",
    "Ferrum","Valfort","Duke","Malvar","Vento","Solar","Fumaca","Crechio","Epuye","Wireflex"
  ];

  var ICONS = {
    cemento:'<path d="M8 4h8l2 5-1 11H7L6 9z"/><path d="M8 9h8"/>',
    ladrillos:'<rect x="3" y="6" width="8" height="5"/><rect x="13" y="6" width="8" height="5"/><rect x="8" y="13" width="8" height="5"/>',
    hierros:'<line x1="4" y1="20" x2="20" y2="4"/><line x1="8" y1="20" x2="20" y2="8"/><line x1="12" y1="20" x2="20" y2="12"/>',
    plomeria:'<path d="M6 4v8a4 4 0 0 0 4 4h8"/><circle cx="6" cy="4" r="2"/><circle cx="18" cy="16" r="2"/>',
    electricidad:'<polygon points="13,2 4,14 11,14 9,22 20,9 13,9"/>',
    pinturas:'<path d="M12 3c3 3 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 3-7 6-10z"/>',
    ceramicos:'<rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/>',
    ferreteria:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2z"/>'
  };

  function iconSvg(cat, size){
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+ICONS[cat]+'</svg>';
  }
  function escAttr(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  // Foto real si existe en imagenes/<cod>.jpg (mismo criterio que
  // static/imagenes/<cod>.jpg del sistema interno); si el archivo no está,
  // el onerror la cambia por el ícono del rubro.
  function fotoHtml(item, alto){
    if(!item.cod) return iconSvg(item.cat, alto);
    return '<img src="imagenes/'+encodeURIComponent(item.cod)+'.jpg" alt="'+escAttr(item.desc)+'" loading="lazy" '+
      'onerror="this.parentElement.innerHTML=window.PMAT_ICON(\''+item.cat+'\','+alto+')">';
  }
  window.PMAT_ICON = iconSvg; // el onerror de arriba lo llama desde el HTML generado

  /* ---------- ruteo entre vistas (Inicio / Calculadoras / Contacto) ---------- */
  var VIEWS = ["inicio","calculadoras","contacto"];
  function showView(view, anchor){
    if(VIEWS.indexOf(view) === -1) view = "inicio";
    VIEWS.forEach(function(v){
      var el = document.getElementById("view-"+v);
      if(el) el.hidden = (v !== view);
    });
    Array.prototype.forEach.call(document.querySelectorAll(".site-nav .route-link"), function(a){
      a.setAttribute("aria-current", a.getAttribute("data-view") === view ? "page" : "false");
    });
    if(anchor){
      requestAnimationFrame(function(){
        var el = document.getElementById(anchor);
        if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
      });
    } else {
      window.scrollTo(0, 0);
    }
  }
  function goTo(view, anchor){
    history.pushState({view:view}, "", "#" + view);
    showView(view, anchor);
  }
  Array.prototype.forEach.call(document.querySelectorAll(".route-link"), function(a){
    a.addEventListener("click", function(e){
      e.preventDefault();
      goTo(a.getAttribute("data-view") || "inicio", a.getAttribute("data-anchor") || null);
    });
  });
  window.addEventListener("popstate", function(){
    showView((location.hash || "#inicio").replace("#",""));
  });

  var state = {cat:"todos", q:"", cart:{}, extras:[], form:{
    nombre:"", entrega:"retiro", direccion:"", ubicacion:"", contacto:"", referencia:""
  }};

  try{
    var saved = JSON.parse(localStorage.getItem("pmat_pedido_v2") || "null");
    if(saved && typeof saved === "object"){
      if(saved.cart) state.cart = saved.cart;
      if(Array.isArray(saved.extras)) state.extras = saved.extras;
      if(saved.form) state.form = Object.assign(state.form, saved.form);
    }
  }catch(e){}

  function save(){
    try{ localStorage.setItem("pmat_pedido_v2", JSON.stringify({cart:state.cart, extras:state.extras, form:state.form})); }catch(e){}
  }

  function fmt(n){ return "$" + n.toLocaleString("es-AR",{minimumFractionDigits:2,maximumFractionDigits:2}); }
  function fmtQty(n){ return (Math.round(n*100)/100).toLocaleString("es-AR",{maximumFractionDigits:2}); }
  function byId(id){ for(var i=0;i<ITEMS.length;i++){ if(ITEMS[i].id===id) return ITEMS[i]; } return null; }
  function minQty(it){ return it.frac ? 0.5 : 1; }
  function unitCorta(u){ return u.replace(/^(la|el) /,''); }
  function norm(s){
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9\s/".x-]/g," ");
  }

  var toastTimer;
  function toast(msg){
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ el.classList.remove("show"); }, 2200);
  }

  function setQty(id, qty){
    var it = byId(id);
    if(!it) return;
    var mn = minQty(it);
    if(!(qty > 0)) qty = mn;
    state.cart[id] = Math.max(mn, Math.round(qty*100)/100);
    save(); render("all");
  }
  function addQty(id, qty){
    var it = byId(id);
    if(!it) return;
    state.cart[id] = Math.round(((state.cart[id]||0) + qty)*100)/100;
  }
  function step(id, dir){
    var it = byId(id);
    var d = it.frac ? 0.5 : 1;
    setQty(id, (state.cart[id] || minQty(it)) + dir*d);
  }
  function agregar(id){
    var it = byId(id);
    state.cart[id] = minQty(it);
    save(); render("all");
    toast("Agregado al pedido ✓");
  }
  function removeLine(id){ delete state.cart[id]; save(); render("all"); }

  function matches(item){
    if(state.cat !== "todos" && item.cat !== state.cat) return false;
    if(state.q){
      var q = norm(state.q).trim();
      if(q && norm(item.desc).indexOf(q) === -1) return false;
    }
    return true;
  }

  /* ---------- marcas ---------- */
  function renderBrandTicker(){
    var one = BRANDS.map(function(b){ return '<span class="ticker-item">'+b+'</span>'; }).join("");
    document.getElementById("brandTrack").innerHTML = one + one;
  }
  function renderBrandsGrid(){
    document.getElementById("brandsGrid").innerHTML =
      BRANDS.map(function(b){ return '<span>'+b+'</span>'; }).join("");
  }

  /* ---------- rubros ---------- */
  function renderRubros(){
    var grid = document.getElementById("rubroGrid");
    grid.innerHTML = CATS.map(function(c){
      var n = ITEMS.filter(function(i){return i.cat===c.key;}).length;
      return '<button class="rubro" data-cat="'+c.key+'">' +
        '<span class="ico">'+iconSvg(c.key,26)+'</span>' +
        '<span><b>'+c.label+'</b><small>'+n+' con precio</small></span>' +
      '</button>';
    }).join("");
    Array.prototype.forEach.call(grid.querySelectorAll(".rubro"), function(b){
      b.addEventListener("click", function(){
        state.cat = b.getAttribute("data-cat");
        render("all");
        document.getElementById("catalogo").scrollIntoView({behavior:"smooth", block:"start"});
      });
    });
  }

  /* ---------- catálogo ---------- */
  function renderChips(){
    var row = document.getElementById("chipRow");
    var all = [{key:"todos",label:"Todos"}].concat(CATS);
    row.innerHTML = all.map(function(c){
      return '<button class="chip" role="tab" aria-pressed="'+(state.cat===c.key)+'" data-cat="'+c.key+'">'+c.label+'</button>';
    }).join("");
    Array.prototype.forEach.call(row.querySelectorAll(".chip"), function(btn){
      btn.addEventListener("click", function(){ state.cat = btn.getAttribute("data-cat"); render("all"); });
    });
  }

  function itemCard(item){
    var qty = state.cart[item.id];
    var on = qty != null;
    var mn = minQty(item);
    var acciones = on
      ? '<div class="stepper" data-id="'+item.id+'">' +
          '<button type="button" data-act="dec" aria-label="Restar">–</button>' +
          '<input type="number" min="'+mn+'" step="'+(item.frac?'0.5':'1')+'" value="'+qty+'" aria-label="Cantidad de '+escAttr(item.desc)+'">' +
          '<button type="button" data-act="inc" aria-label="Sumar">+</button>' +
        '</div>' +
        '<button type="button" class="item-quit" data-quit="'+item.id+'">Quitar</button>'
      : '<button type="button" class="btn btn-primary btn-sm btn-block" data-add="'+item.id+'">Agregar</button>';
    return '<article class="item'+(on?' in-cart':'')+'">' +
      (on ? '<span class="item-flag">En tu pedido</span>' : '') +
      '<div class="item-photo">'+fotoHtml(item,44)+'</div>' +
      '<div class="item-body">' +
        '<p class="item-desc">'+item.desc+'</p>' +
        '<p class="item-unit">precio por '+unitCorta(item.unit)+'</p>' +
        '<span class="price">'+fmt(item.price)+'</span>' +
        '<div class="item-actions">'+acciones+'</div>' +
      '</div>' +
    '</article>';
  }

  function renderCatalog(){
    var root = document.getElementById("catalogRoot");
    var cats = state.cat === "todos" ? CATS : CATS.filter(function(c){return c.key===state.cat;});
    var html = "", any = false;
    cats.forEach(function(c){
      var items = ITEMS.filter(function(i){return i.cat===c.key && matches(i);});
      if(!items.length) return;
      any = true;
      var total = ITEMS.filter(function(i){return i.cat===c.key;}).length;
      html += '<section class="cat-section"><h3>'+c.label+' <small>'+items.length+' de '+total+'</small></h3>' +
              '<div class="item-grid">'+items.map(itemCard).join("")+'</div></section>';
    });
    root.innerHTML = any ? html :
      '<div class="empty-state">No encontramos artículos con ese criterio.<br>Probá otra búsqueda, o pegá tu lista y lo cotizamos a mano.</div>';

    Array.prototype.forEach.call(root.querySelectorAll("[data-add]"), function(btn){
      btn.addEventListener("click", function(){ agregar(btn.getAttribute("data-add")); });
    });
    Array.prototype.forEach.call(root.querySelectorAll("[data-quit]"), function(btn){
      btn.addEventListener("click", function(){ removeLine(btn.getAttribute("data-quit")); });
    });
    Array.prototype.forEach.call(root.querySelectorAll(".stepper"), function(st){
      var id = st.getAttribute("data-id");
      Array.prototype.forEach.call(st.querySelectorAll("button"), function(btn){
        btn.addEventListener("click", function(){ step(id, btn.getAttribute("data-act")==="inc"?1:-1); });
      });
      var input = st.querySelector("input");
      input.addEventListener("change", function(){ setQty(id, parseFloat(String(input.value).replace(",", "."))); });
    });
  }

  /* ---------- pegá tu lista ---------- */
  function parseLine(line){
    var m = line.match(/^\s*(\d+(?:[.,]\d+)?)\s*(.*)$/);
    var qty = m ? parseFloat(m[1].replace(",", ".")) : 1;
    var text = m ? m[2] : line;
    return {qty: qty > 0 ? qty : 1, text: text.trim()};
  }
  var STOP = ["bolsa","bolsas","barra","barras","unidad","unidades","metro","metros","caja","cajas","del","para","por"];
  function bestMatch(text){
    var toks = norm(text).split(/\s+/).filter(function(t){ return t.length >= 3 && STOP.indexOf(t) === -1; });
    if(!toks.length) return null;
    var best = null, bestScore = 0;
    ITEMS.forEach(function(it){
      var hay = norm(it.desc), score = 0;
      toks.forEach(function(t){ if(hay.indexOf(t) !== -1) score += t.length; });
      if(score > bestScore){ bestScore = score; best = it; }
    });
    return bestScore >= 4 ? best : null;
  }
  function runPaste(){
    var raw = document.getElementById("pasteArea").value.split("\n");
    var added = 0, notFound = [];
    raw.forEach(function(line){
      if(!line.trim()) return;
      var p = parseLine(line);
      var it = bestMatch(p.text);
      if(it){ addQty(it.id, it.frac ? p.qty : Math.max(1, Math.round(p.qty))); added++; }
      else { notFound.push(line.trim()); }
    });
    state.extras = notFound;
    save(); render("all");
    var box = document.getElementById("pasteResult");
    box.hidden = false;
    var html = "";
    if(added) html += '<b>Sumamos '+added+(added===1?' línea':' líneas')+' al pedido ✓</b>';
    if(notFound.length){
      html += (added?'<br>':'') + 'Estas no las encontramos en el catálogo publicado, las mandamos igual para cotizarte a mano:' +
        '<ul>'+notFound.map(function(l){return '<li>'+escAttr(l)+'</li>';}).join("")+'</ul>';
    }
    if(!added && !notFound.length) html = 'Escribí tu lista arriba, una línea por material.';
    box.innerHTML = html;
    if(added) toast("Lista cargada al pedido ✓");
  }

  /* ---------- calculadoras ---------- */
  var LADR_POR_M2 = 16, LADR_DESP = 1.05, CER_DESP = 1.08, M2_POR_CAJA = 20;
  function calcLadr(){
    var m2 = parseFloat(document.getElementById("cLadM2").value) || 0;
    var id = document.getElementById("cLadTipo").value;
    var it = byId(id);
    var u = Math.ceil(m2 * LADR_POR_M2 * LADR_DESP);
    document.getElementById("cLadOut").innerHTML =
      '<div>Necesitás <b>'+fmtQty(u)+'</b> ladrillones</div>' +
      '<div class="sub">'+it.desc+' · <b>'+fmt(Math.round(u*it.price*100)/100)+'</b></div>';
    return {id:id, u:u};
  }
  function calcCer(){
    var m2 = parseFloat(document.getElementById("cCerM2").value) || 0;
    var it = byId("ceram-mapuche"), cru = byId("crucetas");
    var comprar = Math.ceil(m2 * CER_DESP * 100) / 100;
    var cajas = Math.max(1, Math.ceil(m2 / M2_POR_CAJA));
    var tot = comprar*it.price + cajas*cru.price;
    document.getElementById("cCerOut").innerHTML =
      '<div>Comprá <b>'+fmtQty(comprar)+' m²</b> de cerámico y <b>'+cajas+'</b> caja'+(cajas>1?'s':'')+' de crucetas</div>' +
      '<div class="sub">Total estimado · <b>'+fmt(Math.round(tot*100)/100)+'</b></div>';
    return {m2:comprar, cajas:cajas};
  }

  /* ---------- pedido / WhatsApp ---------- */
  function cartLines(){
    return Object.keys(state.cart).map(function(id){
      var it = byId(id), qty = state.cart[id];
      return {id:id, desc:it.desc, unit:it.unit, price:it.price, qty:qty, subtotal:Math.round(it.price*qty*100)/100};
    });
  }
  function buildMessage(lines, total){
    var f = state.form;
    var msg = "Hola! " + (f.nombre ? "Soy " + f.nombre + ". " : "") + "Quiero hacer este pedido:\n\n*MATERIALES*\n";
    lines.forEach(function(l){
      msg += "• " + l.desc + " — *" + fmtQty(l.qty) + "* x " + fmt(l.price) + " = " + fmt(l.subtotal) + "\n";
    });
    msg += "\n*TOTAL ESTIMADO:* " + fmt(total) + "\n";
    if(f.entrega === "envio"){
      msg += "\n*ENTREGA:* Envío a obra\n";
      if(f.direccion)  msg += "Dirección: " + f.direccion + "\n";
      if(f.ubicacion)  msg += "Ubicación: " + f.ubicacion + "\n";
      if(f.contacto)   msg += "Contacto: " + f.contacto + "\n";
      if(f.referencia) msg += "Referencia: " + f.referencia + "\n";
      msg = msg.replace(/\n$/, "");
    } else {
      msg += "\n*ENTREGA:* Retiro en el corralón";
    }
    if(state.extras.length){
      msg += "\n\n*TAMBIÉN NECESITO (no estaba publicado):*\n";
      state.extras.forEach(function(l){ msg += "• " + l + "\n"; });
    }
    msg += "\n\n(Pedido armado desde el catálogo web)";
    return msg;
  }
  function renderCart(){
    var lines = cartLines();
    var list = document.getElementById("cartItems");
    var total = lines.reduce(function(a,l){return a+l.subtotal;},0);
    var waBtn = document.getElementById("waBtn");

    if(!lines.length && !state.extras.length){
      list.innerHTML = '<li class="cart-empty">Todavía no elegiste nada.<br>Agregá un artículo del catálogo o pegá tu lista para empezar.</li>';
    } else {
      var html = lines.map(function(l){
        return '<li class="cart-line">' +
          '<div><div class="cart-line-desc">'+l.desc+'</div>' +
          '<div class="cart-line-meta">'+fmtQty(l.qty)+' '+unitCorta(l.unit)+' × '+fmt(l.price)+'</div></div>' +
          '<div class="cart-line-right"><span class="cart-line-total">'+fmt(l.subtotal)+'</span>' +
          '<button type="button" class="cart-remove" data-id="'+l.id+'">Quitar</button></div>' +
        '</li>';
      }).join("");
      if(state.extras.length){
        html += '<li class="cart-line"><div><div class="cart-line-desc">A cotizar a mano</div>' +
          '<div class="cart-line-meta">'+state.extras.length+' línea'+(state.extras.length>1?'s':'')+' sin precio publicado</div></div>' +
          '<div class="cart-line-right"><span class="cart-line-total">—</span>' +
          '<button type="button" class="cart-remove" data-extras="1">Quitar</button></div></li>';
      }
      list.innerHTML = html;
      Array.prototype.forEach.call(list.querySelectorAll(".cart-remove"), function(btn){
        btn.addEventListener("click", function(){
          if(btn.getAttribute("data-extras")){ state.extras = []; save(); render("all"); }
          else removeLine(btn.getAttribute("data-id"));
        });
      });
    }

    var n = lines.length + (state.extras.length ? 1 : 0);
    document.getElementById("cartCount").textContent = n + (n===1 ? " artículo" : " artículos");
    document.getElementById("cartTotal").textContent = fmt(total);
    document.getElementById("headCartLabel").textContent = n ? ("Mi pedido · " + n) : "Mi pedido";
    document.getElementById("cartClear").hidden = !n;

    if(!n){ waBtn.setAttribute("aria-disabled","true"); waBtn.removeAttribute("href"); }
    else {
      waBtn.removeAttribute("aria-disabled");
      waBtn.href = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(buildMessage(lines, total));
    }
  }

  function render(what){
    if(what === "all"){ renderChips(); renderCatalog(); }
    renderCart();
  }

  /* ---------- eventos ---------- */
  document.getElementById("searchInput").addEventListener("input", function(e){
    state.q = e.target.value; renderCatalog();
  });
  document.getElementById("pasteBtn").addEventListener("click", runPaste);
  document.getElementById("cartToggle").addEventListener("click", function(){
    var panel = document.getElementById("cartPanel");
    var open = panel.classList.toggle("expanded");
    this.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.getElementById("headCart").addEventListener("click", function(){
    var wasHidden = document.getElementById("view-inicio").hidden;
    if(wasHidden) goTo("inicio", null);
    requestAnimationFrame(function(){
      var panel = document.getElementById("cartPanel");
      panel.scrollIntoView({behavior:"smooth", block:"center"});
      if(window.matchMedia("(max-width: 1019px)").matches){
        panel.classList.add("expanded");
        document.getElementById("cartToggle").setAttribute("aria-expanded","true");
      }
    });
  });
  document.getElementById("cartClear").addEventListener("click", function(){
    state.cart = {}; state.extras = []; save(); render("all"); toast("Pedido vaciado");
  });
  document.getElementById("fNombre").addEventListener("input", function(e){
    state.form.nombre = e.target.value; save(); renderCart();
  });
  ["direccion","ubicacion","contacto","referencia"].forEach(function(campo){
    document.getElementById("f" + campo.charAt(0).toUpperCase() + campo.slice(1)).addEventListener("input", function(e){
      state.form[campo] = e.target.value; save(); renderCart();
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll("#entregaRow .radio-pill"), function(pill){
    pill.addEventListener("click", function(){
      state.form.entrega = pill.getAttribute("data-val");
      syncEntrega(); save(); renderCart();
    });
  });
  function syncEntrega(){
    Array.prototype.forEach.call(document.querySelectorAll("#entregaRow .radio-pill"), function(p){
      var on = p.getAttribute("data-val") === state.form.entrega;
      p.classList.toggle("sel", on);
      p.querySelector("input").checked = on;
    });
    document.getElementById("envioFields").hidden = state.form.entrega !== "envio";
  }
  document.getElementById("cLadM2").addEventListener("input", calcLadr);
  document.getElementById("cLadTipo").addEventListener("change", calcLadr);
  document.getElementById("cLadAdd").addEventListener("click", function(){
    var r = calcLadr();
    if(r.u > 0){ addQty(r.id, r.u); save(); render("all"); toast(fmtQty(r.u)+" ladrillones agregados ✓"); }
  });
  document.getElementById("cCerM2").addEventListener("input", calcCer);
  document.getElementById("cCerAdd").addEventListener("click", function(){
    var r = calcCer();
    if(r.m2 > 0){
      addQty("ceram-mapuche", r.m2); addQty("crucetas", r.cajas);
      save(); render("all"); toast("Cerámico y crucetas agregados ✓");
    }
  });

  document.getElementById("fNombre").value = state.form.nombre || "";
  document.getElementById("fDireccion").value = state.form.direccion || "";
  document.getElementById("fUbicacion").value = state.form.ubicacion || "";
  document.getElementById("fContacto").value = state.form.contacto || "";
  document.getElementById("fReferencia").value = state.form.referencia || "";
  syncEntrega();
  renderBrandTicker();
  renderBrandsGrid();
  renderRubros();
  render("all");
  calcLadr();
  calcCer();
  showView((location.hash || "#inicio").replace("#",""));
})();
