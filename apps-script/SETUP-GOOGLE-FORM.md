# Guía: Google Form + Google Sheets para el Kit OIM

Conecta el formulario del **Kit de divulgación** del sitio con un **Google Form** en tu cuenta (`barradas.andres@gmail.com`). Las respuestas se guardan solas en una **Google Sheet** vinculada.

**Tiempo estimado:** 15 minutos · **Sin Apps Script** (más simple que la opción B).

---

## Paso 1 — Crear el Google Form

1. Entra a [Google Forms](https://forms.google.com) con **barradas.andres@gmail.com**.
2. **Formulario en blanco**.
3. Título del formulario:

   **`Hub Migración — Registro acceso Kit OIM`**

4. Descripción (opcional):

   *Registro de quienes acceden al glosario OIM, Portal de Datos e Informe Mundial desde el kit de divulgación del Hub (Tec Puebla).*

---

## Paso 2 — Agregar las preguntas (en este orden)

Crea **exactamente** estas preguntas. El orden importa para que coincida con la hoja.

| # | Pregunta | Tipo | Obligatoria | Opciones / notas |
|---|----------|------|-------------|------------------|
| 1 | **Nombre completo** | Respuesta corta | Sí | — |
| 2 | **Correo electrónico** | Respuesta corta | Sí | Activa validación «Correo electrónico» en los tres puntos ⋮ de la pregunta |
| 3 | **Motivo de uso** | Lista desplegable | Sí | Copia **tal cual** estas 9 opciones (una por línea): |
|   | | | | `Uso personal / consulta` |
|   | | | | `Investigación académica` |
|   | | | | `Clases o docencia` |
|   | | | | `Medios y periodismo` |
|   | | | | `Política pública / sector gubernamental` |
|   | | | | `Organización de la sociedad civil` |
|   | | | | `Capacitación o taller` |
|   | | | | `Proyecto del Hub o colaboración institucional` |
|   | | | | `Otro` |
| 4 | **Fecha (automática)** | Respuesta corta | No | El sitio la rellena en formato ISO |
| 5 | **Origen** | Respuesta corta | No | El sitio envía `kit-divulgacion` |
| 6 | **ID de registro** | Respuesta corta | No | Identificador único generado por el sitio |
| 7 | **Código motivo** | Respuesta corta | No | Código interno: `personal`, `clases`, etc. |

> La **marca de tiempo** la agrega Google automáticamente en la hoja de respuestas (columna A).

---

## Paso 3 — Vincular respuestas a Google Sheets

1. En el Form, pestaña **Respuestas**.
2. Clic en el icono de **Google Sheets** (crear hoja de cálculo).
3. Elige **Crear una hoja de cálculo nueva**.
4. Nombre sugerido de la hoja: **`Hub Migración — Kit OIM (respuestas)`**.

A partir de aquí, cada envío desde el sitio aparecerá como una fila nueva.

---

## Paso 4 — Obtener la URL de envío y los `entry.XXXXX`

### A) URL de envío (`formResponse`)

1. En el Form, clic en **Enviar** (arriba a la derecha).
2. Icono **Enlace** → copia la URL. Se ve así:

   `https://docs.google.com/forms/d/e/1FAIpQLSd.../viewform`

3. Sustituye **`viewform`** por **`formResponse`**:

   `https://docs.google.com/forms/d/e/1FAIpQLSd.../formResponse`

   Esa es la URL que va en `config-kit.js` → `action`.

### B) IDs de cada campo (`entry.XXXXX`)

1. En el Form, menú ⋮ → **Obtener enlace previo** (Get pre-filled link).
2. Rellena un valor de prueba en **cada** pregunta (ej. «Prueba», «test@test.com», primera opción del desplegable, etc.).
3. Clic en **Obtener enlace**.
4. La URL generada contendrá fragmentos como:

   `entry.1234567890=Prueba&entry.0987654321=test%40test.com&...`

5. Anota qué `entry.XXXXX` corresponde a cada pregunta:

| Campo en `config-kit.js` | Pregunta del Form |
|--------------------------|-------------------|
| `nombre` | Nombre completo |
| `email` | Correo electrónico |
| `motivo` | Motivo de uso |
| `fecha` | Fecha (automática) |
| `origen` | Origen |
| `id` | ID de registro |
| `motivoCodigo` | Código motivo |

---

## Paso 5 — Pegar en `config-kit.js`

Abre el archivo **`config-kit.js`** en la raíz del repositorio y completa:

```javascript
window.HUB_KIT_FORM = {
  action: "https://docs.google.com/forms/d/e/TU_FORM_ID/formResponse",
  entries: {
    nombre: "entry.XXXXXXXX",
    email: "entry.XXXXXXXX",
    motivo: "entry.XXXXXXXX",
    fecha: "entry.XXXXXXXX",
    origen: "entry.XXXXXXXX",
    id: "entry.XXXXXXXX",
    motivoCodigo: "entry.XXXXXXXX"
  }
};
```

Deja `window.HUB_KIT_API = ""` vacío si solo usas Google Form.

Sube el cambio a GitHub (`main`). En 1–2 minutos GitHub Pages tendrá la conexión activa.

---

## Paso 6 — Probar

1. Abre [kit-divulgacion](https://arbarradas.github.io/HubMigracion/kit-divulgacion.html) en el sitio publicado.
2. Completa nombre, correo y motivo → **Acceder a los recursos OIM**.
3. Abre la hoja de respuestas en Google Sheets: debe aparecer una fila nueva.
4. Los enlaces OIM (glosario, Portal de Datos, Informe 2024) deben mostrarse tras enviar.

### Si no llegan filas a la hoja

| Revisar | Acción |
|---------|--------|
| URL `formResponse` | Debe terminar en `/formResponse`, no `/viewform` |
| `entry.XXXXX` | Deben ser los del enlace previo, en el orden correcto |
| Opciones del desplegable | Deben coincidir **exactamente** con las 9 del paso 2 |
| `config-kit.js` en GitHub | Confirma que el commit está en `main` y Pages actualizado |

---

## Privacidad

- El Form y la Sheet quedan en **tu** cuenta Google.
- No compartas la hoja públicamente (solo lectura para tu equipo si hace falta).
- El aviso en el kit del sitio indica que los datos se usan para estadísticas de uso.

---

## Opción alternativa (Apps Script)

Si prefieres API con confirmación JSON en lugar de Google Form, usa **`apps-script/SETUP-KIT.md`** y `window.HUB_KIT_API`. El sitio usa **primero** Google Form si está configurado; si no, Apps Script; si ninguno, solo guardado local en el navegador.

---

## Resumen

1. Crear Form con 7 preguntas + marca de tiempo automática.  
2. Vincular respuestas → nueva hoja en Sheets.  
3. Copiar URL `formResponse` y los `entry.XXXXX` del enlace previo.  
4. Pegar en `config-kit.js` y subir a GitHub.  
5. Probar desde el kit publicado.

Cuando tengas la URL y los `entry.XXXXX`, puedes pegarlos en `config-kit.js` tú mismo o compartirlos para dejarlos configurados en el repositorio.
