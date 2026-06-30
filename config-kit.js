/**
 * Registro del kit OIM — Google Form vinculado a Google Sheets (recomendado).
 * Guía paso a paso: apps-script/SETUP-GOOGLE-FORM.md
 * Cuenta sugerida: barradas.andres@gmail.com
 *
 * Cuando crees el Form, pega aquí la URL formResponse y los entry.XXXXX
 * del enlace previo (Obtener enlace previo en Google Forms).
 */
window.HUB_KIT_FORM = {
  action: "",
  entries: {
    nombre: "",
    email: "",
    motivo: "",
    fecha: "",
    origen: "",
    id: "",
    motivoCodigo: ""
  }
};

/**
 * Alternativa: Web App de Apps Script (ver apps-script/SETUP-KIT.md).
 * Déjala vacía si usas solo Google Form.
 */
window.HUB_KIT_API = "";
