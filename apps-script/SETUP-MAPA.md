# Backend del mapa de visitantes (Google Sheets)

El sitio puede guardar y leer respuestas del mapa en una **Google Sheet** mediante un Web App gratuito (Google Apps Script).

## Pasos

1. Crea una hoja de cálculo en [Google Sheets](https://sheets.google.com).
2. Menú **Extensiones → Apps Script**.
3. Pega el contenido de `MapaVisitantes.gs` y guarda el proyecto.
4. **Implementar → Nueva implementación** → tipo **Aplicación web**.
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
5. Copia la URL que termina en `/exec`.
6. En el repositorio del sitio, abre `config-mapa.js` y asigna:

```javascript
window.HUB_MAPA_API = "https://script.google.com/macros/s/TU_ID/exec";
```

7. Sube el cambio a GitHub. En unos minutos el mapa cargará respuestas de todos los visitantes y enviará las nuevas a la hoja.

## Sin configurar la API

Si `HUB_MAPA_API` está vacío, el mapa sigue funcionando con `datos-visitantes.json` y las respuestas guardadas en el navegador (`localStorage`).

## Columnas en la hoja

`fecha`, `origen`, `residencia`, `escribe`, `historia`, coordenadas y `id`. La primera fila se crea automáticamente.
