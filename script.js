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
    const offset = window.scrollY + nav.offsetHeight + 48;
    let activa = secciones[0].id;

    secciones.forEach((seccion) => {
      if (seccion.offsetTop <= offset) activa = seccion.id;
    });

    enlaces.forEach((enlace) => {
      enlace.classList.toggle("is-active", enlace.dataset.nav === activa);
    });
  };

  marcarActivo();
  window.addEventListener("scroll", marcarActivo, { passive: true });
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
initContacto();
initVolverArriba();
initCartografiaInteractiva();



