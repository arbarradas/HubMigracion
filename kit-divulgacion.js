(function () {
  "use strict";

  const CLAVE_ACCESO = "hub-kit-acceso";
  const CLAVE_REGISTROS = "hub-kit-registros";

  const MOTIVOS = {
    personal: "Uso personal / consulta",
    investigacion: "Investigación académica",
    clases: "Clases o docencia",
    medios: "Medios y periodismo",
    politica: "Política pública / sector gubernamental",
    osc: "Organización de la sociedad civil",
    capacitacion: "Capacitación o taller",
    proyecto: "Proyecto del Hub o colaboración institucional",
    otro: "Otro"
  };

  const form = document.getElementById("kit-acceso-form");
  const panelEnlaces = document.getElementById("kit-enlaces-oim");
  const avisoBloqueo = document.getElementById("kit-acceso-aviso");
  const mensajeOk = document.getElementById("kit-acceso-ok");

  if (!form || !panelEnlaces) return;

  const desbloquear = (datos) => {
    form.hidden = true;
    if (avisoBloqueo) avisoBloqueo.hidden = true;
    panelEnlaces.hidden = false;
    if (mensajeOk && datos) {
      mensajeOk.hidden = false;
      mensajeOk.textContent = `Acceso habilitado para ${datos.nombre}. Motivo: ${MOTIVOS[datos.motivo] || datos.motivo}.`;
    }
  };

  const leerAcceso = () => {
    try {
      const raw = localStorage.getItem(CLAVE_ACCESO);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const guardarRegistro = (entrada) => {
    try {
      const lista = JSON.parse(localStorage.getItem(CLAVE_REGISTROS) || "[]");
      lista.push(entrada);
      localStorage.setItem(CLAVE_REGISTROS, JSON.stringify(lista.slice(-500)));
    } catch {
      /* registro local opcional */
    }
  };

  const accesoPrevio = leerAcceso();
  if (accesoPrevio?.nombre && accesoPrevio?.email && accesoPrevio?.motivo) {
    desbloquear(accesoPrevio);
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const datos = new FormData(form);
    const nombre = String(datos.get("nombre") || "").trim();
    const email = String(datos.get("email") || "").trim();
    const motivo = String(datos.get("motivo") || "").trim();

    if (!nombre || !email || !motivo) {
      form.reportValidity();
      return;
    }

    const entrada = {
      nombre,
      email,
      motivo,
      motivoEtiqueta: MOTIVOS[motivo] || motivo,
      fecha: new Date().toISOString()
    };

    localStorage.setItem(CLAVE_ACCESO, JSON.stringify(entrada));
    guardarRegistro(entrada);
    desbloquear(entrada);
  });
})();
