# Guía: mapa compartido con Google Sheets

Esta guía conecta el formulario **«¿De dónde nos visitas?»** del sitio del Hub con una hoja de Google. Así, las respuestas del taller quedan visibles para **todas las personas** que abran el mapa, no solo en un navegador.

**Tiempo estimado:** 15–20 minutos (una sola vez).  
**Costo:** gratis (cuenta Google personal o institucional).

---

## Qué vas a obtener

| Antes (sin hoja) | Después (con hoja) |
|------------------|-------------------|
| Cada visitante solo ve sus propias respuestas en su navegador | Todas las respuestas del taller aparecen en el mapa para todos |
| Los datos viven en `localStorage` del dispositivo | Los datos viven en tu Google Sheet (tú los puedes revisar y exportar) |

El sitio sigue mostrando los ejemplos de `datos-visitantes.json` y, además, lo que llegue a la hoja.

---

## Paso 1 — Crear la hoja de cálculo

1. Entra a [Google Sheets](https://sheets.google.com) con tu cuenta.
2. **Archivo → Nuevo → Hoja de cálculo en blanco**.
3. Ponle un nombre claro, por ejemplo: `Hub Migración — Mapa visitantes`.
4. No hace falta escribir columnas a mano: el script las crea al recibir la primera respuesta.

---

## Paso 2 — Abrir Apps Script

1. En esa hoja, menú **Extensiones → Apps Script**.
2. Se abre un editor con un archivo `Código.gs` (puede tener una función de ejemplo).
3. **Borra** todo lo que haya en ese archivo.

---

## Paso 3 — Pegar el código del Hub

1. En tu computadora, abre el archivo del repositorio:  
   `apps-script/MapaVisitantes.gs`
2. **Selecciona todo** el contenido y cópialo.
3. Pégalo en el editor de Apps Script (sustituyendo lo anterior).
4. **Guardar** (icono de disco o `Ctrl+S`).
5. Opcional: renombra el proyecto arriba a la izquierda, por ejemplo `Hub Mapa API`.

El código define:

- **GET** — el sitio lee todas las filas y las muestra en el mapa.
- **POST** — cuando alguien envía el formulario, se agrega una fila nueva.

---

## Paso 4 — Desplegar como «Aplicación web»

1. En Apps Script, botón **Implementar** (arriba a la derecha) → **Nueva implementación**.
2. Junto a «Seleccionar tipo», clic en el engrane → elige **Aplicación web**.
3. Configura exactamente así:

   | Campo | Valor |
   |-------|--------|
   | Descripción | `Mapa visitantes Hub` (o la que quieras) |
   | **Ejecutar como** | **Yo** (tu cuenta) |
   | **Quién tiene acceso** | **Cualquier persona** |

   > «Cualquier persona» es necesario para que el sitio público en GitHub Pages pueda leer y escribir sin iniciar sesión en Google.

4. Clic en **Implementar**.
5. La primera vez Google pedirá **autorizar** el proyecto:
   - **Revisar permisos** → elegir tu cuenta.
   - Si aparece «Google no verificó esta app»: **Configuración avanzada** → **Ir a … (no seguro)** (es tu propio script).
   - Aceptar permisos de la hoja de cálculo.

6. Al terminar, copia la **URL de la aplicación web**. Debe verse así:

   `https://script.google.com/macros/s/AKfycb.............../exec`

   Guárdala en un bloc de notas; la usarás en el paso 5.

### Si cambias el código después

Cada vez que edites `MapaVisitantes.gs`, vuelve a **Implementar → Administrar implementaciones → editar (lápiz) → Nueva versión → Implementar**. Si no, el sitio seguirá usando la versión antigua.

---

## Paso 5 — Conectar el sitio (`config-mapa.js`)

1. En el repositorio del sitio, abre el archivo **`config-mapa.js`** (en la raíz del proyecto).
2. Sustituye la línea vacía por tu URL (entre comillas):

```javascript
window.HUB_MAPA_API = "https://script.google.com/macros/s/TU_ID_AQUI/exec";
```

3. Guarda el archivo.
4. Sube el cambio a GitHub (`main`), como en los commits anteriores del proyecto.
5. Espera 1–2 minutos a que GitHub Pages actualice el sitio.

---

## Paso 6 — Probar que funciona

### Prueba A — La hoja recibe datos (POST)

1. Abre el sitio publicado (la URL de GitHub Pages del Hub).
2. Ve a la sección **«¿De dónde nos visitas?»**.
3. Llena las tres ubicaciones (ciudad y país en cada una).
4. Opcional: escribe una frase corta en «Tu voz en una frase».
5. Clic en **Compartir en el mapa**.
6. Abre tu Google Sheet: debe aparecer una **nueva fila** con origen, residencia, escribe, coordenadas, etc.

### Prueba B — Otro dispositivo ve el mapa (GET)

1. Abre el mismo sitio en **otro navegador** o en el celular (modo incógnito).
2. Baja al mapa: deberías ver los puntos de la respuesta que enviaste en la Prueba A.
3. Debajo del mapa puede aparecer un texto como: *«Conectado al registro compartido: N respuestas…»*.

### Prueba C — Voces e historias

1. Si enviaste una frase, haz **clic en un marcador** del mapa: debe mostrarse la cita.
2. En el panel **«Voces en el mapa»**, haz clic en una frase: el mapa debe acercarse a esa ubicación.

---

## Solución de problemas

| Síntoma | Qué revisar |
|---------|-------------|
| No aparece fila en la hoja | URL correcta en `config-mapa.js`; implementación con acceso **Cualquier persona**; consola del navegador (`F12` → Red) al enviar el formulario |
| La hoja tiene filas pero el mapa no las muestra | Misma URL en `config-mapa.js`; GitHub Pages ya actualizado; recarga forzada (`Ctrl+F5`) |
| Mensaje «No se pudo guardar en la hoja compartida» | Permisos de autorización; nueva versión de la implementación tras cambiar el script |
| Solo veo ejemplos viejos | Normal: `datos-visitantes.json` sigue ahí; las filas nuevas son las de la hoja |
| «Google no verificó esta app» al autorizar | Es esperado en scripts propios; usa **Configuración avanzada** → continuar |

### Probar la API directamente en el navegador

Pega tu URL `/exec` en la barra de direcciones. Deberías ver un JSON (lista `[]` vacía o con objetos). Si ves error de permisos, revisa el paso 4.

---

## Durante el taller

- Comparte el enlace del sitio **después** de subir `config-mapa.js` a GitHub.
- Tú puedes tener la hoja abierta en una pestaña para ver llegar respuestas en vivo.
- Puedes exportar la hoja: **Archivo → Descargar → CSV** para análisis posterior.
- Si no configuras la hoja, el taller igual funciona: cada quien verá sus respuestas en su navegador y los ejemplos del JSON.

---

## Privacidad (recomendación)

- Las respuestas son **voluntarias** y visibles en el mapa público.
- Evita pedir datos sensibles (CURP, teléfono, dirección exacta).
- La hoja queda en **tu** cuenta de Google; solo quien tenga acceso a la hoja verá el listado completo en tabla.

---

## Resumen en 6 pasos

1. Crear hoja en Google Sheets.  
2. Extensiones → Apps Script.  
3. Pegar `MapaVisitantes.gs` y guardar.  
4. Implementar → Aplicación web → **Cualquier persona** → copiar URL `/exec`.  
5. Pegar URL en `config-mapa.js` y subir a GitHub.  
6. Probar formulario + mapa en otro dispositivo.

Cuando tengas la URL del paso 4, puedes compartirla con quien mantenga el repositorio para que la dejen en `config-mapa.js` por ti.
