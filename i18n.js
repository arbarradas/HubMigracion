/* Internacionalización ES / EN — Hub de Migración e Impacto Social */
(function () {
  "use strict";

  const CLAVE_IDIOMA = "hub-idioma";
  let idiomaActual = localStorage.getItem(CLAVE_IDIOMA) || "es";

  const traducciones = {
    es: {
      "meta.title": "Hub de Migración e Impacto Social — Tec de Monterrey, campus Puebla",
      "skip": "Saltar al contenido principal",
      "nav.brand": "Hub de Migración e Impacto Social",
      "nav.tour": "Iniciar recorrido",
      "nav.hub": "El Hub",
      "nav.creacion": "Creación de contenidos",
      "nav.ciudadania": "Ciudadanía global",
      "nav.investigacion": "Investigación",
      "nav.storytelling": "Storytelling",
      "nav.participar": "Participar",
      "nav.ubicacion": "Tu ubicación",
      "nav.faq": "FAQ",
      "nav.contacto": "Contacto",
      "nav.lang.es": "Español",
      "nav.lang.en": "English",
      "nav.palette.earth": "Paleta tierra",
      "nav.palette.ocean": "Paleta océano",
      "nav.palette.institutional": "Paleta institucional",
      "progress.label": "Progreso del recorrido por el Hub",
      "progress.chapter": "Capítulo: {name}",
      "hub.title": "HUB DE MIGRACIÓN E IMPACTO SOCIAL",
      "hub.subtitle": "¿Qué es el Hub de Migración e Impacto Social?",
      "hub.source": "Fuente: Portal de noticias Mediatik",
      "hub.arranque": "Arranque",
      "hub.p1":
        "Desde su inauguración en febrero de 2025, se han fortalecido colaboraciones con socios formadores como la Organización internacional para las Migraciones (OIM) y Samuel Kishi, director de cine y embajador de buena voluntad de dicha Organización.",
      "hub.p2.title": "Áreas Estratégicas del Hub de Migración e Impacto Social",
      "hub.p2.body":
        "Se plantean 4 pilares alrededor de los cuales tiene acción esta iniciativa académica:",
      "hub.pilares": "* Comunicación * Ética * Investigación docente * Sentido Humano",
      "hub.puente":
        "Este sitio recorre una historia en capítulos: voces, contexto global, investigación en Puebla, proyectos con impacto y, al final, una invitación a sumarte.",
      "creacion.label": "Creación de contenidos",
      "creacion.title": "Primero, escuchemos: ¿qué hay de la divulgación?",
      "creacion.puente":
        "La migración no se entiende solo con cifras. Sociedad Migrante acerca testimonios, debates y miradas desde distintos países para situar el fenómeno con rostro y voz humana.",
      "creacion.p1":
        "Es muy importante dar a conocer avances y proyectos académicos, así como escuchar las voces que nos representan como ciudadanía a nivel mundial.",
      "creacion.p2":
        "Sociedad Migrante aborda la migración desde una perspectiva humana y global, con la participación de estudiantes e invitadxs especiales. La primera temporada incluye entrevistas a eurodiputadxs desde el Parlamento Europeo en Bruselas, Bélgica.",
      "creacion.spotify": "Escuchar «Sociedad Migrante» en Spotify",
      "creacion.episode": "Episodio 1 — Javier Moreno Sánchez (Parlamento Europeo)",
      "ciudadania.label": "Ciudadanía global",
      "ciudadania.title": "¿Qué está pasando en el mundo?",
      "ciudadania.puente":
        "Con esas voces en mente, estas cifras ayudan a dimensionar la magnitud de la migración mexicana en el exterior.",
      "ciudadania.fuente":
        "Estimaciones del Instituto de los Mexicanos en el Exterior (SRE). El corredor México–Estados Unidos es considerado el más numeroso del mundo, de acuerdo con datos de la OIM y la ONU (UN DESA, 2024).",
      "ciudadania.usa": "Estados Unidos",
      "ciudadania.europe": "Europa",
      "ciudadania.asia": "Asia",
      "ciudadania.oim.title": "Migración internacional — Portal de Datos OIM",
      "ciudadania.oim.puente":
        "Ampliamos la mirada: la migración es un fenómeno planetario. Este mapa permite comparar flujos y stocks a escala global.",
      "ciudadania.oim.body":
        "Mapa interactivo del Portal de Datos sobre Migración (GMDAC / OIM), con indicadores de stocks migratorios internacionales comparables a nivel global y regional.",
      "ciudadania.oim.source":
        'Fuente: <a href="https://www.migrationdataportal.org/es" target="_blank" rel="noopener noreferrer">Portal de Datos sobre Migración (OIM)</a> · <a href="https://worldmigrationreport.iom.int/what-we-do/world-migration-report-2024/chapter-2/international-migrants-numbers-and-trends" target="_blank" rel="noopener noreferrer">Informe sobre las Migraciones en el Mundo 2024</a>.',
      "ciudadania.int.title": "Presencia internacional",
      "ciudadania.int.type": "Conferencias · Suiza · Turquía",
      "ciudadania.int.p1":
        'El Hub y su equipo académico han participado en espacios internacionales vinculados con la <a href="https://www.iom.int/" target="_blank" rel="noopener noreferrer">Organización Internacional para las Migraciones (OIM)</a> y la <a href="https://www.mediamigrationacademy.org/about" target="_blank" rel="noopener noreferrer">Global Migration Media Academy (GMMA)</a>, iniciativa de la OIM para una cobertura mediática ética y humana sobre migración.',
      "ciudadania.int.p2":
        "Desde 2023, el campus Puebla colabora con la OIM México en talleres, cursos y formación dentro del marco GMMA — vínculo que culminó en la inauguración del Hub en febrero de 2025, con la participación del embajador de buena voluntad de la OIM en México, Samuel Kishi.",
      "investigacion.label": "Investigación",
      "investigacion.title": "¿Qué estamos haciendo al respecto?",
      "investigacion.puente":
        "Desde el campus Puebla, el Hub convierte la pregunta global en evidencia local: encuestas, grafos y cartografías que describen la movilidad estudiantil.",
      "investigacion.study": "Migración: movilidad estudiantil en el Tec de Monterrey campus Puebla",
      "investigacion.study.p1": "Una aproximación a la movilidad estudiantil en el Tec de Monterrey.",
      "investigacion.study.p2":
        "Recientemente se realizó una investigación coordinada por el Dr. Barradas-Gurruchaga en la que participaron la Mtra. Villa Maciel y la Dra. Castaño Echeverri. Se generaron datos que permiten acercarse al fenómeno de la migración estudiantil, a través de encuestas aplicadas a una muestra del estudiantado.",
      "investigacion.graph.label": "Grafo interactivo de factores",
      "investigacion.graph.note": "Explora nodos y relaciones · Graph Commons",
      "investigacion.graph.source": "Fuente: Elaboración propia.",
      "investigacion.graph.body":
        "En esta visualización se aprecian algunos de los factores más relevantes que impulsan la movilización de personas jóvenes (estudiantes) en su llegada a la ciudad de Puebla.",
      "investigacion.carto.label": "Movilidad estudiantil",
      "investigacion.carto.title": "Cartografía de la movilidad estudiantil",
      "investigacion.carto.puente":
        "Los mismos datos cobran forma en un dendograma: estados, ciudades de origen y motivos de llegada a Puebla, listos para explorar.",
      "investigacion.carto.body":
        "Esta visualización muestra un dendograma lineal con los estados de procedencia de las y los estudiantes foráneos que respondieron a la encuesta, sus ciudades de origen y las razones de su movilización con destino a la ciudad de Puebla. Con estos datos se cuenta con información valiosa para la institución y para la ciudad.",
      "investigacion.carto.help":
        "Pasa el cursor o toca un nodo para resaltar sus conexiones. Haz clic para fijar la selección.",
      "investigacion.carto.filter": "Ver columna",
      "investigacion.carto.all": "Todo",
      "investigacion.carto.states": "Estados",
      "investigacion.carto.cities": "Ciudades",
      "investigacion.carto.motives": "Motivos",
      "investigacion.carto.search": "Buscar en la cartografía",
      "investigacion.carto.search.ph": "Estado, ciudad o motivo…",
      "investigacion.carto.clear": "Limpiar selección",
      "investigacion.carto.detail":
        "Selecciona un nodo en la visualización para ver su nombre, columna (estado, ciudad o motivo) y conexiones relacionadas.",
      "investigacion.factores.title": "Factores asociados a permanecer en Puebla",
      "investigacion.factores.sub": "Pasa el cursor o toca una barra para ver el detalle.",
      "investigacion.factores.hint": "Selecciona un factor para explorar los resultados de la encuesta.",
      "investigacion.factores.toggle": "Ver imagen original del estudio",
      "investigacion.factores.toggle.hide": "Ocultar imagen original del estudio",
      "investigacion.factores.desc":
        "Agrupación temática derivada de respuestas abiertas de estudiantes que indicaron que permanecerían en Puebla, presentada a nivel nacional.",
      "storytelling.label": "Storytelling",
      "storytelling.title": "Proyectos del Hub",
      "storytelling.puente":
        "La investigación y la divulgación se materializan en obras y análisis. Estos proyectos muestran cómo el Hub transforma datos y voces en narrativas con impacto social.",
      "storytelling.capaz.name": "Capaz",
      "storytelling.capaz.type": "Muestra museográfica",
      "storytelling.capaz.body":
        'Pieza integrada a una exposición museográfica presentada en el <strong>Centro Cultural San Roque</strong>, en la ciudad de Puebla. Elaborada con estudiantes de Comunicación, en diálogo con la obra de <a href="https://jorgecarlos.com/" target="_blank" rel="noopener noreferrer">Jorge Carlos Álvarez</a>.',
      "storytelling.cuando.name": "Cuando vuelvas",
      "storytelling.cuando.type": "Cine · Docs Puebla 2025",
      "storytelling.cuando.body":
        'Cortometraje exhibido en México y el extranjero; selección oficial Fragmentos Universitarios en <a href="https://docsmx.org" target="_blank" rel="noopener noreferrer">Docs Puebla</a>.',
      "participacion.label": "Tu lugar en la historia",
      "participacion.title": "¿Cómo puedes participar?",
      "participacion.puente":
        "Has recorrido voces, datos, investigación y proyectos con impacto. Ahora puedes formar parte de esta red: proponer una idea, difundir o colaborar desde tu disciplina.",
      "participacion.p1":
        "Los proyectos del Hub — desde piezas visuales y cortometrajes hasta estudios de datos y conferencias internacionales — nacieron de colaboraciones abiertas. El siguiente puede llevar tu firma.",
      "participacion.lema": "Todos somos migrantes.",
      "participacion.p2":
        "¡Súmate a los esfuerzos del Hub de Migración e Impacto Social! Desde el Hub se trabaja en pro del ODS 10 — Reducción de la desigualdad — con proyectos académicos de inmersión e impacto social.",
      "participacion.p3":
        "Contáctanos. Escribe con una propuesta de proyecto académico que impacte en nuestra sociedad y, en particular, en el subgrupo de personas en movimiento. ¡Te esperamos!",
      "participacion.contact": "Ir a contacto",
      "participacion.projects": "Ver proyectos del Hub",
      "encuesta.label": "Tu voz en el mapa",
      "encuesta.title": "¿De dónde nos visitas?",
      "encuesta.puente":
        "La migración también se cuenta desde dónde estás. Tus tres respuestas se reflejan en el mapa; si quieres, añade una frase breve que otros podrán leer al hacer clic en tu ubicación.",
      "encuesta.origin": "¿Cuál es tu lugar de origen?",
      "encuesta.origin.ph": "Ej. Xalapa, Veracruz, México",
      "encuesta.residence": "¿En dónde resides actualmente?",
      "encuesta.residence.ph": "Ej. Puebla, México",
      "encuesta.write": "¿De dónde nos escribes?",
      "encuesta.write.ph": "Ej. Bruselas, Bélgica",
      "encuesta.story": "Tu voz en una frase (opcional)",
      "encuesta.story.ph":
        "Ej. Estudio en Puebla pero escribo desde Europa por un intercambio temporal.",
      "encuesta.story.help": "Aparece en el mapa al hacer clic en tu ubicación (máx. 120 caracteres).",
      "encuesta.submit": "Compartir en el mapa",
      "encuesta.visits": "Visitas al sitio",
      "encuesta.empty": "Aún no hay respuestas en este navegador. Sé la primera persona en dejar tu huella.",
      "encuesta.map.title": "Mapa de voces y ubicaciones",
      "encuesta.map.origin": "Origen",
      "encuesta.map.residence": "Residencia actual",
      "encuesta.map.write": "Desde donde nos escribes",
      "encuesta.map.voice": "Voz con historia",
      "encuesta.map.filter": "Mostrar solo voces con historia",
      "encuesta.map.loading": "Cargando ubicaciones compartidas…",
      "encuesta.voices.title": "Voces en el mapa",
      "encuesta.voices.intro":
        "Haz clic en una frase para centrar el mapa en esa ubicación y leer la historia completa.",
      "faq.label": "Ayuda",
      "faq.title": "Preguntas frecuentes (FAQ)",
      "faq.puente": "Respuestas breves a las dudas más comunes sobre el Hub, sus datos y cómo participar.",
      "faq.index": "En esta sección",
      "faq.q1": "¿Qué es el Hub de Migración e Impacto Social?",
      "faq.q2": "¿Cómo puedo participar en el Hub?",
      "faq.q3": "¿De dónde provienen los datos del sitio?",
      "faq.a1":
        "Es una iniciativa académica del Tecnológico de Monterrey, campus Puebla, inaugurada en febrero de 2025 para estudiar la migración con enfoque humano, ético y de impacto social. Articula investigación, divulgación (como el podcast Sociedad Migrante), visualización de datos y proyectos con la OIM y la GMMA.",
      "faq.a1.link": "Ir al inicio del Hub",
      "faq.a2":
        "Puedes proponer un proyecto académico, colaborar en investigación sobre movilidad estudiantil, difundir los contenidos del sitio o sumar tu voz en el mapa de ubicaciones. Escríbenos desde la sección de contacto.",
      "faq.a2.link1": "Ir a «¿Cómo puedes participar?»",
      "faq.a2.link2": "Contactar al Hub",
      "faq.a3":
        "Las cifras globales provienen del Instituto de los Mexicanos en el Exterior (SRE) y del Portal de Datos sobre Migración de la OIM. La investigación sobre movilidad estudiantil en Puebla es elaboración propia del equipo del Hub (encuestas, Graph Commons y cartografía). El mapa de visitantes puede usar una hoja de Google (ver apps-script/SETUP-MAPA.md), el archivo datos-visitantes.json y las respuestas de tu navegador; las frases opcionales («voces») se leen al hacer clic en el mapa.",
      "faq.a3.link1": "Ver ciudadanía global",
      "faq.a3.link2": "Ver investigación",
      "footer.credits": "Créditos del Hub",
      "footer.credits.body":
        "Hub de Migración e Impacto Social — Tecnológico de Monterrey, campus Puebla y Región Centro-Occidente.",
      "footer.credits.role": "Creador del sitio web y coordinador del Hub.",
      "footer.contact": "Contactar",
      "footer.contact.body": "¿Deseas colaborar, integrar un proyecto o conocer más sobre el Hub?",
      "footer.contact.write": "Escríbenos por correo.",
      "footer.contact.btn": "Enviar correo electrónico",
      "footer.sitemap": "En esta página",
      "footer.legal": "© Hub de Migración e Impacto Social — Tec de Monterrey, campus Puebla.",
      "back.top": "Volver arriba",
      "cap.hub": "El Hub",
      "cap.creacion": "Creación de contenidos",
      "cap.ciudadania": "Ciudadanía global",
      "cap.investigacion": "Investigación",
      "cap.storytelling": "Storytelling",
      "cap.participar": "Participar",
      "cap.ubicacion": "Tu ubicación",
      "cap.faq": "FAQ",
      "cap.contacto": "Contacto",
      "factor.gusto": "Gusto por la ciudad",
      "factor.gusto.d": "Afinidad con Puebla como lugar de vida, más allá de lo académico.",
      "factor.academica": "Calidad académica",
      "factor.academica.d": "Percepción de una oferta educativa sólida en el campus.",
      "factor.oportunidades": "Oportunidades universitarias",
      "factor.oportunidades.d": "Acceso a programas, redes y experiencias dentro de la institución.",
      "factor.familia": "Familia y amistades",
      "factor.familia.d": "Redes de apoyo cercanas que influyen en la decisión de quedarse.",
      "factor.carrera": "Carrera disponible",
      "factor.carrera.d": "Oferta de la carrera o trayectoria que buscaban al llegar.",
      "factor.laboral": "Oportunidades laborales",
      "factor.laboral.d": "Perspectivas de empleo o prácticas en la región.",
      "factor.economia": "Economía y comodidad",
      "factor.economia.d": "Costo de vida y condiciones materiales para permanecer.",
      "factor.otros": "Otros",
      "factor.otros.d": "Motivos adicionales mencionados en respuestas abiertas.",
      "factor.menciones": "{n} menciones temáticas.",
      "tour.step": "Paso {current} de {total}",
      "tour.prev": "Anterior",
      "tour.next": "Siguiente",
      "tour.finish": "Finalizar recorrido",
      "tour.exit": "Salir del recorrido",
      "tour.summary.title": "Resumen de tu recorrido",
      "tour.summary.body": "Completaste la ruta por el Hub. Estos son los capítulos que visitaste:",
      "tour.summary.map": "Ya compartiste tus tres ubicaciones en este navegador. Puedes revisarlas en el mapa.",
      "tour.summary.map.empty": "Al terminar, puedes dejar tu huella en el mapa de voces y ubicaciones.",
      "tour.summary.viewmap": "Ver mapa de voces",
      "tour.summary.close": "Cerrar",
      "tour.hub.title": "El Hub de Migración",
      "tour.hub.text": "Este es el punto de partida: qué es el Hub, quiénes lo impulsan y cómo se articula con la OIM y el campus Puebla.",
      "tour.creacion.title": "Creación de contenidos",
      "tour.creacion.text": "Escucha el episodio con Javier Moreno Sánchez desde el Parlamento Europeo. La migración se narra antes de medirla con cifras.",
      "tour.ciudadania.title": "Ciudadanía global",
      "tour.ciudadania.text": "Cifras del IME/SRE, mapa de la OIM y presencia internacional del Hub con la GMMA.",
      "tour.investigacion.title": "Investigación en Puebla",
      "tour.investigacion.text": "Estudio sobre movilidad estudiantil, grafo interactivo, cartografía y factores para permanecer en Puebla.",
      "tour.storytelling.title": "Storytelling",
      "tour.storytelling.text": "Capaz y «Cuando vuelvas»: proyectos que transforman datos y voces en narrativas con impacto social.",
      "tour.participacion.title": "Tu participación",
      "tour.participacion.text": "El recorrido cierra con una invitación: puedes proponer proyectos y sumarte al Hub.",
      "tour.encuesta.title": "Voces y ubicaciones",
      "tour.encuesta.text": "Responde tres preguntas: tu lugar de origen, dónde resides actualmente y desde dónde nos escribes. Las tres ubicaciones se reflejan en el mapa.",
      "encuesta.responses": "{n} respuesta(s) en este navegador (también en el mapa):",
      "encuesta.residence.in": "reside en",
      "encuesta.write.from": "escribe desde"
    },
    en: {
      "meta.title": "Migration and Social Impact Hub — Tec de Monterrey, Puebla campus",
      "skip": "Skip to main content",
      "nav.brand": "Migration & Social Impact Hub",
      "nav.tour": "Start tour",
      "nav.hub": "The Hub",
      "nav.creacion": "Content creation",
      "nav.ciudadania": "Global citizenship",
      "nav.investigacion": "Research",
      "nav.storytelling": "Storytelling",
      "nav.participar": "Get involved",
      "nav.ubicacion": "Your location",
      "nav.faq": "FAQ",
      "nav.contacto": "Contact",
      "nav.lang.es": "Spanish",
      "nav.lang.en": "English",
      "nav.palette.earth": "Earth palette",
      "nav.palette.ocean": "Ocean palette",
      "nav.palette.institutional": "Institutional palette",
      "progress.label": "Hub tour progress",
      "progress.chapter": "Chapter: {name}",
      "hub.title": "MIGRATION AND SOCIAL IMPACT HUB",
      "hub.subtitle": "What is the Migration and Social Impact Hub?",
      "hub.source": "Source: Mediatik news portal",
      "hub.arranque": "Launch",
      "hub.p1":
        "Since its inauguration in February 2025, collaborations have been strengthened with formative partners such as the International Organization for Migration (IOM) and Samuel Kishi, film director and Goodwill Ambassador of the Organization.",
      "hub.p2.title": "Strategic Areas of the Migration and Social Impact Hub",
      "hub.p2.body": "This academic initiative is organized around four pillars:",
      "hub.pilares": "* Communication * Ethics * Faculty research * Human sense",
      "hub.puente":
        "This site follows a story in chapters: voices, global context, research in Puebla, impactful projects, and finally an invitation to join.",
      "creacion.label": "Content creation",
      "creacion.title": "First, let's listen: what about outreach?",
      "creacion.puente":
        "Migration cannot be understood through numbers alone. Sociedad Migrante brings testimonies, debates, and perspectives from different countries to place the phenomenon with a human face and voice.",
      "creacion.p1":
        "It is essential to share academic advances and projects, and to listen to the voices that represent us as global citizens.",
      "creacion.p2":
        "Sociedad Migrante addresses migration from a human and global perspective, with the participation of students and special guests. The first season includes interviews with members of the European Parliament in Brussels, Belgium.",
      "creacion.spotify": "Listen to «Sociedad Migrante» on Spotify",
      "creacion.episode": "Episode 1 — Javier Moreno Sánchez (European Parliament)",
      "ciudadania.label": "Global citizenship",
      "ciudadania.title": "What is happening in the world?",
      "ciudadania.puente":
        "With those voices in mind, these figures help dimension the scale of Mexican migration abroad.",
      "ciudadania.fuente":
        "Estimates from the Institute for Mexicans Abroad (SRE). The Mexico–United States corridor is considered the largest in the world, according to IOM and UN data (UN DESA, 2024).",
      "ciudadania.usa": "United States",
      "ciudadania.europe": "Europe",
      "ciudadania.asia": "Asia",
      "ciudadania.oim.title": "International migration — IOM Data Portal",
      "ciudadania.oim.puente":
        "We broaden the view: migration is a planetary phenomenon. This map allows comparing flows and stocks at a global scale.",
      "ciudadania.oim.body":
        "Interactive map from the Migration Data Portal (GMDAC / IOM), with comparable international migrant stock indicators at global and regional levels.",
      "ciudadania.oim.source":
        'Source: <a href="https://www.migrationdataportal.org/en" target="_blank" rel="noopener noreferrer">Migration Data Portal (IOM)</a> · <a href="https://worldmigrationreport.iom.int/what-we-do/world-migration-report-2024/chapter-2/international-migrants-numbers-and-trends" target="_blank" rel="noopener noreferrer">World Migration Report 2024</a>.',
      "ciudadania.int.title": "International presence",
      "ciudadania.int.type": "Conferences · Switzerland · Turkey",
      "ciudadania.int.p1":
        'The Hub and its academic team have participated in international spaces linked to the <a href="https://www.iom.int/" target="_blank" rel="noopener noreferrer">International Organization for Migration (IOM)</a> and the <a href="https://www.mediamigrationacademy.org/about" target="_blank" rel="noopener noreferrer">Global Migration Media Academy (GMMA)</a>, an IOM initiative for ethical and humane media coverage of migration.',
      "ciudadania.int.p2":
        "Since 2023, the Puebla campus has collaborated with IOM Mexico in workshops, courses, and training within the GMMA framework — a link that culminated in the Hub's inauguration in February 2025, with the participation of IOM Goodwill Ambassador in Mexico, Samuel Kishi.",
      "investigacion.label": "Research",
      "investigacion.title": "What are we doing about it?",
      "investigacion.puente":
        "From the Puebla campus, the Hub turns the global question into local evidence: surveys, graphs, and cartographies that describe student mobility.",
      "investigacion.study": "Migration: student mobility at Tec de Monterrey, Puebla campus",
      "investigacion.study.p1": "An approach to student mobility at Tec de Monterrey.",
      "investigacion.study.p2":
        "A study coordinated by Dr. Barradas-Gurruchaga was recently conducted with participation from Mtra. Villa Maciel and Dr. Castaño Echeverri. Data was generated to approach the phenomenon of student migration through surveys applied to a student sample.",
      "investigacion.graph.label": "Interactive factor graph",
      "investigacion.graph.note": "Explore nodes and relationships · Graph Commons",
      "investigacion.graph.source": "Source: Own elaboration.",
      "investigacion.graph.body":
        "This visualization shows some of the most relevant factors driving the mobility of young people (students) upon arriving in the city of Puebla.",
      "investigacion.carto.label": "Student mobility",
      "investigacion.carto.title": "Cartography of student mobility",
      "investigacion.carto.puente":
        "The same data takes shape in a dendrogram: states, cities of origin, and reasons for arriving in Puebla, ready to explore.",
      "investigacion.carto.body":
        "This visualization shows a linear dendrogram with the states of origin of out-of-state students who responded to the survey, their cities of origin, and the reasons for their mobility to the city of Puebla. This data provides valuable information for the institution and the city.",
      "investigacion.carto.help":
        "Hover or tap a node to highlight its connections. Click to pin the selection.",
      "investigacion.carto.filter": "View column",
      "investigacion.carto.all": "All",
      "investigacion.carto.states": "States",
      "investigacion.carto.cities": "Cities",
      "investigacion.carto.motives": "Reasons",
      "investigacion.carto.search": "Search the cartography",
      "investigacion.carto.search.ph": "State, city, or reason…",
      "investigacion.carto.clear": "Clear selection",
      "investigacion.carto.detail":
        "Select a node in the visualization to see its name, column (state, city, or reason), and related connections.",
      "investigacion.factores.title": "Factors associated with staying in Puebla",
      "investigacion.factores.sub": "Hover or tap a bar to see details.",
      "investigacion.factores.hint": "Select a factor to explore the survey results.",
      "investigacion.factores.toggle": "View original study image",
      "investigacion.factores.toggle.hide": "Hide original study image",
      "investigacion.factores.desc":
        "Thematic grouping derived from open responses from students who indicated they would stay in Puebla, presented at the national level.",
      "storytelling.label": "Storytelling",
      "storytelling.title": "Hub projects",
      "storytelling.puente":
        "Research and outreach materialize in works and analyses. These projects show how the Hub transforms data and voices into narratives with social impact.",
      "storytelling.capaz.name": "Capaz",
      "storytelling.capaz.type": "Museum exhibition",
      "storytelling.capaz.body":
        'Piece integrated into a museum exhibition at the <strong>Centro Cultural San Roque</strong> in the city of Puebla. Created with Communication students, in dialogue with the work of <a href="https://jorgecarlos.com/" target="_blank" rel="noopener noreferrer">Jorge Carlos Álvarez</a>.',
      "storytelling.cuando.name": "When you return",
      "storytelling.cuando.type": "Film · Docs Puebla 2025",
      "storytelling.cuando.body":
        'Short film screened in Mexico and abroad; official selection at Fragmentos Universitarios in <a href="https://docsmx.org" target="_blank" rel="noopener noreferrer">Docs Puebla</a>.',
      "participacion.label": "Your place in the story",
      "participacion.title": "How can you participate?",
      "participacion.puente":
        "You have explored voices, data, research, and impactful projects. Now you can be part of this network: propose an idea, share, or collaborate from your discipline.",
      "participacion.p1":
        "Hub projects — from visual pieces and short films to data studies and international conferences — were born from open collaborations. The next one could bear your signature.",
      "participacion.lema": "We are all migrants.",
      "participacion.p2":
        "Join the efforts of the Migration and Social Impact Hub! The Hub works toward SDG 10 — Reduced inequalities — with academic immersion and social impact projects.",
      "participacion.p3":
        "Contact us. Write with a proposal for an academic project that impacts our society and, in particular, the subgroup of people on the move. We look forward to hearing from you!",
      "participacion.contact": "Go to contact",
      "participacion.projects": "View Hub projects",
      "encuesta.label": "Your voice on the map",
      "encuesta.title": "Where are you visiting us from?",
      "encuesta.puente":
        "Migration is also told from where you are. Your three answers appear on the map; if you wish, add a brief phrase that others can read when clicking on your location.",
      "encuesta.origin": "What is your place of origin?",
      "encuesta.origin.ph": "E.g. Xalapa, Veracruz, Mexico",
      "encuesta.residence": "Where do you currently live?",
      "encuesta.residence.ph": "E.g. Puebla, Mexico",
      "encuesta.write": "Where are you writing from?",
      "encuesta.write.ph": "E.g. Brussels, Belgium",
      "encuesta.story": "Your voice in one phrase (optional)",
      "encuesta.story.ph":
        "E.g. I study in Puebla but write from Europe during a temporary exchange.",
      "encuesta.story.help": "Appears on the map when clicking your location (max. 120 characters).",
      "encuesta.submit": "Share on the map",
      "encuesta.visits": "Site visits",
      "encuesta.empty": "No responses in this browser yet. Be the first to leave your mark.",
      "encuesta.map.title": "Map of voices and locations",
      "encuesta.map.origin": "Origin",
      "encuesta.map.residence": "Current residence",
      "encuesta.map.write": "Writing from",
      "encuesta.map.voice": "Voice with story",
      "encuesta.map.filter": "Show only voices with stories",
      "encuesta.map.loading": "Loading shared locations…",
      "encuesta.voices.title": "Voices on the map",
      "encuesta.voices.intro":
        "Click a phrase to center the map on that location and read the full story.",
      "faq.label": "Help",
      "faq.title": "Frequently asked questions (FAQ)",
      "faq.puente": "Brief answers to common questions about the Hub, its data, and how to participate.",
      "faq.index": "In this section",
      "faq.q1": "What is the Migration and Social Impact Hub?",
      "faq.q2": "How can I participate in the Hub?",
      "faq.q3": "Where does the migration data on the site come from?",
      "faq.a1":
        "It is an academic initiative of Tecnológico de Monterrey, Puebla campus, inaugurated in February 2025 to study migration with a human, ethical, and social impact approach. It connects research, outreach (such as the Sociedad Migrante podcast), data visualization, and projects with IOM and GMMA.",
      "faq.a1.link": "Go to Hub home",
      "faq.a2":
        "You can propose an academic project, collaborate on research about student mobility, share the site's contents, or add your voice on the location map. Write to us from the contact section.",
      "faq.a2.link1": "Go to «How can you participate?»",
      "faq.a2.link2": "Contact the Hub",
      "faq.a3":
        "Global figures come from the Institute for Mexicans Abroad (SRE) and the IOM Migration Data Portal. Research on student mobility in Puebla is the Hub team's own work (surveys, Graph Commons, and cartography). The visitor map may use a Google Sheet (see apps-script/SETUP-MAPA.md), the datos-visitantes.json file, and your browser's responses; optional phrases («voices») are read when clicking on the map.",
      "faq.a3.link1": "View global citizenship",
      "faq.a3.link2": "View research",
      "footer.credits": "Hub credits",
      "footer.credits.body":
        "Migration and Social Impact Hub — Tecnológico de Monterrey, Puebla campus and Central-Western Region.",
      "footer.credits.role": "Website creator and Hub coordinator.",
      "footer.contact": "Contact",
      "footer.contact.body": "Would you like to collaborate, integrate a project, or learn more about the Hub?",
      "footer.contact.write": "Write to us by email.",
      "footer.contact.btn": "Send email",
      "footer.sitemap": "On this page",
      "footer.legal": "© Migration and Social Impact Hub — Tec de Monterrey, Puebla campus.",
      "back.top": "Back to top",
      "cap.hub": "The Hub",
      "cap.creacion": "Content creation",
      "cap.ciudadania": "Global citizenship",
      "cap.investigacion": "Research",
      "cap.storytelling": "Storytelling",
      "cap.participar": "Get involved",
      "cap.ubicacion": "Your location",
      "cap.faq": "FAQ",
      "cap.contacto": "Contact",
      "factor.gusto": "Enjoyment of the city",
      "factor.gusto.d": "Affinity with Puebla as a place to live, beyond academics.",
      "factor.academica": "Academic quality",
      "factor.academica.d": "Perception of a solid educational offering on campus.",
      "factor.oportunidades": "University opportunities",
      "factor.oportunidades.d": "Access to programs, networks, and experiences within the institution.",
      "factor.familia": "Family and friends",
      "factor.familia.d": "Close support networks that influence the decision to stay.",
      "factor.carrera": "Available degree program",
      "factor.carrera.d": "Offer of the degree or path they sought upon arrival.",
      "factor.laboral": "Job opportunities",
      "factor.laboral.d": "Employment or internship prospects in the region.",
      "factor.economia": "Economy and comfort",
      "factor.economia.d": "Cost of living and material conditions for staying.",
      "factor.otros": "Other",
      "factor.otros.d": "Additional reasons mentioned in open responses.",
      "factor.menciones": "{n} thematic mentions.",
      "tour.step": "Step {current} of {total}",
      "tour.prev": "Previous",
      "tour.next": "Next",
      "tour.finish": "Finish tour",
      "tour.exit": "Exit tour",
      "tour.summary.title": "Tour summary",
      "tour.summary.body": "You completed the Hub route. These are the chapters you visited:",
      "tour.summary.map": "You already shared your three locations in this browser. You can review them on the map.",
      "tour.summary.map.empty": "When finished, you can leave your mark on the voices and locations map.",
      "tour.summary.viewmap": "View voices map",
      "tour.summary.close": "Close",
      "tour.hub.title": "The Migration Hub",
      "tour.hub.text": "This is the starting point: what the Hub is, who drives it, and how it connects with IOM and the Puebla campus.",
      "tour.creacion.title": "Content creation",
      "tour.creacion.text": "Listen to the episode with Javier Moreno Sánchez from the European Parliament. Migration is narrated before being measured with figures.",
      "tour.ciudadania.title": "Global citizenship",
      "tour.ciudadania.text": "IME/SRE figures, IOM map, and the Hub's international presence with GMMA.",
      "tour.investigacion.title": "Research in Puebla",
      "tour.investigacion.text": "Study on student mobility, interactive graph, cartography, and factors for staying in Puebla.",
      "tour.storytelling.title": "Storytelling",
      "tour.storytelling.text": "Capaz and «When you return»: projects that transform data and voices into narratives with social impact.",
      "tour.participacion.title": "Your participation",
      "tour.participacion.text": "The tour closes with an invitation: you can propose projects and join the Hub.",
      "tour.encuesta.title": "Voices and locations",
      "tour.encuesta.text": "Answer three questions: your place of origin, where you currently live, and where you are writing from. All three locations appear on the map.",
      "encuesta.responses": "{n} response(s) in this browser (also on the map):",
      "encuesta.residence.in": "lives in",
      "encuesta.write.from": "writing from"
    }
  };

  function t(clave, vars) {
    let texto = traducciones[idiomaActual]?.[clave] ?? traducciones.es[clave] ?? clave;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        texto = texto.replace(`{${k}}`, v);
      });
    }
    return texto;
  }

  function getIdioma() {
    return idiomaActual;
  }

  function aplicarTraducciones() {
    document.documentElement.lang = idiomaActual;
    document.title = t("meta.title");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const clave = el.dataset.i18n;
      const html = el.dataset.i18nHtml === "true";
      if (html) el.innerHTML = t(clave);
      else el.textContent = t(clave);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });

    document.querySelectorAll(".btn-idioma").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === idiomaActual);
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === idiomaActual));
    });

    window.dispatchEvent(new CustomEvent("hub:idioma", { detail: { idioma: idiomaActual } }));
  }

  function setIdioma(idioma) {
    if (!traducciones[idioma]) return;
    idiomaActual = idioma;
    localStorage.setItem(CLAVE_IDIOMA, idioma);
    aplicarTraducciones();
  }

  function initIdioma() {
    const contenedor = document.querySelector("#selector-idioma");
    if (contenedor) {
      contenedor.querySelectorAll(".btn-idioma").forEach((btn) => {
        btn.addEventListener("click", () => setIdioma(btn.dataset.lang));
      });
    }
    aplicarTraducciones();
  }

  window.HubI18n = { t, getIdioma, setIdioma, aplicarTraducciones, initIdioma };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIdioma);
  } else {
    initIdioma();
  }
})();
