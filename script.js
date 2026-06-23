const datosMigracion = [
  {
    destino: "Estados Unidos",
    valor: 11654000,
    nota: "Aprox. 97,8% de mexicanos en el exterior (IME/SRE)."
  },
  {
    destino: "Europa",
    valor: 103814,
    nota: "Registro de connacionales en Europa (IME/SRE)."
  },
  {
    destino: "Asia",
    valor: 11180,
    nota: "Mexicanas y mexicanos residentes en Asia (IME/SRE)."
  }
];

function t(clave, vars) {
  return window.HubI18n?.t(clave, vars) ?? clave;
}

function localeActual() {
  return window.HubI18n?.getIdioma() === "en" ? "en-US" : "es-MX";
}

function formatearNumero(numero) {
  return new Intl.NumberFormat(localeActual()).format(numero);
}

function initContadoresAnimados() {
  const panel = document.querySelector("#panel-migracion-contadores");
  if (!panel) return;

  const contadores = panel.querySelectorAll("[data-contador]");
  if (contadores.length === 0) return;

  const totalMigracion = datosMigracion.reduce((suma, fila) => suma + fila.valor, 0);
  const totalEl = document.querySelector("#migrantes-total");

  const formatearPorcentaje = (valor) => {
    const pct = (valor / totalMigracion) * 100;
    return new Intl.NumberFormat(localeActual(), {
      minimumFractionDigits: pct >= 10 ? 1 : 2,
      maximumFractionDigits: pct >= 10 ? 1 : 2
    }).format(pct);
  };

  const actualizarMetricasCiudadania = () => {
    if (totalEl) totalEl.textContent = formatearNumero(totalMigracion);

    contadores.forEach((elemento) => {
      const valor = Number(elemento.dataset.contador);
      const region = elemento.dataset.region;
      if (!region || !valor) return;

      const pct = formatearPorcentaje(valor);
      const pctEl = panel.querySelector(`[data-pct-region="${region}"]`);
      const barraEl = panel.querySelector(`[data-barra-region="${region}"]`);

      if (pctEl) pctEl.textContent = t("ciudadania.region.pct", { pct });
      if (barraEl) barraEl.style.width = `${(valor / totalMigracion) * 100}%`;
    });
  };

  actualizarMetricasCiudadania();

  let animados = false;

  const animarContador = (elemento) => {
    const destino = Number(elemento.dataset.contador);
    if (!destino || Number.isNaN(destino)) return;

    const duracion = 1800;
    const inicio = performance.now();

    const tick = (ahora) => {
      const progreso = Math.min(1, (ahora - inicio) / duracion);
      const ease = 1 - Math.pow(1 - progreso, 3);
      elemento.textContent = formatearNumero(Math.round(destino * ease));
      if (progreso < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observador = new IntersectionObserver(
    (entradas) => {
      if (!entradas.some((entrada) => entrada.isIntersecting) || animados) return;
      animados = true;
      contadores.forEach(animarContador);
    },
    { threshold: 0.35 }
  );

  observador.observe(panel);
  window.actualizarMetricasCiudadania = actualizarMetricasCiudadania;
}

function escribirLectura() {
  const lectura = document.querySelector("#lectura");
  if (!lectura) return;

  const eua = datosMigracion[0];
  const europa = datosMigracion[1];
  const asia = datosMigracion[2];
  const total = datosMigracion.reduce((suma, fila) => suma + fila.valor, 0);

  lectura.textContent =
    `El Instituto de los Mexicanos en el Exterior (SRE) registra cerca de ${formatearNumero(total)} ` +
    `mexicanas y mexicanos fuera del país. ${eua.destino} concentra la inmensa mayoría ` +
    `(${formatearNumero(eua.valor)} personas), seguido de ${europa.destino} ` +
    `(${formatearNumero(europa.valor)}) y ${asia.destino} (${formatearNumero(asia.valor)}). ` +
    `La OIM y la ONU señalan que el corredor México–Estados Unidos sigue siendo el más numeroso del mundo.`;
}

function initNavegacion() {
  const nav = document.querySelector(".nav-hub");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#nav-menu");
  const enlaces = document.querySelectorAll(".nav-menu a[data-nav]");
  const secciones = [...document.querySelectorAll(".seccion-ancla")];

  if (!nav || !toggle || !menu || secciones.length === 0) return;

  const cerrarMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú de navegación");
  };

  toggle.addEventListener("click", () => {
    const abierto = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(abierto));
    toggle.setAttribute("aria-label", abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación");
  });

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", cerrarMenu);
  });

  document.addEventListener("click", (evento) => {
    if (!nav.contains(evento.target)) cerrarMenu();
  });

  const marcarActivo = () => {
    const offset = window.scrollY + nav.offsetHeight + 56;
    let activa = secciones[0].id;

    secciones.forEach((seccion) => {
      if (seccion.offsetTop <= offset) activa = seccion.id;
    });

    const mapaNavLocal = mapaNav;
    const navKey = mapaNavLocal[activa] || activa;

    enlaces.forEach((enlace) => {
      enlace.classList.toggle("is-active", enlace.dataset.nav === navKey);
    });

    return activa;
  };

  marcarActivo();
  window.addEventListener("scroll", marcarActivo, { passive: true });
}

const capitulosHistoria = [
  { id: "hub", key: "cap.hub" },
  { id: "ciudadania-global", key: "cap.datos" },
  { id: "historias", key: "cap.historias" },
  { id: "aprendizajes", key: "cap.aprendizajes" },
  { id: "investigacion", key: "cap.investigacion" },
  { id: "participacion", key: "cap.participacion" }
];

const mapaSeccionCapitulo = {
  hub: "hub",
  "ciudadania-global": "ciudadania-global",
  historias: "historias",
  storytelling: "historias",
  aprendizajes: "aprendizajes",
  investigacion: "investigacion",
  participacion: "participacion",
  "encuesta-visitantes": "participacion",
  faq: "participacion",
  contacto: "participacion"
};

const mapaNav = {
  hub: "hub",
  "ciudadania-global": "datos",
  historias: "historias",
  storytelling: "historias",
  aprendizajes: "aprendizajes",
  investigacion: "investigacion",
  participacion: "participacion",
  "encuesta-visitantes": "participacion",
  faq: "participacion",
  contacto: "participacion"
};

function prefiereMovimientoReducido() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function irASeccion(id) {
  const seccion = document.getElementById(id);
  if (!seccion) return;

  seccion.scrollIntoView({
    behavior: prefiereMovimientoReducido() ? "auto" : "smooth",
    block: "start"
  });

  if (history.replaceState) {
    history.replaceState(null, "", `#${id}`);
  } else {
    location.hash = id;
  }
}

function obtenerCapituloDesdeScroll(offset) {
  const secciones = [...document.querySelectorAll(".seccion-ancla")];
  let activa = secciones[0]?.id ?? "hub";

  secciones.forEach((seccion) => {
    if (seccion.offsetTop <= offset) activa = seccion.id;
  });

  return mapaSeccionCapitulo[activa] || activa;
}

const factoresPuebla = [
  { id: "gusto", valor: 5 },
  { id: "academica", valor: 5 },
  { id: "oportunidades", valor: 4 },
  { id: "familia", valor: 3 },
  { id: "carrera", valor: 3 },
  { id: "laboral", valor: 2 },
  { id: "economia", valor: 2 },
  { id: "otros", valor: 3 }
];

const CLAVE_VISITAS = "hub-migracion-visitas";
const CLAVE_ENCUESTA = "hub-migracion-encuesta";
const MAX_HISTORIA = 120;
const CACHE_REMOTO_MS = 60000;
const CLAVE_GEOCACHE = "hub-migracion-geocache";
const COUNT_API = "https://api.countapi.xyz";
const NOMINATIM_API = "https://nominatim.openstreetmap.org/search";

const pasosRecorrido = [
  { id: "hub", tituloKey: "tour.hub.title", textoKey: "tour.hub.text" },
  { id: "ciudadania-global", tituloKey: "tour.datos.title", textoKey: "tour.datos.text" },
  { id: "historias", tituloKey: "tour.historias.title", textoKey: "tour.historias.text" },
  { id: "aprendizajes", tituloKey: "tour.aprendizajes.title", textoKey: "tour.aprendizajes.text" },
  { id: "investigacion", tituloKey: "tour.investigacion.title", textoKey: "tour.investigacion.text" },
  { id: "participacion", tituloKey: "tour.participacion.title", textoKey: "tour.participacion.text" },
  {
    id: "encuesta-visitantes",
    tituloKey: "tour.encuesta.title",
    textoKey: "tour.encuesta.text"
  }
];

let mapaVisitantesInstancia = null;
let capaMarcadoresVisitantes = null;
let capaRutasVisitantes = null;
let cacheRemotoVisitantes = null;
let cacheRemotoTs = 0;
let filtroSoloVocesMapa = false;

function obtenerMapaApiUrl() {
  const url = (typeof window !== "undefined" && window.HUB_MAPA_API) || "";
  return typeof url === "string" ? url.trim() : "";
}

function mapaApiActiva() {
  return obtenerMapaApiUrl().length > 0;
}

function escapeHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizarHistoria(texto) {
  if (!texto) return "";
  return String(texto).replace(/\s+/g, " ").trim().slice(0, MAX_HISTORIA);
}

function htmlPopupUbicacion(titulo, lugar, entrada) {
  const historia = sanitizarHistoria(entrada.historia);
  let html = `<strong>${escapeHtml(titulo)}</strong><br>${escapeHtml(lugar)}`;
  if (historia) {
    html += `<blockquote class="popup-historia">${escapeHtml(historia)}</blockquote>`;
  }
  return html;
}

function entradaTieneHistoria(entrada) {
  return Boolean(sanitizarHistoria(entrada.historia));
}

function invalidarCacheRemotoVisitantes() {
  cacheRemotoVisitantes = null;
  cacheRemotoTs = 0;
}

async function cargarVisitantesRemotos() {
  const url = obtenerMapaApiUrl();
  if (!url) return [];

  if (cacheRemotoVisitantes && Date.now() - cacheRemotoTs < CACHE_REMOTO_MS) {
    return cacheRemotoVisitantes;
  }

  try {
    const separador = url.includes("?") ? "&" : "?";
    const respuesta = await fetch(`${url}${separador}_=${Date.now()}`, {
      headers: { Accept: "application/json" }
    });
    if (!respuesta.ok) return [];

    const datos = await respuesta.json();
    const lista = Array.isArray(datos) ? datos : datos.items || [];
    cacheRemotoVisitantes = lista;
    cacheRemotoTs = Date.now();
    return lista;
  } catch {
    return [];
  }
}

async function enviarVisitanteRemoto(entrada) {
  const url = obtenerMapaApiUrl();
  if (!url) return { ok: false, omitido: true };

  try {
    const respuesta = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(entrada)
    });

    if (!respuesta.ok) return { ok: false, error: "respuesta_no_ok" };
    return await respuesta.json();
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}

function actualizarEstadoMapaApi(remotas) {
  const estado = document.querySelector("#mapa-api-estado");
  if (!estado) return;

  if (!mapaApiActiva()) {
    estado.hidden = true;
    estado.textContent = "";
    return;
  }

  estado.hidden = false;
  estado.textContent =
    remotas.length > 0
      ? `Conectado al registro compartido: ${remotas.length} respuesta${remotas.length === 1 ? "" : "s"} desde la hoja del Hub.`
      : "Registro compartido activo. Las nuevas respuestas se guardan para todo el sitio.";
}

function factorEtiqueta(fila) {
  return t(`factor.${fila.id}`);
}

function factorDetalle(fila) {
  return t(`factor.${fila.id}.d`);
}

function initFactoresInteractivo() {
  const contenedor = document.querySelector("#factores-grafica");
  const detalle = document.querySelector("#factores-detalle");
  const toggle = document.querySelector("#factores-toggle-png");
  const pngOriginal = document.querySelector("#factores-png-original");

  if (!contenedor || !detalle) return;

  contenedor.innerHTML = "";
  const maxValor = Math.max(...factoresPuebla.map((fila) => fila.valor));
  let factorFijado = null;

  const resaltar = (fila) => {
    const etiqueta = factorEtiqueta(fila);
    contenedor.querySelectorAll(".factores-barra").forEach((barra) => {
      const activa = barra.dataset.factorId === fila.id;
      barra.classList.toggle("is-active", activa);
      barra.classList.toggle("is-atenuada", !activa);
    });
    detalle.innerHTML = `<strong>${etiqueta}</strong> — ${t("factor.menciones", { n: fila.valor })} ${factorDetalle(fila)}`;
  };

  const limpiar = () => {
    if (factorFijado) return;
    contenedor.querySelectorAll(".factores-barra").forEach((barra) => {
      barra.classList.remove("is-active", "is-atenuada");
    });
    detalle.textContent = t("investigacion.factores.hint");
  };

  factoresPuebla.forEach((fila) => {
    const etiqueta = factorEtiqueta(fila);
    const item = document.createElement("button");
    item.type = "button";
    item.className = "factores-barra";
    item.dataset.factorId = fila.id;
    item.setAttribute("role", "listitem");
    item.setAttribute("aria-label", `${etiqueta}: ${fila.valor}`);

    const etiquetaEl = document.createElement("span");
    etiquetaEl.className = "factores-etiqueta";
    etiquetaEl.textContent = etiqueta;

    const pista = document.createElement("span");
    pista.className = "factores-pista";
    pista.setAttribute("aria-hidden", "true");

    const relleno = document.createElement("span");
    relleno.className = "factores-relleno";
    relleno.style.width = `${(fila.valor / maxValor) * 100}%`;

    const valor = document.createElement("span");
    valor.className = "factores-valor";
    valor.textContent = String(fila.valor);

    pista.appendChild(relleno);
    item.append(etiquetaEl, pista, valor);

    item.addEventListener("mouseenter", () => resaltar(fila));
    item.addEventListener("focus", () => resaltar(fila));
    item.addEventListener("mouseleave", limpiar);
    item.addEventListener("click", () => {
      factorFijado = factorFijado?.id === fila.id ? null : fila;
      if (factorFijado) {
        resaltar(fila);
      } else {
        contenedor.querySelectorAll(".factores-barra").forEach((barra) => {
          barra.classList.remove("is-active", "is-atenuada");
        });
        detalle.textContent = t("investigacion.factores.hint");
      }
    });

    contenedor.appendChild(item);
  });

  if (toggle && pngOriginal && !toggle.dataset.bound) {
    toggle.dataset.bound = "1";
    toggle.addEventListener("click", () => {
      const visible = pngOriginal.hidden;
      pngOriginal.hidden = !visible;
      toggle.setAttribute("aria-expanded", String(visible));
      toggle.textContent = visible
        ? t("investigacion.factores.toggle.hide")
        : t("investigacion.factores.toggle");
    });
  }
}

function formatearContadorVisitas(valor) {
  return new Intl.NumberFormat(localeActual()).format(valor);
}

function mostrarContadorVisitas(valor, esAproximado = false) {
  const contador = document.querySelector("#contador-visitas");
  const footer = document.querySelector("#footer-visitas");
  const texto = formatearContadorVisitas(valor);
  const sufijo = esAproximado ? " (estimado en este dispositivo)" : "";

  if (contador) contador.textContent = texto;
  if (footer) footer.textContent = ` · ${texto} visitas registradas${sufijo}`;
}

async function initContadorVisitas() {
  const yaContada = sessionStorage.getItem("hub-visita-sesion");

  const contarLocal = () => {
    const actual = Number(localStorage.getItem(CLAVE_VISITAS) || 0) + (yaContada ? 0 : 1);
    if (!yaContada) {
      localStorage.setItem(CLAVE_VISITAS, String(actual));
      sessionStorage.setItem("hub-visita-sesion", "1");
    }
    mostrarContadorVisitas(Number(localStorage.getItem(CLAVE_VISITAS) || actual), true);
  };

  if (yaContada) {
    try {
      const respuesta = await fetch(`${COUNT_API}/get/hub-migracion-tec-puebla/visitas`);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        mostrarContadorVisitas(datos.value ?? 0);
        return;
      }
    } catch {
      /* continúa con respaldo local */
    }
    mostrarContadorVisitas(Number(localStorage.getItem(CLAVE_VISITAS) || 1), true);
    return;
  }

  try {
    await fetch(`${COUNT_API}/hit/hub-migracion-tec-puebla/visitas`);
    const respuesta = await fetch(`${COUNT_API}/get/hub-migracion-tec-puebla/visitas`);
    if (!respuesta.ok) throw new Error("sin contador remoto");
    const datos = await respuesta.json();
    sessionStorage.setItem("hub-visita-sesion", "1");
    mostrarContadorVisitas(datos.value ?? 1);
  } catch {
    contarLocal();
  }
}

function leerGeocache() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_GEOCACHE) || "{}");
  } catch {
    return {};
  }
}

function guardarGeocache(cache) {
  localStorage.setItem(CLAVE_GEOCACHE, JSON.stringify(cache));
}

async function geocodificarLugar(texto) {
  const consulta = texto.trim();
  if (!consulta) return null;

  const cache = leerGeocache();
  if (cache[consulta]) return cache[consulta];

  const url = new URL(NOMINATIM_API);
  url.searchParams.set("q", consulta);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  const respuesta = await fetch(url.toString(), {
    headers: { Accept: "application/json" }
  });

  if (!respuesta.ok) return null;

  const resultados = await respuesta.json();
  if (!Array.isArray(resultados) || resultados.length === 0) return null;

  const coords = {
    lat: Number(resultados[0].lat),
    lng: Number(resultados[0].lon)
  };

  cache[consulta] = coords;
  guardarGeocache(cache);
  return coords;
}

function claveEntradaVisitante(entrada) {
  const escribe = entrada.escribe || entrada.residencia || "";
  return `${entrada.origen}|${entrada.residencia}|${escribe}|${entrada.fecha || ""}`;
}

function normalizarEntradaVisitante(entrada) {
  const escribe = entrada.escribe || entrada.residencia || "";
  const tieneEscribePropio = Boolean(entrada.escribe);
  return {
    ...entrada,
    escribe,
    escribeLat: tieneEscribePropio ? entrada.escribeLat : entrada.escribeLat ?? entrada.residenciaLat,
    escribeLng: tieneEscribePropio ? entrada.escribeLng : entrada.escribeLng ?? entrada.residenciaLng
  };
}

function leerEncuestasLocales() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_ENCUESTA) || "[]");
  } catch {
    return [];
  }
}

async function cargarVisitantesCompartidos() {
  try {
    const respuesta = await fetch("datos-visitantes.json", { cache: "no-store" });
    if (!respuesta.ok) return [];
    const datos = await respuesta.json();
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

async function obtenerTodasLasRespuestas() {
  const locales = leerEncuestasLocales();
  const compartidas = await cargarVisitantesCompartidos();
  const remotas = await cargarVisitantesRemotos();
  const unificadas = new Map();

  actualizarEstadoMapaApi(remotas);

  [...compartidas, ...remotas, ...locales].forEach((entrada) => {
    unificadas.set(claveEntradaVisitante(entrada), entrada);
  });

  return [...unificadas.values()];
}

function crearIconoMarcador(tipo, conVoz = false) {
  const clases = {
    origen: "marcador-origen",
    residencia: "marcador-residencia",
    escribe: "marcador-escribe"
  };
  const voz = conVoz ? " marcador-con-voz" : "";
  return L.divIcon({
    className: `marcador-visitante ${clases[tipo] || clases.residencia}${voz}`,
    html: `<span aria-hidden="true"></span>`,
    iconSize: conVoz ? [18, 18] : [14, 14],
    iconAnchor: conVoz ? [9, 9] : [7, 7]
  });
}

function actualizarNotaMapa(total, conCoordenadas) {
  const nota = document.querySelector("#mapa-visitantes-nota");
  if (!nota) return;

  if (total === 0) {
    nota.textContent =
      "Aún no hay ubicaciones en el mapa. Sé la primera persona en compartir origen, residencia y desde dónde nos escribes.";
    return;
  }

  const fuentes = mapaApiActiva()
    ? "hoja compartida del Hub, archivo del sitio y tu navegador"
    : "archivo del sitio y tu navegador";
  nota.textContent = `${conCoordenadas} de ${total} respuesta${total === 1 ? "" : "s"} con al menos una ubicación en el mapa. Fuentes: ${fuentes}. Haz clic en un punto para leer la voz, si la compartieron.`;
}

async function renderizarMapaVisitantes() {
  if (typeof L === "undefined") return;

  const contenedor = document.querySelector("#mapa-visitantes");
  if (!contenedor) return;

  const respuestasTodas = await obtenerTodasLasRespuestas();
  const respuestas = filtroSoloVocesMapa
    ? respuestasTodas.filter(entradaTieneHistoria)
    : respuestasTodas;

  if (!mapaVisitantesInstancia) {
    mapaVisitantesInstancia = L.map(contenedor, {
      scrollWheelZoom: true,
      worldCopyJump: true
    }).setView([19.04, -98.2], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapaVisitantesInstancia);

    capaMarcadoresVisitantes = L.layerGroup().addTo(mapaVisitantesInstancia);
    capaRutasVisitantes = L.layerGroup().addTo(mapaVisitantesInstancia);
  }

  capaMarcadoresVisitantes.clearLayers();
  capaRutasVisitantes.clearLayers();

  const bounds = [];
  let conCoordenadas = 0;

  respuestas.forEach((entradaCruda) => {
    const entrada = normalizarEntradaVisitante(entradaCruda);
    const tieneOrigen =
      typeof entrada.origenLat === "number" && typeof entrada.origenLng === "number";
    const tieneResidencia =
      typeof entrada.residenciaLat === "number" && typeof entrada.residenciaLng === "number";
    const tieneEscribe =
      typeof entrada.escribeLat === "number" && typeof entrada.escribeLng === "number";

    if (tieneOrigen || tieneResidencia || tieneEscribe) conCoordenadas += 1;

    const conVoz = entradaTieneHistoria(entrada);

    if (tieneOrigen) {
      const marcadorOrigen = L.marker([entrada.origenLat, entrada.origenLng], {
        icon: crearIconoMarcador("origen", conVoz)
      });
      marcadorOrigen.bindPopup(htmlPopupUbicacion("Origen", entrada.origen, entrada));
      capaMarcadoresVisitantes.addLayer(marcadorOrigen);
      bounds.push([entrada.origenLat, entrada.origenLng]);
    }

    if (tieneResidencia) {
      const marcadorResidencia = L.marker([entrada.residenciaLat, entrada.residenciaLng], {
        icon: crearIconoMarcador("residencia", conVoz)
      });
      marcadorResidencia.bindPopup(
        htmlPopupUbicacion("Residencia actual", entrada.residencia, entrada)
      );
      capaMarcadoresVisitantes.addLayer(marcadorResidencia);
      bounds.push([entrada.residenciaLat, entrada.residenciaLng]);
    }

    if (tieneEscribe) {
      const marcadorEscribe = L.marker([entrada.escribeLat, entrada.escribeLng], {
        icon: crearIconoMarcador("escribe", conVoz)
      });
      marcadorEscribe.bindPopup(
        htmlPopupUbicacion("Desde donde nos escribes", entrada.escribe, entrada)
      );
      capaMarcadoresVisitantes.addLayer(marcadorEscribe);
      bounds.push([entrada.escribeLat, entrada.escribeLng]);
    }

    const agregarLinea = (desde, hasta, opciones) => {
      if (!desde || !hasta) return;
      if (desde[0] === hasta[0] && desde[1] === hasta[1]) return;
      capaRutasVisitantes.addLayer(L.polyline([desde, hasta], opciones));
    };

    if (tieneOrigen && tieneResidencia) {
      agregarLinea(
        [entrada.origenLat, entrada.origenLng],
        [entrada.residenciaLat, entrada.residenciaLng],
        { color: "#8b4a2f", weight: 2, opacity: 0.45, dashArray: "6 6" }
      );
    }

    if (tieneOrigen && tieneEscribe) {
      agregarLinea(
        [entrada.origenLat, entrada.origenLng],
        [entrada.escribeLat, entrada.escribeLng],
        { color: "#2d8a6e", weight: 2, opacity: 0.38, dashArray: "4 8" }
      );
    }

    if (tieneResidencia && tieneEscribe) {
      agregarLinea(
        [entrada.residenciaLat, entrada.residenciaLng],
        [entrada.escribeLat, entrada.escribeLng],
        { color: "#5a7a94", weight: 1.5, opacity: 0.32, dashArray: "3 6" }
      );
    }
  });

  actualizarNotaMapa(respuestasTodas.length, conCoordenadas);
  actualizarPanelVoces(respuestasTodas);

  if (bounds.length > 0) {
    mapaVisitantesInstancia.fitBounds(bounds, { padding: [36, 36], maxZoom: 10 });
  } else {
    mapaVisitantesInstancia.setView([19.04, -98.2], 5);
  }

  setTimeout(() => mapaVisitantesInstancia.invalidateSize(), 120);
}

function pintarEncuestaLocal() {
  const lista = document.querySelector("#encuesta-lista");
  const mensaje = document.querySelector("#encuesta-mensaje");
  const respuestas = leerEncuestasLocales();

  if (!lista || !mensaje) return;

  if (respuestas.length === 0) {
    mensaje.textContent = t("encuesta.empty");
    lista.hidden = true;
    lista.innerHTML = "";
    return;
  }

  mensaje.textContent = t("encuesta.responses", { n: respuestas.length });
  lista.hidden = false;
  lista.innerHTML = respuestas
    .slice(-6)
    .reverse()
    .map((entrada) => {
      const escribe = entrada.escribe || entrada.residencia;
      const historia = sanitizarHistoria(entrada.historia);
      const voz = historia ? `<br><em class="encuesta-lista-voz">«${escapeHtml(historia)}»</em>` : "";
      return `<li><strong>${escapeHtml(entrada.origen)}</strong> · ${t("encuesta.residence.in")} ${escapeHtml(entrada.residencia)} · ${t("encuesta.write.from")} ${escapeHtml(escribe)}${voz}</li>`;
    })
    .join("");
}

function actualizarPanelVoces(respuestas) {
  const panel = document.querySelector("#mapa-voces-panel");
  const lista = document.querySelector("#mapa-voces-lista");
  if (!panel || !lista) return;

  const conHistoria = respuestas
    .filter(entradaTieneHistoria)
    .slice()
    .reverse()
    .slice(0, 12);

  if (conHistoria.length === 0) {
    panel.hidden = true;
    lista.innerHTML = "";
    return;
  }

  panel.hidden = false;
  lista.innerHTML = conHistoria
    .map((entrada, indice) => {
      const historia = sanitizarHistoria(entrada.historia);
      const escribe = entrada.escribe || entrada.residencia;
      return `<li>
        <button type="button" class="mapa-voz-item" data-voz-indice="${indice}" data-voz-lat="${entrada.escribeLat ?? entrada.residenciaLat ?? entrada.origenLat ?? ""}" data-voz-lng="${entrada.escribeLng ?? entrada.residenciaLng ?? entrada.origenLng ?? ""}">
          <span class="mapa-voz-lugar">${escapeHtml(escribe)}</span>
          <span class="mapa-voz-frase">«${escapeHtml(historia)}»</span>
        </button>
      </li>`;
    })
    .join("");

  lista.querySelectorAll(".mapa-voz-item").forEach((boton) => {
    boton.addEventListener("click", () => {
      const lat = Number(boton.dataset.vozLat);
      const lng = Number(boton.dataset.vozLng);
      if (!mapaVisitantesInstancia || !Number.isFinite(lat) || !Number.isFinite(lng)) return;

      mapaVisitantesInstancia.flyTo([lat, lng], 8, { duration: 0.8 });

      if (!capaMarcadoresVisitantes) return;
      capaMarcadoresVisitantes.eachLayer((capa) => {
        const punto = capa.getLatLng?.();
        if (!punto) return;
        if (Math.abs(punto.lat - lat) < 0.08 && Math.abs(punto.lng - lng) < 0.08) {
          capa.openPopup();
        }
      });
    });
  });
}

function initMapaVocesControles() {
  const filtro = document.querySelector("#mapa-filtro-voces");
  if (!filtro) return;

  filtro.addEventListener("click", async () => {
    filtroSoloVocesMapa = !filtroSoloVocesMapa;
    filtro.setAttribute("aria-pressed", String(filtroSoloVocesMapa));
    filtro.classList.toggle("is-active", filtroSoloVocesMapa);
    await renderizarMapaVisitantes();
  });
}

function initCampoHistoria() {
  const campo = document.querySelector("#visitante-historia");
  const contador = document.querySelector("#historia-contador");
  if (!campo || !contador) return;

  const actualizar = () => {
    const largo = campo.value.length;
    contador.textContent = `${largo} / ${MAX_HISTORIA}`;
  };

  campo.addEventListener("input", actualizar);
  actualizar();
}

function initMapaVisitantes() {
  if (typeof L === "undefined") {
    const nota = document.querySelector("#mapa-visitantes-nota");
    if (nota) nota.textContent = "El mapa no pudo cargarse. Revisa tu conexión e intenta de nuevo.";
    return;
  }

  renderizarMapaVisitantes();
  window.addEventListener("resize", () => {
    if (mapaVisitantesInstancia) mapaVisitantesInstancia.invalidateSize();
  });
}

function initEncuestaVisitantes() {
  const formulario = document.querySelector("#form-visitante");
  if (!formulario) return;

  pintarEncuestaLocal();
  renderizarMapaVisitantes();

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const origen = document.querySelector("#visitante-origen")?.value.trim();
    const residencia = document.querySelector("#visitante-residencia")?.value.trim();
    const escribe = document.querySelector("#visitante-escribe")?.value.trim();
    const historia = sanitizarHistoria(document.querySelector("#visitante-historia")?.value);
    const boton = formulario.querySelector('button[type="submit"]');
    const mensaje = document.querySelector("#encuesta-mensaje");

    if (!origen || !residencia || !escribe) return;

    if (boton) {
      boton.disabled = true;
      boton.textContent = "Ubicando en el mapa…";
    }
    if (mensaje) mensaje.textContent = "Geocodificando las tres ubicaciones…";

    const [coordsOrigen, coordsResidencia, coordsEscribe] = await Promise.all([
      geocodificarLugar(origen),
      geocodificarLugar(residencia),
      geocodificarLugar(escribe)
    ]);

    const entrada = {
      id: Date.now(),
      origen,
      residencia,
      escribe,
      fecha: new Date().toISOString(),
      origenLat: coordsOrigen?.lat,
      origenLng: coordsOrigen?.lng,
      residenciaLat: coordsResidencia?.lat,
      residenciaLng: coordsResidencia?.lng,
      escribeLat: coordsEscribe?.lat,
      escribeLng: coordsEscribe?.lng
    };

    if (historia) entrada.historia = historia;

    const respuestas = leerEncuestasLocales();
    respuestas.push(entrada);
    localStorage.setItem(CLAVE_ENCUESTA, JSON.stringify(respuestas));

    let remoto = { ok: false, omitido: true };
    if (mapaApiActiva()) {
      if (mensaje) mensaje.textContent = "Guardando en el registro compartido del Hub…";
      remoto = await enviarVisitanteRemoto(entrada);
      invalidarCacheRemotoVisitantes();
    }

    formulario.reset();
    const contadorHistoria = document.querySelector("#historia-contador");
    if (contadorHistoria) contadorHistoria.textContent = `0 / ${MAX_HISTORIA}`;
    pintarEncuestaLocal();
    await renderizarMapaVisitantes();

    if (mensaje) {
      const ubicados = [coordsOrigen, coordsResidencia, coordsEscribe].filter(Boolean).length;
      const base =
        ubicados === 3
          ? "¡Gracias! Las tres ubicaciones ya están en el mapa."
          : ubicados > 0
            ? `¡Gracias! ${ubicados} de 3 ubicaciones aparecen en el mapa. Intenta ser más específico (ciudad y país) en las que faltan.`
            : "¡Gracias! Guardamos tu respuesta. No pudimos ubicar los lugares; intenta incluir ciudad y país.";

      const voz = historia ? " Tu frase aparece al hacer clic en los puntos del mapa." : "";
      const nube =
        remoto.ok && mapaApiActiva()
          ? " También quedó registrada para todas las personas que visiten el sitio."
          : mapaApiActiva() && !remoto.ok
            ? " No se pudo guardar en la hoja compartida; revisa config-mapa.js o la conexión."
            : "";

      mensaje.textContent = base + voz + nube;
    }

    if (boton) {
      boton.disabled = false;
      boton.textContent = "Compartir en el mapa";
    }
  });
}

function initRecorridoGuiado() {
  const overlay = document.querySelector("#recorrido-overlay");
  const dialogo = document.querySelector("#recorrido-dialogo");
  const pasoContenido = document.querySelector("#recorrido-paso-contenido");
  const resumenPanel = document.querySelector("#recorrido-resumen");
  const resumenLista = document.querySelector("#recorrido-resumen-lista");
  const resumenMapa = document.querySelector("#recorrido-resumen-mapa");
  const titulo = document.querySelector("#recorrido-titulo");
  const texto = document.querySelector("#recorrido-texto");
  const paso = document.querySelector("#recorrido-paso");
  const btnIniciar = document.querySelector("#btn-iniciar-recorrido");
  const btnAnterior = document.querySelector("#recorrido-anterior");
  const btnSiguiente = document.querySelector("#recorrido-siguiente");
  const btnCerrar = document.querySelector("#recorrido-cerrar");
  const btnCerrarResumen = document.querySelector("#recorrido-cerrar-resumen");
  const nav = document.querySelector(".nav-hub");
  const menu = document.querySelector("#nav-menu");

  if (!overlay || !dialogo || !btnIniciar || pasosRecorrido.length === 0) return;

  let indiceActual = 0;
  let recorridoActivo = false;

  const reiniciarDialogoRecorrido = () => {
    if (pasoContenido) pasoContenido.hidden = false;
    if (resumenPanel) resumenPanel.hidden = true;
  };

  const mostrarResumenRecorrido = () => {
    limpiarResaltadoRecorrido();
    if (pasoContenido) pasoContenido.hidden = true;
    if (resumenPanel) resumenPanel.hidden = false;

    if (resumenLista) {
      resumenLista.innerHTML = pasosRecorrido
        .map((pasoRecorrido) => `<li><a href="#${pasoRecorrido.id}">${t(pasoRecorrido.tituloKey)}</a></li>`)
        .join("");
    }

    const tieneRespuesta = leerEncuestasLocales().length > 0;
    if (resumenMapa) {
      resumenMapa.textContent = tieneRespuesta
        ? t("tour.summary.map")
        : t("tour.summary.map.empty");
    }
  };

  const cerrarMenuNav = () => {
    if (menu) menu.classList.remove("is-open");
    const toggle = document.querySelector(".nav-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú de navegación");
    }
  };

  const limpiarResaltadoRecorrido = () => {
    document.querySelectorAll(".recorrido-seccion-activa").forEach((seccion) => {
      seccion.classList.remove("recorrido-seccion-activa");
    });
  };

  const irAPaso = (indice) => {
    indiceActual = Math.max(0, Math.min(indice, pasosRecorrido.length - 1));
    const pasoActual = pasosRecorrido[indiceActual];
    const seccion = document.querySelector(`#${pasoActual.id}`);

    limpiarResaltadoRecorrido();
    if (seccion) {
      seccion.classList.add("recorrido-seccion-activa");
      const offset = (nav?.offsetHeight || 0) + 72;
      const top = seccion.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }

    if (titulo) titulo.textContent = t(pasoActual.tituloKey);
    if (texto) texto.textContent = t(pasoActual.textoKey);
    if (paso) {
      paso.textContent = t("tour.step", {
        current: indiceActual + 1,
        total: pasosRecorrido.length
      });
    }

    if (btnAnterior) {
      btnAnterior.disabled = indiceActual === 0;
      btnAnterior.textContent = t("tour.prev");
    }
    if (btnSiguiente) {
      btnSiguiente.textContent =
        indiceActual === pasosRecorrido.length - 1 ? t("tour.finish") : t("tour.next");
    }
    if (btnCerrar) btnCerrar.textContent = t("tour.exit");

    if (pasoActual.id === "encuesta-visitantes" && mapaVisitantesInstancia) {
      setTimeout(() => mapaVisitantesInstancia.invalidateSize(), 400);
    }
  };

  const abrirRecorrido = () => {
    recorridoActivo = true;
    overlay.hidden = false;
    cerrarMenuNav();
    reiniciarDialogoRecorrido();
    indiceActual = 0;
    irAPaso(0);
    dialogo.focus();
  };

  const cerrarRecorrido = () => {
    recorridoActivo = false;
    overlay.hidden = true;
    reiniciarDialogoRecorrido();
    limpiarResaltadoRecorrido();
    btnIniciar.focus();
  };

  btnIniciar.addEventListener("click", abrirRecorrido);

  btnAnterior?.addEventListener("click", () => {
    if (indiceActual > 0) irAPaso(indiceActual - 1);
  });

  btnSiguiente?.addEventListener("click", () => {
    if (indiceActual < pasosRecorrido.length - 1) {
      irAPaso(indiceActual + 1);
    } else {
      mostrarResumenRecorrido();
    }
  });

  btnCerrar?.addEventListener("click", cerrarRecorrido);
  btnCerrarResumen?.addEventListener("click", cerrarRecorrido);

  overlay.addEventListener("click", (evento) => {
    if (evento.target === overlay) cerrarRecorrido();
  });

  document.addEventListener("keydown", (evento) => {
    if (!recorridoActivo) return;
    if (evento.key === "Escape") {
      evento.preventDefault();
      cerrarRecorrido();
    }
    if (evento.key === "ArrowRight") {
      evento.preventDefault();
      if (indiceActual < pasosRecorrido.length - 1) irAPaso(indiceActual + 1);
      else cerrarRecorrido();
    }
    if (evento.key === "ArrowLeft" && indiceActual > 0) {
      evento.preventDefault();
      irAPaso(indiceActual - 1);
    }
  });
}

function initProgresoHistoria() {
  const barra = document.querySelector("#progreso-capitulos");
  const relleno = document.querySelector("#progreso-relleno");
  const segmentos = document.querySelector("#progreso-segmentos");
  const etiqueta = document.querySelector("#progreso-etiqueta");
  const nav = document.querySelector(".nav-hub");

  if (!barra || !relleno || !segmentos || !etiqueta || !nav) return;

  capitulosHistoria.forEach((capitulo) => {
    const marca = document.createElement("button");
    marca.type = "button";
    marca.className = "progreso-segmento";
    marca.dataset.capitulo = capitulo.id;
    marca.dataset.capituloKey = capitulo.key;
    marca.title = t(capitulo.key);
    marca.setAttribute("aria-label", t(capitulo.key));
    marca.addEventListener("click", () => irASeccion(capitulo.id));
    segmentos.appendChild(marca);
  });

  const marcas = [...segmentos.querySelectorAll(".progreso-segmento")];

  const actualizarProgreso = () => {
    marcas.forEach((marca) => {
      if (marca.dataset.capituloKey) marca.title = t(marca.dataset.capituloKey);
    });
    const inicio = document.querySelector("#hub")?.offsetTop ?? 0;
    const fin = document.documentElement.scrollHeight - window.innerHeight;
    const avance = fin > inicio ? Math.min(100, Math.max(0, ((window.scrollY - inicio) / (fin - inicio)) * 100)) : 0;

    relleno.style.width = `${avance}%`;
    barra.setAttribute("aria-valuenow", String(Math.round(avance)));

    const offset = window.scrollY + nav.offsetHeight + 56;
    const capituloActivo = obtenerCapituloDesdeScroll(offset);
    let indiceActivo = capitulosHistoria.findIndex((capitulo) => capitulo.id === capituloActivo);
    if (indiceActivo < 0) indiceActivo = 0;

    marcas.forEach((marca, indice) => {
      marca.classList.toggle("is-active", indice === indiceActivo);
      marca.classList.toggle("is-pasado", indice < indiceActivo);
    });

    etiqueta.textContent = t("progress.chapter", { name: t(capitulosHistoria[indiceActivo].key) });
  };

  window.actualizarProgresoHistoria = actualizarProgreso;

  actualizarProgreso();
  window.addEventListener("scroll", actualizarProgreso, { passive: true });
  window.addEventListener("resize", actualizarProgreso, { passive: true });
}

function initNavegacionCapitulos() {
  document.addEventListener("click", (evento) => {
    const enlace = evento.target.closest('a[href^="#"]');
    if (!enlace) return;

    const destino = enlace.getAttribute("href");
    if (!destino || destino === "#") return;

    const id = destino.slice(1);
    if (!document.getElementById(id)) return;

    evento.preventDefault();
    irASeccion(id);
  });
}

function initIndiceFlotante() {
  const boton = document.querySelector("#btn-indice");
  const dialogo = document.querySelector("#dialogo-indice");
  const cerrar = document.querySelector("#indice-cerrar");
  const lista = document.querySelector("#indice-lista");
  const btnRecorrido = document.querySelector("#indice-iniciar-recorrido");
  const btnRecorridoNav = document.querySelector("#btn-iniciar-recorrido");

  if (!boton || !dialogo || !lista) return;

  const renderLista = () => {
    lista.innerHTML = capitulosHistoria
      .map(
        (capitulo, indice) => `
        <li>
          <button type="button" class="indice-item" data-capitulo="${capitulo.id}">
            <span class="indice-item-num" aria-hidden="true">${indice + 1}</span>
            <span class="indice-item-texto">
              <span class="indice-item-nombre">${t(capitulo.key)}</span>
              <span class="indice-item-desc">${t(`navmap.${capitulo.id === "ciudadania-global" ? "datos" : capitulo.id}.desc`)}</span>
            </span>
          </button>
        </li>`
      )
      .join("");
  };

  renderLista();

  const abrir = () => {
    renderLista();
    dialogo.showModal();
    boton.setAttribute("aria-expanded", "true");
  };

  const cerrarDialogo = () => {
    dialogo.close();
    boton.setAttribute("aria-expanded", "false");
  };

  boton.addEventListener("click", abrir);
  cerrar?.addEventListener("click", cerrarDialogo);
  dialogo.addEventListener("click", (evento) => {
    if (evento.target === dialogo) cerrarDialogo();
  });
  dialogo.addEventListener("close", () => boton.setAttribute("aria-expanded", "false"));

  lista.addEventListener("click", (evento) => {
    const item = evento.target.closest(".indice-item");
    if (!item) return;
    cerrarDialogo();
    irASeccion(item.dataset.capitulo);
  });

  btnRecorrido?.addEventListener("click", () => {
    cerrarDialogo();
    btnRecorridoNav?.click();
  });

  window.addEventListener("hub:idioma", renderLista);
}

function initContacto() {
  const boton = document.querySelector("#btn-contacto");
  if (!boton) return;

  boton.addEventListener("click", () => {
    const usuario = "arbarradas";
    const dominio = ["tec", "mx"].join(".");
    const correo = `${usuario}@${dominio}`;
    window.location.href = `mailto:${correo}?subject=${encodeURIComponent("Contacto — Hub de Migración e Impacto Social")}`;
  });
}

function initVolverArriba() {
  const boton = document.querySelector("#btn-arriba");
  if (!boton) return;

  const mostrar = () => {
    boton.hidden = window.scrollY < 320;
  };

  mostrar();
  window.addEventListener("scroll", mostrar, { passive: true });
}

function obtenerTextoNodo(grupo) {
  const tspan = grupo.querySelector("text tspan");
  if (tspan && tspan.textContent.trim()) return tspan.textContent.trim();
  const id = grupo.getAttribute("id");
  return id && id.trim() ? id.trim() : "Nodo";
}

function parsearCoordenadasNodo(grupo) {
  const transform = grupo.getAttribute("transform") || "";
  const coincidencia = transform.match(/translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/);
  if (!coincidencia) return null;
  return { x: Number(coincidencia[1]), y: Number(coincidencia[2]) };
}

function parsearCoordenadasEnlace(path) {
  const d = path.getAttribute("d") || "";
  const inicio = d.match(/^M\s*([-\d.]+)\s*,\s*([-\d.]+)/);
  const fin = d.match(/([-\d.]+)\s*,\s*([-\d.]+)\s*$/);
  if (!inicio || !fin) return null;
  return {
    origen: { x: Number(inicio[1]), y: Number(inicio[2]) },
    destino: { x: Number(fin[1]), y: Number(fin[2]) }
  };
}

function coordenadasCoinciden(a, b, tolerancia = 2) {
  return Math.abs(a.x - b.x) <= tolerancia && Math.abs(a.y - b.y) <= tolerancia;
}

function columnaDeNodo(x) {
  if (x <= 30) return "Origen";
  if (x <= 260) return "Estado de procedencia";
  if (x <= 500) return "Ciudad de origen";
  return "Motivo de movilización";
}

function tipoColumnaFiltro(columna) {
  if (columna === "Estado de procedencia") return "estados";
  if (columna === "Ciudad de origen") return "ciudades";
  if (columna === "Motivo de movilización") return "motivos";
  return "origen";
}

function initCartografiaInteractiva() {
  const objeto = document.querySelector("#cartog-svg");
  const tooltip = document.querySelector("#cartog-tooltip");
  const detalle = document.querySelector("#cartog-detalle");
  const buscar = document.querySelector("#cartog-buscar");
  const limpiar = document.querySelector("#cartog-limpiar");
  if (!objeto || !tooltip || !detalle) return;

  let nodos = [];
  let enlaces = [];
  let seleccionFijada = null;
  let filtroColumnaActivo = "todos";
  const botonesFiltroColumna = [...document.querySelectorAll("[data-filtro-columna]")];

  const estilosSvg = `
    #links path { transition: stroke 0.2s ease, stroke-width 0.2s ease, opacity 0.2s ease; }
    #nodes > g { cursor: pointer; transition: opacity 0.2s ease; }
    #nodes > g .nodo-circulo { transition: r 0.2s ease, fill 0.2s ease; }
    #nodes > g .nodo-texto tspan { transition: font-weight 0.2s ease, fill 0.2s ease; }
    .cartog-atenuado { opacity: 0.18; }
    .cartog-resaltado .nodo-circulo { stroke: #8b4a2f; stroke-width: 2px; }
    .cartog-resaltado .nodo-texto tspan { fill: #8b4a2f !important; font-weight: 700 !important; }
    .cartog-enlace-resaltado { stroke: #8b4a2f !important; stroke-width: 2.5px !important; opacity: 1 !important; }
    .cartog-enlace-atenuado { opacity: 0.08; }
    .cartog-coincidencia-busqueda .nodo-circulo { stroke: #b86a3d; stroke-width: 2px; }
    .cartog-filtro-visible { opacity: 1 !important; }
    path.cartog-filtro-visible { opacity: 0.55 !important; }
  `;

  const aplicarFiltroColumna = () => {
    if (nodos.length === 0) return;

    nodos.forEach((nodo) => {
      const tipo = tipoColumnaFiltro(nodo.columna);
      const visible = filtroColumnaActivo === "todos" || tipo === filtroColumnaActivo;
      nodo.grupo.classList.toggle("cartog-atenuado", !visible);
      nodo.grupo.classList.toggle("cartog-filtro-visible", visible);
    });

    enlaces.forEach((enlace) => {
      const nodoOrigen = nodos.find((nodo) => coordenadasCoinciden(enlace.origen, nodo.coords));
      const nodoDestino = nodos.find((nodo) => coordenadasCoinciden(enlace.destino, nodo.coords));
      const visibleOrigen =
        nodoOrigen &&
        (filtroColumnaActivo === "todos" || tipoColumnaFiltro(nodoOrigen.columna) === filtroColumnaActivo);
      const visibleDestino =
        nodoDestino &&
        (filtroColumnaActivo === "todos" || tipoColumnaFiltro(nodoDestino.columna) === filtroColumnaActivo);
      const visible = filtroColumnaActivo === "todos" || visibleOrigen || visibleDestino;

      enlace.path.classList.toggle("cartog-enlace-atenuado", !visible);
      enlace.path.classList.toggle("cartog-filtro-visible", visible);
    });
  };

  const prepararNodos = (svgDoc) => {
    nodos = [...svgDoc.querySelectorAll("#nodes > g")].map((grupo) => {
      const coords = parsearCoordenadasNodo(grupo);
      const circulo = grupo.querySelector("circle");
      if (circulo) circulo.classList.add("nodo-circulo");
      const texto = grupo.querySelector("text");
      if (texto) texto.classList.add("nodo-texto");
      return {
        grupo,
        coords,
        nombre: obtenerTextoNodo(grupo),
        columna: coords ? columnaDeNodo(coords.x) : "Nodo"
      };
    }).filter((nodo) => nodo.coords);

    enlaces = [...svgDoc.querySelectorAll("#links path")].map((path) => {
      const coords = parsearCoordenadasEnlace(path);
      if (!coords) return null;
      return { path, origen: coords.origen, destino: coords.destino };
    }).filter(Boolean);
  };

  const nodosRelacionados = (nodoBase) => {
    const relacionados = new Set([nodoBase]);
    const enlacesRelacionados = new Set();

    enlaces.forEach((enlace) => {
      const conectaOrigen = coordenadasCoinciden(enlace.origen, nodoBase.coords);
      const conectaDestino = coordenadasCoinciden(enlace.destino, nodoBase.coords);
      if (!conectaOrigen && !conectaDestino) return;

      enlacesRelacionados.add(enlace);
      nodos.forEach((nodo) => {
        if (coordenadasCoinciden(enlace.origen, nodo.coords) || coordenadasCoinciden(enlace.destino, nodo.coords)) {
          relacionados.add(nodo);
        }
      });
    });

    return { nodos: relacionados, enlaces: enlacesRelacionados };
  };

  const limpiarResaltado = () => {
    nodos.forEach(({ grupo }) => {
      grupo.classList.remove("cartog-atenuado", "cartog-resaltado", "cartog-coincidencia-busqueda", "cartog-filtro-visible");
    });
    enlaces.forEach(({ path }) => {
      path.classList.remove("cartog-enlace-resaltado", "cartog-enlace-atenuado", "cartog-filtro-visible");
    });
    tooltip.hidden = true;
    if (filtroColumnaActivo !== "todos") aplicarFiltroColumna();
  };

  const mostrarDetalle = (nodo, fijado = false) => {
    const { nodos: relacionados, enlaces: enlacesRelacionados } = nodosRelacionados(nodo);
    const conexiones = [...relacionados]
      .filter((item) => item !== nodo)
      .map((item) => item.nombre)
      .slice(0, 12);

    detalle.innerHTML = `
      <h3 class="subtitulo cartog-detalle-titulo">${nodo.nombre}</h3>
      <p class="texto"><strong>Columna:</strong> ${nodo.columna}</p>
      <p class="texto"><strong>Conexiones relacionadas:</strong> ${conexiones.length ? conexiones.join(" · ") : "Sin conexiones visibles en este tramo."}</p>
      ${fijado ? '<p class="texto cartog-detalle-nota">Selección fijada. Usa «Limpiar selección» o haz clic fuera para restablecer.</p>' : ""}
    `;

    if (limpiar) limpiar.hidden = !fijado;
  };

  const resaltarNodo = (nodoBase, fijado = false) => {
    limpiarResaltado();
    const { nodos: relacionados, enlaces: enlacesRelacionados } = nodosRelacionados(nodoBase);

    nodos.forEach((nodo) => {
      if (nodo === nodoBase || relacionados.has(nodo)) {
        nodo.grupo.classList.add("cartog-resaltado");
      } else {
        nodo.grupo.classList.add("cartog-atenuado");
      }
    });

    enlaces.forEach((enlace) => {
      if (enlacesRelacionados.has(enlace)) {
        enlace.path.classList.add("cartog-enlace-resaltado");
      } else {
        enlace.path.classList.add("cartog-enlace-atenuado");
      }
    });

    tooltip.textContent = `${nodoBase.nombre} — ${nodoBase.columna}`;
    tooltip.hidden = false;
    mostrarDetalle(nodoBase, fijado);
  };

  const activarSvg = (svgDoc) => {
    const estilo = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
    estilo.textContent = estilosSvg;
    svgDoc.documentElement.prepend(estilo);
    prepararNodos(svgDoc);

    nodos.forEach((nodo) => {
      nodo.grupo.setAttribute("role", "button");
      nodo.grupo.setAttribute("tabindex", "0");
      nodo.grupo.setAttribute("aria-label", `${nodo.nombre}, ${nodo.columna}`);

      nodo.grupo.addEventListener("mouseenter", () => {
        if (seleccionFijada) return;
        resaltarNodo(nodo);
      });

      nodo.grupo.addEventListener("mouseleave", () => {
        if (seleccionFijada) return;
        limpiarResaltado();
        detalle.innerHTML = `<p class="cartog-detalle-placeholder texto">Selecciona un nodo en la visualización para ver su nombre, columna (estado, ciudad o motivo) y conexiones relacionadas.</p>`;
      });

      nodo.grupo.addEventListener("click", (evento) => {
        evento.stopPropagation();
        seleccionFijada = nodo;
        resaltarNodo(nodo, true);
      });

      nodo.grupo.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          seleccionFijada = nodo;
          resaltarNodo(nodo, true);
        }
      });
    });

    svgDoc.addEventListener("click", () => {
      if (!seleccionFijada) return;
      seleccionFijada = null;
      limpiarResaltado();
      if (limpiar) limpiar.hidden = true;
      detalle.innerHTML = `<p class="cartog-detalle-placeholder texto">Selecciona un nodo en la visualización para ver su nombre, columna (estado, ciudad o motivo) y conexiones relacionadas.</p>`;
    });
  };

  const filtrarBusqueda = (termino) => {
    const consulta = termino.trim().toLowerCase();
    limpiarResaltado();
    seleccionFijada = null;
    if (limpiar) limpiar.hidden = true;

    if (!consulta) {
      nodos.forEach(({ grupo }) => grupo.classList.remove("cartog-coincidencia-busqueda", "cartog-atenuado"));
      aplicarFiltroColumna();
      return;
    }

    const coincidencias = nodos.filter((nodo) => nodo.nombre.toLowerCase().includes(consulta));
    nodos.forEach((nodo) => {
      const coincide = nodo.nombre.toLowerCase().includes(consulta);
      nodo.grupo.classList.toggle("cartog-coincidencia-busqueda", coincide);
      nodo.grupo.classList.toggle("cartog-atenuado", !coincide);
    });

    if (coincidencias.length === 1) {
      resaltarNodo(coincidencias[0]);
    } else if (coincidencias.length > 1) {
      detalle.innerHTML = `<p class="texto"><strong>${coincidencias.length} coincidencias</strong>: ${coincidencias.map((n) => n.nombre).slice(0, 8).join(" · ")}${coincidencias.length > 8 ? "…" : ""}</p>`;
    } else {
      detalle.innerHTML = `<p class="texto">No se encontraron nodos para «${termino.trim()}».</p>`;
    }
  };

  if (buscar) {
    buscar.addEventListener("input", (evento) => filtrarBusqueda(evento.target.value));
  }

  if (limpiar) {
    limpiar.addEventListener("click", () => {
      seleccionFijada = null;
      if (buscar) buscar.value = "";
      limpiar.hidden = true;
      limpiarResaltado();
      detalle.innerHTML = `<p class="cartog-detalle-placeholder texto">Selecciona un nodo en la visualización para ver su nombre, columna (estado, ciudad o motivo) y conexiones relacionadas.</p>`;
    });
  }

  botonesFiltroColumna.forEach((boton) => {
    boton.addEventListener("click", () => {
      filtroColumnaActivo = boton.dataset.filtroColumna || "todos";
      botonesFiltroColumna.forEach((item) => {
        item.classList.toggle("is-active", item === boton);
      });
      seleccionFijada = null;
      if (limpiar) limpiar.hidden = true;
      if (buscar) buscar.value = "";
      limpiarResaltado();
      aplicarFiltroColumna();
      detalle.innerHTML = `<p class="cartog-detalle-placeholder texto">Filtro activo: <strong>${boton.textContent}</strong>. Selecciona un nodo para ver detalle.</p>`;
    });
  });

  const iniciar = () => {
    const svgDoc = objeto.contentDocument;
    if (!svgDoc) return;
    activarSvg(svgDoc);
    aplicarFiltroColumna();
  };

  if (objeto.contentDocument) iniciar();
  objeto.addEventListener("load", iniciar);
}

function initPaleta() {
  const CLAVE_PALETA = "hub-paleta";
  const raiz = document.documentElement;
  const LEGACY = new Set(["tierra", "oceano"]);
  let guardada = localStorage.getItem(CLAVE_PALETA) || "institucional";
  if (LEGACY.has(guardada)) guardada = "institucional";
  raiz.dataset.paleta = guardada;

  const contenedor = document.querySelector("#selector-paleta");
  if (!contenedor) return;

  const marcar = (paleta) => {
    contenedor.querySelectorAll(".btn-paleta").forEach((btn) => {
      const activa = btn.dataset.paleta === paleta;
      btn.classList.toggle("is-active", activa);
      btn.setAttribute("aria-pressed", String(activa));
    });
  };

  marcar(guardada);

  contenedor.querySelectorAll(".btn-paleta").forEach((btn) => {
    btn.addEventListener("click", () => {
      const paleta = btn.dataset.paleta;
      raiz.dataset.paleta = paleta;
      localStorage.setItem(CLAVE_PALETA, paleta);
      marcar(paleta);
    });
  });
}

function actualizarIframeOim() {
  const iframe = document.querySelector("#oim-map-iframe");
  if (!iframe) return;
  const idioma = window.HubI18n?.getIdioma() === "en" ? "en" : "es";
  iframe.src = `https://www.migrationdataportal.org/${idioma}/embed-map`;
}

function initCambioIdioma() {
  window.addEventListener("hub:idioma", () => {
    initFactoresInteractivo();
    pintarEncuestaLocal();
    actualizarIframeOim();
    window.actualizarProgresoHistoria?.();
    window.actualizarMetricasCiudadania?.();
  });
}

escribirLectura();
initContadoresAnimados();
initNavegacion();
initNavegacionCapitulos();
initIndiceFlotante();
initProgresoHistoria();
initContacto();
initVolverArriba();
initCartografiaInteractiva();
initFactoresInteractivo();
initContadorVisitas();
initEncuestaVisitantes();
initCampoHistoria();
initMapaVisitantes();
initMapaVocesControles();
initRecorridoGuiado();
initPaleta();
initCambioIdioma();
actualizarIframeOim();



