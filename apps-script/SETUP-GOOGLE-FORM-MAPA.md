# Guía: Google Form + Sheets para el mapa de voces

Conecta el formulario **«¿De dónde nos visitas?»** del sitio con un **Google Form** vinculado a una **Google Sheet**. Las respuestas aparecen en el mapa para todas las personas que visiten el sitio.

**Tiempo estimado:** 20 minutos.

---

## Paso 1 — Crear el Google Form

1. Entra a [Google Forms](https://forms.google.com).
2. **Formulario en blanco**.
3. Título sugerido: **`Hub Migración — Mapa de voces`**
4. Descripción (opcional): *Origen, residencia y desde dónde nos escribes. Respuestas visibles en el mapa del Hub (Tec Puebla).*

---

## Paso 2 — Rubros del Form (en este orden exacto)

Crea **exactamente** estas preguntas. El número importa: debe coincidir con la hoja y con `config-mapa.js`.

| Rubro | Pregunta en el Form | Tipo | Obligatoria | Quién la llena |
|------|---------------------|------|-------------|----------------|
| **1** | ¿Cuál es tu lugar de origen? | Respuesta corta | Sí | Visitante / sitio |
| **2** | ¿En dónde resides actualmente? | Respuesta corta | Sí | Visitante / sitio |
| **3** | ¿De dónde nos escribes? | Respuesta corta | Sí | Visitante / sitio |
| **4** | Tu voz en una frase | Párrafo | No | Visitante / sitio (máx. 120 caracteres) |
| **5** | Fecha (ISO) | Respuesta corta | No | **Sitio** (automático) |
| **6** | Origen lat | Respuesta corta | No | **Sitio** (geocodificación) |
| **7** | Origen lng | Respuesta corta | No | **Sitio** |
| **8** | Residencia lat | Respuesta corta | No | **Sitio** |
| **9** | Residencia lng | Respuesta corta | No | **Sitio** |
| **10** | Escribe lat | Respuesta corta | No | **Sitio** |
| **11** | Escribe lng | Respuesta corta | No | **Sitio** |
| **12** | ID registro | Respuesta corta | No | **Sitio** (identificador único) |

> **Columna A** de la hoja: marca de tiempo (la agrega Google automáticamente).  
> Los rubros **5–12** no los ve el usuario en el sitio: el código los envía al guardar para que el mapa tenga coordenadas.

### Consejos por rubro

1. **Origen** — Ciudad y país, ej. «Xalapa, Veracruz, México».
2. **Residencia** — Dónde vives ahora, ej. «Puebla, México».
3. **Escribe** — Desde dónde nos lees hoy, ej. «Bruselas, Bélgica» (puede diferir de residencia).
4. **Frase** — Opcional; alimenta el **muro de la comunidad** y el mapa de voces.
5–12. Dejar en el Form como respuesta corta; el sitio los rellena al enviar.

---

## Paso 2 (detalle) — Crear el Google Form

## Paso 3 — Vincular a Google Sheets

1. Pestaña **Respuestas** → icono de **Google Sheets** → crear hoja nueva.
2. Nombre sugerido: `Hub Migración — Mapa voces`.

---

## Paso 4 — URL `formResponse` y `entry.XXXXX`

1. **Enviar** → **Enlace** → copia la URL `viewform`.
2. Cambia `viewform` por **`formResponse`** → va en `config-mapa.js` → `HUB_MAPA_FORM.action`.
3. **Obtener enlace previo**: rellena cada pregunta y copia los `entry.XXXXX` de la URL generada.
4. Pégalos en `config-mapa.js` → `HUB_MAPA_FORM.entries`.

Ejemplo:

```javascript
window.HUB_MAPA_FORM = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLS.../formResponse",
  entries: {
    origen: "entry.111111111",
    residencia: "entry.222222222",
    escribe: "entry.333333333",
    historia: "entry.444444444",
    fecha: "entry.555555555",
    origenLat: "entry.666666666",
    origenLng: "entry.777777777",
    residenciaLat: "entry.888888888",
    residenciaLng: "entry.999999999",
    escribeLat: "entry.101010101",
    escribeLng: "entry.121212121",
    id: "entry.131313131"
  }
};
```

---

## Paso 5 — Apps Script para leer el mapa (GET)

El Form guarda filas, pero el sitio **lee** el mapa con Apps Script:

1. En la **misma hoja** del Form: **Extensiones → Apps Script**.
2. Pega el contenido de `apps-script/MapaVisitantes.gs`.
3. **Implementar → Aplicación web** → acceso **Cualquier persona**.
4. Copia la URL `/exec` en `config-mapa.js` → `HUB_MAPA_API`.

El script lee la pestaña del Form (`Respuestas de formulario 1` por defecto) y la pestaña `Respuestas` si usas POST directo.

---

## Paso 6 — Subir a GitHub y probar

1. Guarda `config-mapa.js` con `action` y `entries` (y `HUB_MAPA_API` si usas el paso 5).
2. Sube a `main` y espera GitHub Pages.
3. Envía una respuesta desde el sitio → revisa la hoja y el mapa en otro navegador.

---

## Resumen

| Archivo | Qué configuras |
|---------|----------------|
| `config-mapa.js` → `HUB_MAPA_FORM` | Envío al Form (POST) |
| `config-mapa.js` → `HUB_MAPA_API` | Lectura compartida del mapa (GET) |

Sin configuración, el mapa sigue funcionando en modo local + `datos-visitantes.json`.
