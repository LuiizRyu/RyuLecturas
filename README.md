# 📚 Catálogo Digital de Audiolibros - RYU TECNOLOGÍA

Un catálogo web interactivo y responsivo diseñado para explorar un catálogo de audiolibros, escuchar avances de prueba de 30 segundos y realizar solicitudes directas vía WhatsApp.

---

## 🚀 Características Principales

- **Vista tipo Grid y Responsiva:** Adaptada para dispositivos móviles y escritorio.
- **Portadas Unificadas:** Renderizadas en proporción `2:3` uniforme (`aspect-ratio`).
- **Reproductor de Muestra:** Escucha avances en audio sin interrupciones cruzadas (reproducción global).
- **Buscador en Tiempo Real:** Filtra instantáneamente por autor, título o saga.
- **Listas desplegables interactiva:** Uso de elementos `<details>` para organizar colecciones y sagas extensas.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Marcado semántico para la estructura del catálogo.
- **CSS3:** Flexbox, CSS Grid y variables CSS para el diseño visual.
- **JavaScript (Vanilla):** Gestión de reproducciones de audio, eventos y filtrado.

---

## 📁 Estructura del Proyecto

```text
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── audio/
│   └── (archivos de muestra .mp3 / .m4a)
├── portadas/
│   └── (imágenes de libros)
├── index.html
└── README.md
