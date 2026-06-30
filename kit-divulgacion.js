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
  const mensajeError = document.getElementById("kit-acceso-error");
  const btnSubmit = document.getElementById("kit-acceso-submit");

  if (!form || !panelEnlaces) return;

  const obtenerKitFormConfig = () => {
    const cfg = typeof window !== "undefined" ? window.HUB_KIT_FORM : null;
    return cfg && typeof cfg === "object" ? cfg : null;
  };

  const kitFormActivo = () => {
    const cfg = obtenerKitFormConfig();
    const action = String(cfg?.action || "").trim();
    const entries = cfg?.entries || {};
    return Boolean(
      action.includes("docs.google.com/forms") &&
        action.endsWith("/formResponse") &&
        entries.nombre &&
        entries.email &&
        entries.motivo
    );
  };

  const obtenerKitApiUrl = () => {
    const url = (typeof window !== "undefined" && window.HUB_KIT_API) || "";
    return typeof url === "string" ? url.trim() : "";
  };

  const kitApiActiva = () => obtenerKitApiUrl().length > 0;

  const repositorioRemotoActivo = () => kitFormActivo() || kitApiActiva();

  const ocultarError = () => {
    if (!mensajeError) return;
    mensajeError.hidden = true;
    mensajeError.textContent = "";
  };

  const mostrarError = (texto) => {
    if (!mensajeError) return;
    mensajeError.hidden = false;
    mensajeError.textContent = texto;
  };

  const desbloquear = (datos) => {
    form.hidden = true;
    if (avisoBloqueo) avisoBloqueo.hidden = true;
    ocultarError();
    panelEnlaces.hidden = false;
    if (mensajeOk && datos) {
      mensajeOk.hidden = false;
      mensajeOk.textContent = `Acceso habilitado para ${datos.nombre}. Motivo: ${MOTIVOS[datos.motivo] || datos.motivoEtiqueta || datos.motivo}.`;
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

  const guardarRegistroLocal = (entrada) => {
    try {
      const lista = JSON.parse(localStorage.getItem(CLAVE_REGISTROS) || "[]");
      lista.push(entrada);
      localStorage.setItem(CLAVE_REGISTROS, JSON.stringify(lista.slice(-500)));
    } catch {
      /* respaldo local opcional */
    }
  };

  async function enviarRegistroGoogleForm(entrada) {
    if (!kitFormActivo()) return { ok: true, omitido: true };

    const cfg = obtenerKitFormConfig();
    const entries = cfg.entries;
    const params = new URLSearchParams();

    params.set(entries.nombre, entrada.nombre);
    params.set(entries.email, entrada.email);
    params.set(entries.motivo, entrada.motivoEtiqueta || MOTIVOS[entrada.motivo] || entrada.motivo);
    if (entries.fecha) params.set(entries.fecha, entrada.fecha);
    if (entries.origen) params.set(entries.origen, entrada.origen);
    if (entries.id) params.set(entries.id, entrada.id);
    if (entries.motivoCodigo) params.set(entries.motivoCodigo, entrada.motivo);

    try {
      await fetch(cfg.action.trim(), {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: params.toString()
      });
      return { ok: true, via: "google-form" };
    } catch {
      return {
        ok: false,
        error: "No se pudo enviar el registro a Google Forms. Revisa tu conexión e inténtalo de nuevo."
      };
    }
  }

  async function enviarRegistroAppsScript(entrada) {
    const url = obtenerKitApiUrl();
    if (!url) return { ok: true, omitido: true };

    try {
      const respuesta = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(entrada)
      });
      if (!respuesta.ok) {
        return { ok: false, error: "No se pudo conectar con el registro del Hub." };
      }
      const datos = await respuesta.json();
      return datos && datos.ok ? { ok: true, via: "apps-script" } : { ok: false, error: datos?.error || "Registro rechazado." };
    } catch {
      return { ok: false, error: "Error de red al enviar el registro. Intenta de nuevo." };
    }
  }

  async function enviarRegistroRemoto(entrada) {
    const formulario = await enviarRegistroGoogleForm(entrada);
    if (!formulario.omitido) return formulario;
    return enviarRegistroAppsScript(entrada);
  }

  const accesoPrevio = leerAcceso();
  if (accesoPrevio?.nombre && accesoPrevio?.email && accesoPrevio?.motivo) {
    desbloquear(accesoPrevio);
  }

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    ocultarError();

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
      fecha: new Date().toISOString(),
      origen: "kit-divulgacion",
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())
    };

    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.textContent = repositorioRemotoActivo() ? "Enviando registro…" : "Habilitando acceso…";
    }

    const remoto = await enviarRegistroRemoto(entrada);

    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.textContent = "Acceder a los recursos OIM";
    }

    if (!remoto.ok && !remoto.omitido) {
      mostrarError(remoto.error || "No se pudo registrar el acceso. Revisa tu conexión e inténtalo de nuevo.");
      return;
    }

    localStorage.setItem(CLAVE_ACCESO, JSON.stringify(entrada));
    guardarRegistroLocal(entrada);
    desbloquear(entrada);
  });
})();
