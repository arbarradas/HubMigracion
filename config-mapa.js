/**
 * Mapa de voces — registro compartido del Hub.
 *
 * Opción A (recomendada): Google Form vinculado a Sheets.
 *   Guía: apps-script/SETUP-GOOGLE-FORM-MAPA.md
 *   Rellena HUB_MAPA_FORM con action (formResponse) y entry.XXXXX.
 *
 * Opción B: Web App de Apps Script (lee/escribe hoja «Respuestas»).
 *   Guía: apps-script/SETUP-MAPA.md
 *   Rellena HUB_MAPA_API con la URL /exec.
 *
 * Puedes usar ambas a la vez: el sitio envía al Form y, si hay API,
 * también sincroniza coordenadas en la hoja del script.
 */
window.HUB_MAPA_FORM = {
  action: "",
  entries: {
    origen: "",
    residencia: "",
    escribe: "",
    historia: "",
    fecha: "",
    origenLat: "",
    origenLng: "",
    residenciaLat: "",
    residenciaLng: "",
    escribeLat: "",
    escribeLng: "",
    id: ""
  }
};

window.HUB_MAPA_API = "";
