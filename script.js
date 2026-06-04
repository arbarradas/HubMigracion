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

function formatearNumero(numero) {
  return new Intl.NumberFormat("es-MX").format(numero);
}

function actualizarPanelMigracion() {
  const destinos = {
    "migrantes-eua": datosMigracion[0].valor,
    "migrantes-europa": datosMigracion[1].valor,
    "migrantes-asia": datosMigracion[2].valor
  };

  Object.entries(destinos).forEach(([id, valor]) => {
    const elemento = document.querySelector(`#${id}`);
    if (elemento) elemento.textContent = formatearNumero(valor);
  });
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

    enlaces.forEach((enlace) => {
      enlace.classList.toggle("is-active", enlace.dataset.nav === activa);
    });

    return activa;
  };

  marcarActivo();
  window.addEventListener("scroll", marcarActivo, { passive: true });
}

const capitulosHistoria = [
  { id: "hub", etiqueta: "El Hub" },
  { id: "podcast", etiqueta: "Podcast" },
  { id: "datos", etiqueta: "Datos" },
  { id: "migracion-mundial", etiqueta: "Migración mundial" },
  { id: "investigacion", etiqueta: "Investigación" },
  { id: "cartografia-estudiantil", etiqueta: "Cartografía" },
  { id: "proyectos-hub", etiqueta: "Proyectos" },
  { id: "participacion", etiqueta: "Participar" },
  { id: "encuesta-visitantes", etiqueta: "Tu ubicación" },
  { id: "contacto", etiqueta: "Contacto" }
];

const factoresPuebla = [
  {
    factor: "Gusto por la ciudad",
    valor: 5,
    detalle: "Afinidad con Puebla como lugar de vida, más allá de lo académico."
  },
  {
    factor: "Calidad académica",
    valor: 5,
    detalle: "Percepción de una oferta educativa sólida en el campus."
  },
  {
    factor: "Oportunidades universitarias",
    valor: 4,
    detalle: "Acceso a programas, redes y experiencias dentro de la institución."
  },
  {
    factor: "Familia y amistades",
    valor: 3,
    detalle: "Redes de apoyo cercanas que influyen en la decisión de quedarse."
  },
  {
    factor: "Carrera disponible",
    valor: 3,
    detalle: "Oferta de la carrera o trayectoria que buscaban al llegar."
  },
  {
    factor: "Oportunidades laborales",
    valor: 2,
    detalle: "Perspectivas de empleo o prácticas en la región."
  },
  {
    factor: "Economía y comodidad",
    valor: 2,
    detalle: "Costo de vida y condiciones materiales para permanecer."
  },
  {
    factor: "Otros",
    valor: 3,
    detalle: "Motivos adicionales mencionados en respuestas abiertas."
  }
];

const CLAVE_VISITAS = "hub-migracion-visitas";
const CLAVE_ENCUESTA = "hub-migracion-encuesta";
const CLAVE_GEOCACHE = "hub-migracion-geocache";
const COUNT_API = "https://api.countapi.xyz";
const NOMINATIM_API = "https://nominatim.openstreetmap.org/search";

const pasosRecorrido = [
  {
    id: "hub",
    titulo: "El Hub de Migración",
    texto: "Este es el punto de partida: qué es el Hub, quiénes lo impulsan y cómo se articula con la OIM y el campus Puebla."
  },
  {
    id: "podcast",
    titulo: "Primero, las voces",
    texto: "Escucha el episodio con Javier Moreno Sánchez desde el Parlamento Europeo. La migración se narra antes de medirla con cifras."
  },
  {
    id: "datos",
    titulo: "Datos para reflexionar",
    texto: "Estas cifras del IME/SRE dimensionan la migración mexicana en el exterior y preparan el contexto global."
  },
  {
    id: "migracion-mundial",
    titulo: "Migración en el mundo",
    texto: "Explora el mapa de la OIM para comparar stocks migratorios a escala planetaria."
  },
  {
    id: "investigacion",
    titulo: "Investigación en Puebla",
    texto: "Revisa el estudio sobre movilidad estudiantil y el grafo interactivo de factores en Graph Commons."
  },
  {
    id: "cartografia-estudiantil",
    titulo: "Cartografía estudiantil",
    texto: "Interactúa con el dendograma: estados, ciudades de origen y motivos de llegada a Puebla."
  },
  {
    id: "proyectos-hub",
    titulo: "Proyectos con impacto",
    texto: "Capaz, cine, análisis de datos y presencia internacional con la OIM y la GMMA."
  },
  {
    id: "participacion",
    titulo: "Tu participación",
    texto: "El recorrido cierra con una invitación: puedes proponer proyectos y sumarte al Hub."
  },
  {
    id: "encuesta-visitantes",
    titulo: "Tu ubicación en el mapa",
    texto: "Comparte de dónde eres y desde dónde nos lees. Tu respuesta aparecerá en el mapa de visitantes."
  }
];

let mapaVisitantesInstancia = null;
let capaMarcadoresVisitantes = null;
let capaRutasVisitantes = null;

function initFactoresInteractivo() {
  const contenedor = document.querySelector("#factores-grafica");
  const detalle = document.querySelector("#factores-detalle");
  const toggle = document.querySelector("#factores-toggle-png");
  const pngOriginal = document.querySelector("#factores-png-original");

  if (!contenedor || !detalle) return;

  const maxValor = Math.max(...factoresPuebla.map((fila) => fila.valor));
  let factorFijado = null;

  const resaltar = (fila) => {
    contenedor.querySelectorAll(".factores-barra").forEach((barra) => {
      const activa = barra.dataset.factor === fila.factor;
      barra.classList.toggle("is-active", activa);
      barra.classList.toggle("is-atenuada", !activa);
    });
    detalle.innerHTML = `<strong>${fila.factor}</strong> — ${fila.valor} menciones temáticas. ${fila.detalle}`;
  };

  const limpiar = () => {
    if (factorFijado) return;
    contenedor.querySelectorAll(".factores-barra").forEach((barra) => {
      barra.classList.remove("is-active", "is-atenuada");
    });
    detalle.textContent = "Selecciona un factor para explorar los resultados de la encuesta.";
  };

  factoresPuebla.forEach((fila) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "factores-barra";
    item.dataset.factor = fila.factor;
    item.setAttribute("role", "listitem");
    item.setAttribute("aria-label", `${fila.factor}: ${fila.valor} menciones`);

    const etiqueta = document.createElement("span");
    etiqueta.className = "factores-etiqueta";
    etiqueta.textContent = fila.factor;

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
    item.append(etiqueta, pista, valor);

    item.addEventListener("mouseenter", () => resaltar(fila));
    item.addEventListener("focus", () => resaltar(fila));
    item.addEventListener("mouseleave", limpiar);
    item.addEventListener("click", () => {
      factorFijado = factorFijado?.factor === fila.factor ? null : fila;
      if (factorFijado) {
        resaltar(fila);
      } else {
        contenedor.querySelectorAll(".factores-barra").forEach((barra) => {
          barra.classList.remove("is-active", "is-atenuada");
        });
        detalle.textContent = "Selecciona un factor para explorar los resultados de la encuesta.";
      }
    });

    contenedor.appendChild(item);
  });

  if (toggle && pngOriginal) {
    toggle.addEventListener("click", () => {
      const visible = pngOriginal.hidden;
      pngOriginal.hidden = !visible;
      toggle.setAttribute("aria-expanded", String(visible));
      toggle.textContent = visible
        ? "Ocultar imagen original del estudio"
        : "Ver imagen original del estudio";
    });
  }
}

function formatearContadorVisitas(valor) {
  return new Intl.NumberFormat("es-MX").format(valor);
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
  return `${entrada.origen}|${entrada.residencia}|${entrada.fecha || ""}`;
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
  const unificadas = new Map();

  [...compartidas, ...locales].forEach((entrada) => {
    unificadas.set(claveEntradaVisitante(entrada), entrada);
  });

  return [...unificadas.values()];
}

function crearIconoMarcador(tipo) {
  const clase = tipo === "origen" ? "marcador-origen" : "marcador-residencia";
  return L.divIcon({
    className: `marcador-visitante ${clase}`,
    html: `<span aria-hidden="true"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
}

function actualizarNotaMapa(total, conCoordenadas) {
  const nota = document.querySelector("#mapa-visitantes-nota");
  if (!nota) return;

  if (total === 0) {
    nota.textContent =
      "Aún no hay ubicaciones en el mapa. Sé la primera persona en compartir tu origen y residencia.";
    return;
  }

  nota.textContent = `${conCoordenadas} de ${total} respuesta${total === 1 ? "" : "s"} con ubicación en el mapa (origen y residencia). Los datos combinan contribuciones del sitio y de tu navegador.`;
}

async function renderizarMapaVisitantes() {
  if (typeof L === "undefined") return;

  const contenedor = document.querySelector("#mapa-visitantes");
  if (!contenedor) return;

  const respuestas = await obtenerTodasLasRespuestas();

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

  respuestas.forEach((entrada) => {
    const tieneOrigen =
      typeof entrada.origenLat === "number" && typeof entrada.origenLng === "number";
    const tieneResidencia =
      typeof entrada.residenciaLat === "number" && typeof entrada.residenciaLng === "number";

    if (tieneOrigen) {
      const marcadorOrigen = L.marker([entrada.origenLat, entrada.origenLng], {
        icon: crearIconoMarcador("origen")
      });
      marcadorOrigen.bindPopup(`<strong>Origen</strong><br>${entrada.origen}`);
      capaMarcadoresVisitantes.addLayer(marcadorOrigen);
      bounds.push([entrada.origenLat, entrada.origenLng]);
    }

    if (tieneResidencia) {
      const marcadorResidencia = L.marker([entrada.residenciaLat, entrada.residenciaLng], {
        icon: crearIconoMarcador("residencia")
      });
      marcadorResidencia.bindPopup(`<strong>Residencia</strong><br>${entrada.residencia}`);
      capaMarcadoresVisitantes.addLayer(marcadorResidencia);
      bounds.push([entrada.residenciaLat, entrada.residenciaLng]);
    }

    if (tieneOrigen && tieneResidencia) {
      conCoordenadas += 1;
      const linea = L.polyline(
        [
          [entrada.origenLat, entrada.origenLng],
          [entrada.residenciaLat, entrada.residenciaLng]
        ],
        { color: "#8b4a2f", weight: 2, opacity: 0.45, dashArray: "6 6" }
      );
      capaRutasVisitantes.addLayer(linea);
    }
  });

  actualizarNotaMapa(respuestas.length, conCoordenadas);

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
    mensaje.textContent =
      "Aún no hay respuestas en este navegador. Sé la primera persona en dejar tu huella en el mapa.";
    lista.hidden = true;
    lista.innerHTML = "";
    return;
  }

  mensaje.textContent = `${respuestas.length} respuesta${respuestas.length === 1 ? "" : "s"} en este navegador (también en el mapa):`;
  lista.hidden = false;
  lista.innerHTML = respuestas
    .slice(-6)
    .reverse()
    .map(
      (entrada) =>
        `<li><strong>${entrada.origen}</strong> → vive en ${entrada.residencia}</li>`
    )
    .join("");
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
    const boton = formulario.querySelector('button[type="submit"]');
    const mensaje = document.querySelector("#encuesta-mensaje");

    if (!origen || !residencia) return;

    if (boton) {
      boton.disabled = true;
      boton.textContent = "Ubicando en el mapa…";
    }
    if (mensaje) mensaje.textContent = "Geocodificando tu origen y residencia…";

    const [coordsOrigen, coordsResidencia] = await Promise.all([
      geocodificarLugar(origen),
      geocodificarLugar(residencia)
    ]);

    const entrada = {
      id: Date.now(),
      origen,
      residencia,
      fecha: new Date().toISOString(),
      origenLat: coordsOrigen?.lat,
      origenLng: coordsOrigen?.lng,
      residenciaLat: coordsResidencia?.lat,
      residenciaLng: coordsResidencia?.lng
    };

    const respuestas = leerEncuestasLocales();
    respuestas.push(entrada);
    localStorage.setItem(CLAVE_ENCUESTA, JSON.stringify(respuestas));

    formulario.reset();
    pintarEncuestaLocal();
    await renderizarMapaVisitantes();

    if (mensaje) {
      const enMapa = coordsOrigen && coordsResidencia;
      mensaje.textContent = enMapa
        ? `¡Gracias! Tu origen (${origen}) y tu residencia (${residencia}) ya están en el mapa.`
        : `¡Gracias! Guardamos tu respuesta. No pudimos ubicar algún lugar en el mapa; intenta ser más específico (ciudad y país).`;
    }

    if (boton) {
      boton.disabled = false;
      boton.textContent = "Compartir mi ubicación";
    }
  });
}

function initRecorridoGuiado() {
  const overlay = document.querySelector("#recorrido-overlay");
  const dialogo = document.querySelector("#recorrido-dialogo");
  const titulo = document.querySelector("#recorrido-titulo");
  const texto = document.querySelector("#recorrido-texto");
  const paso = document.querySelector("#recorrido-paso");
  const btnIniciar = document.querySelector("#btn-iniciar-recorrido");
  const btnAnterior = document.querySelector("#recorrido-anterior");
  const btnSiguiente = document.querySelector("#recorrido-siguiente");
  const btnCerrar = document.querySelector("#recorrido-cerrar");
  const nav = document.querySelector(".nav-hub");
  const menu = document.querySelector("#nav-menu");

  if (!overlay || !dialogo || !btnIniciar || pasosRecorrido.length === 0) return;

  let indiceActual = 0;
  let recorridoActivo = false;

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

    if (titulo) titulo.textContent = pasoActual.titulo;
    if (texto) texto.textContent = pasoActual.texto;
    if (paso) paso.textContent = `Paso ${indiceActual + 1} de ${pasosRecorrido.length}`;

    if (btnAnterior) btnAnterior.disabled = indiceActual === 0;
    if (btnSiguiente) {
      btnSiguiente.textContent =
        indiceActual === pasosRecorrido.length - 1 ? "Finalizar recorrido" : "Siguiente";
    }

    if (pasoActual.id === "encuesta-visitantes" && mapaVisitantesInstancia) {
      setTimeout(() => mapaVisitantesInstancia.invalidateSize(), 400);
    }
  };

  const abrirRecorrido = () => {
    recorridoActivo = true;
    overlay.hidden = false;
    cerrarMenuNav();
    indiceActual = 0;
    irAPaso(0);
    dialogo.focus();
  };

  const cerrarRecorrido = () => {
    recorridoActivo = false;
    overlay.hidden = true;
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
      cerrarRecorrido();
    }
  });

  btnCerrar?.addEventListener("click", cerrarRecorrido);

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
    const marca = document.createElement("span");
    marca.className = "progreso-segmento";
    marca.dataset.capitulo = capitulo.id;
    marca.title = capitulo.etiqueta;
    segmentos.appendChild(marca);
  });

  const marcas = [...segmentos.querySelectorAll(".progreso-segmento")];

  const actualizarProgreso = () => {
    const inicio = document.querySelector("#hub")?.offsetTop ?? 0;
    const fin = document.documentElement.scrollHeight - window.innerHeight;
    const avance = fin > inicio ? Math.min(100, Math.max(0, ((window.scrollY - inicio) / (fin - inicio)) * 100)) : 0;

    relleno.style.width = `${avance}%`;
    barra.setAttribute("aria-valuenow", String(Math.round(avance)));

    const offset = window.scrollY + nav.offsetHeight + 56;
    let indiceActivo = 0;

    capitulosHistoria.forEach((capitulo, indice) => {
      const seccion = document.querySelector(`#${capitulo.id}`);
      if (seccion && seccion.offsetTop <= offset) indiceActivo = indice;
    });

    marcas.forEach((marca, indice) => {
      marca.classList.toggle("is-active", indice === indiceActivo);
      marca.classList.toggle("is-pasado", indice < indiceActivo);
    });

    etiqueta.textContent = `Capítulo: ${capitulosHistoria[indiceActivo].etiqueta}`;
  };

  actualizarProgreso();
  window.addEventListener("scroll", actualizarProgreso, { passive: true });
  window.addEventListener("resize", actualizarProgreso, { passive: true });
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
  `;

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
      grupo.classList.remove("cartog-atenuado", "cartog-resaltado", "cartog-coincidencia-busqueda");
    });
    enlaces.forEach(({ path }) => {
      path.classList.remove("cartog-enlace-resaltado", "cartog-enlace-atenuado");
    });
    tooltip.hidden = true;
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

  const iniciar = () => {
    const svgDoc = objeto.contentDocument;
    if (!svgDoc) return;
    activarSvg(svgDoc);
  };

  if (objeto.contentDocument) iniciar();
  objeto.addEventListener("load", iniciar);
}

actualizarPanelMigracion();
escribirLectura();
initNavegacion();
initProgresoHistoria();
initContacto();
initVolverArriba();
initCartografiaInteractiva();
initFactoresInteractivo();
initContadorVisitas();
initEncuestaVisitantes();
initMapaVisitantes();
initRecorridoGuiado();



