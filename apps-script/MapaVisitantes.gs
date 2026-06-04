/**
 * Hub de Migración — backend ligero del mapa de visitantes.
 * Guarda respuestas en Google Sheets y expone JSON para el sitio estático.
 *
 * Despliegue: ver SETUP-MAPA.md en esta carpeta.
 */

const NOMBRE_HOJA = "Respuestas";
const MAX_HISTORIA = 120;

const COLUMNAS = [
  "fecha",
  "origen",
  "residencia",
  "escribe",
  "historia",
  "origenLat",
  "origenLng",
  "residenciaLat",
  "residenciaLng",
  "escribeLat",
  "escribeLng",
  "id"
];

function obtenerHoja_() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(NOMBRE_HOJA);
  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA);
    hoja.appendRow(COLUMNAS);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function sanitizarTexto_(valor, maximo) {
  if (valor === null || valor === undefined) return "";
  return String(valor)
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maximo);
}

function numero_(valor) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : "";
}

function filaAEntrada_(fila) {
  const entrada = {
    fecha: fila[0] || "",
    origen: fila[1] || "",
    residencia: fila[2] || "",
    escribe: fila[3] || "",
    historia: fila[4] || "",
    origenLat: fila[5] === "" ? undefined : Number(fila[5]),
    origenLng: fila[6] === "" ? undefined : Number(fila[6]),
    residenciaLat: fila[7] === "" ? undefined : Number(fila[7]),
    residenciaLng: fila[8] === "" ? undefined : Number(fila[8]),
    escribeLat: fila[9] === "" ? undefined : Number(fila[9]),
    escribeLng: fila[10] === "" ? undefined : Number(fila[10]),
    id: fila[11] || ""
  };

  if (entrada.historia) {
    entrada.historia = sanitizarTexto_(entrada.historia, MAX_HISTORIA);
  } else {
    delete entrada.historia;
  }

  return entrada;
}

function respuestaJson_(datos) {
  return ContentService.createTextOutput(JSON.stringify(datos)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doGet() {
  const hoja = obtenerHoja_();
  const valores = hoja.getDataRange().getValues();
  if (valores.length < 2) {
    return respuestaJson_([]);
  }

  const entradas = valores
    .slice(1)
    .map(filaAEntrada_)
    .filter((entrada) => entrada.origen && entrada.residencia);

  return respuestaJson_(entradas);
}

function doPost(e) {
  try {
    const cuerpo = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};

    const entrada = {
      fecha: cuerpo.fecha || new Date().toISOString(),
      origen: sanitizarTexto_(cuerpo.origen, 200),
      residencia: sanitizarTexto_(cuerpo.residencia, 200),
      escribe: sanitizarTexto_(cuerpo.escribe, 200),
      historia: sanitizarTexto_(cuerpo.historia || "", MAX_HISTORIA),
      origenLat: numero_(cuerpo.origenLat),
      origenLng: numero_(cuerpo.origenLng),
      residenciaLat: numero_(cuerpo.residenciaLat),
      residenciaLng: numero_(cuerpo.residenciaLng),
      escribeLat: numero_(cuerpo.escribeLat),
      escribeLng: numero_(cuerpo.escribeLng),
      id: cuerpo.id || Utilities.getUuid()
    };

    if (!entrada.origen || !entrada.residencia || !entrada.escribe) {
      return respuestaJson_({ ok: false, error: "Faltan campos obligatorios." });
    }

    const hoja = obtenerHoja_();
    hoja.appendRow([
      entrada.fecha,
      entrada.origen,
      entrada.residencia,
      entrada.escribe,
      entrada.historia,
      entrada.origenLat,
      entrada.origenLng,
      entrada.residenciaLat,
      entrada.residenciaLng,
      entrada.escribeLat,
      entrada.escribeLng,
      entrada.id
    ]);

    if (!entrada.historia) delete entrada.historia;

    return respuestaJson_({ ok: true, entrada: entrada });
  } catch (error) {
    return respuestaJson_({ ok: false, error: String(error) });
  }
}
