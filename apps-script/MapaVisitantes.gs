/**
 * Hub de Migración — backend del mapa de voces.
 * GET: lee respuestas del Form y/o hoja «Respuestas» (POST directo).
 * POST: agrega fila en «Respuestas» (opcional, si no usas solo Google Form).
 *
 * Despliegue: SETUP-MAPA.md y SETUP-GOOGLE-FORM-MAPA.md
 */

const NOMBRE_HOJA = "Respuestas";
const NOMBRE_HOJA_FORM = "Respuestas de formulario 1";
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

function obtenerHoja_(nombre) {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(nombre);
  if (!hoja && nombre === NOMBRE_HOJA) {
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

function numeroOpcional_(valor) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : undefined;
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

/**
 * Google Form vinculado a la hoja (columnas A–M):
 * A Marca de tiempo, B origen, C residencia, D escribe, E historia,
 * F fecha ISO, G–L coords, M id
 */
function filaFormAEntrada_(fila) {
  const fechaForm = fila[0] ? new Date(fila[0]).toISOString() : "";
  const entrada = {
    fecha: fila[5] || fechaForm,
    origen: sanitizarTexto_(fila[1], 200),
    residencia: sanitizarTexto_(fila[2], 200),
    escribe: sanitizarTexto_(fila[3], 200),
    historia: sanitizarTexto_(fila[4] || "", MAX_HISTORIA),
    origenLat: numeroOpcional_(fila[6]),
    origenLng: numeroOpcional_(fila[7]),
    residenciaLat: numeroOpcional_(fila[8]),
    residenciaLng: numeroOpcional_(fila[9]),
    escribeLat: numeroOpcional_(fila[10]),
    escribeLng: numeroOpcional_(fila[11]),
    id: fila[12] ? String(fila[12]) : ""
  };

  if (!entrada.historia) delete entrada.historia;
  if (!entrada.id) entrada.id = Utilities.getUuid();

  return entrada;
}

function claveEntrada_(entrada) {
  if (entrada.id) return String(entrada.id);
  return [entrada.origen, entrada.residencia, entrada.escribe, entrada.fecha].join("|");
}

function leerHojaApi_() {
  const hoja = obtenerHoja_(NOMBRE_HOJA);
  if (!hoja) return [];

  const valores = hoja.getDataRange().getValues();
  if (valores.length < 2) return [];

  return valores
    .slice(1)
    .map(filaAEntrada_)
    .filter((entrada) => entrada.origen && entrada.residencia && entrada.escribe);
}

function leerHojaForm_() {
  const hoja = obtenerHoja_(NOMBRE_HOJA_FORM);
  if (!hoja) return [];

  const valores = hoja.getDataRange().getValues();
  if (valores.length < 2) return [];

  return valores
    .slice(1)
    .map(filaFormAEntrada_)
    .filter((entrada) => entrada.origen && entrada.residencia && entrada.escribe);
}

function unificarEntradas_(listas) {
  const unificadas = new Map();
  listas.forEach((lista) => {
    lista.forEach((entrada) => {
      unificadas.set(claveEntrada_(entrada), entrada);
    });
  });
  return [...unificadas.values()];
}

function respuestaJson_(datos) {
  return ContentService.createTextOutput(JSON.stringify(datos)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doGet() {
  const entradas = unificarEntradas_([leerHojaApi_(), leerHojaForm_()]);
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

    const hoja = obtenerHoja_(NOMBRE_HOJA);
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
