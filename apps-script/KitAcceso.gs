/**
 * Hub de Migración — registro de acceso al kit de divulgación (recursos OIM).
 * Guarda nombre, correo y motivo de uso en Google Sheets.
 *
 * Despliegue: ver SETUP-KIT.md en esta carpeta.
 */

const NOMBRE_HOJA_KIT = "KitAcceso";

const COLUMNAS_KIT = ["fecha", "nombre", "email", "motivo", "motivoEtiqueta", "origen", "id"];

function obtenerHojaKit_() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(NOMBRE_HOJA_KIT);
  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA_KIT);
    hoja.appendRow(COLUMNAS_KIT);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function sanitizarTextoKit_(valor, maximo) {
  if (valor === null || valor === undefined) return "";
  return String(valor)
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maximo);
}

function emailValido_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function respuestaJsonKit_(datos) {
  return ContentService.createTextOutput(JSON.stringify(datos)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doGet() {
  return respuestaJsonKit_({
    ok: true,
    servicio: "Hub Kit Acceso OIM",
    hoja: NOMBRE_HOJA_KIT
  });
}

function doPost(e) {
  try {
    const cuerpo = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};

    const entrada = {
      fecha: cuerpo.fecha || new Date().toISOString(),
      nombre: sanitizarTextoKit_(cuerpo.nombre, 200),
      email: sanitizarTextoKit_(cuerpo.email, 200).toLowerCase(),
      motivo: sanitizarTextoKit_(cuerpo.motivo, 80),
      motivoEtiqueta: sanitizarTextoKit_(cuerpo.motivoEtiqueta, 200),
      origen: sanitizarTextoKit_(cuerpo.origen || "kit-divulgacion", 120),
      id: cuerpo.id || Utilities.getUuid()
    };

    if (!entrada.nombre || !entrada.email || !entrada.motivo) {
      return respuestaJsonKit_({ ok: false, error: "Faltan campos obligatorios." });
    }

    if (!emailValido_(entrada.email)) {
      return respuestaJsonKit_({ ok: false, error: "Correo electrónico no válido." });
    }

    const hoja = obtenerHojaKit_();
    hoja.appendRow([
      entrada.fecha,
      entrada.nombre,
      entrada.email,
      entrada.motivo,
      entrada.motivoEtiqueta,
      entrada.origen,
      entrada.id
    ]);

    return respuestaJsonKit_({ ok: true, entrada: entrada });
  } catch (error) {
    return respuestaJsonKit_({ ok: false, error: String(error) });
  }
}
