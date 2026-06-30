# Guía: registros del kit OIM con Google Sheets (Apps Script)

> **Recomendado para la cuenta `barradas.andres@gmail.com`:** usa primero la guía más simple  
> **`SETUP-GOOGLE-FORM.md`** (Google Form + Sheet, sin código).  
> Esta guía es la **opción B** si prefieres Apps Script con respuesta JSON.

Conecta el formulario de acceso del **Kit de divulgación** (glosario, Portal de Datos OIM, Informe Mundial 2024) con una hoja de Google para medir quién usa los materiales y con qué fin.

**Tiempo estimado:** 10–15 minutos · **Costo:** gratis.

---

## Qué vas a obtener

| Sin hoja | Con hoja |
|----------|----------|
| Los datos solo quedan en el navegador del visitante | Cada registro llega a tu Google Sheet (nombre, correo, motivo, fecha) |
| No hay reporte central | Puedes filtrar por motivo (clases, investigación, medios…) y exportar CSV |

El visitante sigue pudiendo usar el kit en su navegador aunque no configures la hoja; solo no tendrás el registro centralizado.

---

## Pasos

### 1. Hoja de cálculo

1. [Google Sheets](https://sheets.google.com) → **Archivo → Nuevo**.
2. Nombre sugerido: `Hub Migración — Kit OIM`.

Puedes usar la **misma hoja** que el mapa de visitantes u otra nueva; el script crea la pestaña `KitAcceso` automáticamente.

### 2. Apps Script

1. **Extensiones → Apps Script**.
2. Borra el contenido de `Código.gs`.
3. Pega todo el archivo `apps-script/KitAcceso.gs` del repositorio.
4. Guarda el proyecto (nombre sugerido: `Hub Kit API`).

### 3. Implementar como aplicación web

1. **Implementar → Nueva implementación → Aplicación web**.
2. **Ejecutar como:** Yo · **Quién tiene acceso:** Cualquier persona.
3. Copia la URL que termina en `/exec`.

Si editas el script después: **Implementar → Administrar implementaciones → Nueva versión**.

### 4. Conectar el sitio

En `config-kit.js` de la raíz del sitio:

```javascript
window.HUB_KIT_API = "https://script.google.com/macros/s/TU_ID_AQUI/exec";
```

Sube el cambio a GitHub (`main`) y espera 1–2 minutos a que GitHub Pages actualice.

### 5. Probar

1. Abre `kit-divulgacion.html` en el sitio publicado.
2. Completa el formulario y envía.
3. Revisa la pestaña **KitAcceso** en tu hoja: debe aparecer una fila nueva.

Pega la URL `/exec` en el navegador: debe responder JSON con `servicio: "Hub Kit Acceso OIM"`.

---

## Privacidad

- Indica en clase o en el sitio que el correo se usa para estadísticas de uso del kit.
- La hoja queda en tu cuenta de Google; no la compartas públicamente.
- Cumple con la política de datos del Tec si aplica.

---

## Resumen

1. Crear o reutilizar hoja · 2. Pegar `KitAcceso.gs` · 3. Implementar web app · 4. URL en `config-kit.js` · 5. Probar formulario.
