function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Tiempo de espera (ms) tras la última tecla antes de filtrar
const SEARCH_DEBOUNCE_MS = 300;
// Mínimo de caracteres para activar la búsqueda parcial
const SEARCH_MIN_CHARS = 2;

let searchDebounceTimer;

// Envoltorio con debounce: esto es lo que se llama desde el HTML (oninput="filterBooks()")
function filterBooks() {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(performFilter, SEARCH_DEBOUNCE_MS);
}

// Lógica real de filtrado, ejecutada tras la pausa del debounce
function performFilter() {
  const rawInput = document.getElementById('searchInput').value.trim();
  const cards = document.querySelectorAll('.card');
  const noResultsEl = document.getElementById('noResults');
  const resultsCountEl = document.getElementById('resultsCount');
  const clearBtn = document.getElementById('clearSearchBtn');

  // Mostrar u ocultar el botón de limpiar según si hay texto escrito
  if (clearBtn) {
    clearBtn.style.display = rawInput.length > 0 ? 'flex' : 'none';
  }

  if (rawInput.length < SEARCH_MIN_CHARS) {
    cards.forEach(card => card.style.display = '');
    if (noResultsEl) noResultsEl.style.display = 'none';
    if (resultsCountEl) resultsCountEl.textContent = '';
    return;
  }

  const cleanInput = removeAccents(rawInput);
  const escapedInput = cleanInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // \b al inicio (coincide con el comienzo de una palabra) sin \b al final
  // permite coincidencias parciales tipo "Harr" -> "Harry", evitando falsos
  // positivos en mitad de palabra como "it" -> "escrito".
  const regex = new RegExp(`\\b${escapedInput}`, 'i');

  let matches = 0;

  cards.forEach(card => {
    if (card.classList.contains('card-promo')) return;

    const cardTextNormalized = removeAccents(card.textContent);
    const isMatch = regex.test(cardTextNormalized);

    if (isMatch) {
      card.style.display = '';
      matches++;
    } else {
      card.style.display = 'none';
      // Si la tarjeta que se oculta tiene un audio sonando, se pausa
      card.querySelectorAll('.audio-element').forEach(audio => {
        if (!audio.paused) {
          audio.pause();
          const btn = audio.closest('.sample-audio-container').querySelector('.sample-btn');
          if (btn) setSampleButtonToPaused(btn);
        }
      });
    }
  });

  // Mostrar el mensaje si no hubo ninguna coincidencia
  if (noResultsEl) {
    noResultsEl.style.display = matches === 0 ? 'block' : 'none';
  }

  // Actualizar el contador de resultados
  if (resultsCountEl) {
    resultsCountEl.textContent = matches === 0
      ? ''
      : `${matches} ${matches === 1 ? 'resultado encontrado' : 'resultados encontrados'}`;
  }
}

// Limpia el buscador y restaura el catálogo completo
function clearSearch() {
  const input = document.getElementById('searchInput');
  input.value = '';
  input.focus();
  clearTimeout(searchDebounceTimer);
  performFilter();
}

// Detener otros audios cuando uno comienza a reproducirse
document.addEventListener('play', function(e) {
  const audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    if (audio !== e.target) {
      audio.pause();
    }
  });
}, true);

// Paths SVG de los íconos de play/pausa, centralizados para no repetirlos
const ICON_PATH_PLAY = 'M8 5v14l11-7z';
const ICON_PATH_PAUSE = 'M6 19h4V5H6v14zm8-14v14h4V5h-4z';

// Aplica el estado "en pausa / listo para reproducir" a un botón de muestra
function setSampleButtonToPaused(button) {
  button.querySelector('.btn-text').textContent = 'Prueba';
  button.querySelector('.play-icon path').setAttribute('d', ICON_PATH_PLAY);
  button.setAttribute('aria-pressed', 'false');
  button.setAttribute('aria-label', 'Reproducir avance');
}

// Aplica el estado "reproduciendo" a un botón de muestra
function setSampleButtonToPlaying(button) {
  button.querySelector('.btn-text').textContent = 'Pausar';
  button.querySelector('.play-icon path').setAttribute('d', ICON_PATH_PAUSE);
  button.setAttribute('aria-pressed', 'true');
  button.setAttribute('aria-label', 'Pausar avance');
}

// Función global para alternar la reproducción del botón "Avance"
function toggleAudio(button) {
  const container = button.closest('.sample-audio-container');
  const audio = container.querySelector('.audio-element');

  // Detener cualquier otro audio en reproducción y restablecer sus botones
  document.querySelectorAll('.audio-element').forEach(otherAudio => {
    if (otherAudio !== audio && !otherAudio.paused) {
      otherAudio.pause();
      const otherBtn = otherAudio.closest('.sample-audio-container').querySelector('.sample-btn');
      if (otherBtn) {
        setSampleButtonToPaused(otherBtn);
      }
    }
  });

  // Alternar reproducir / pausar
  if (audio.paused) {
    audio.play();
    setSampleButtonToPlaying(button);
  } else {
    audio.pause();
    setSampleButtonToPaused(button);
  }

  // Restaurar el botón al terminar la pista
  audio.onended = function() {
    setSampleButtonToPaused(button);
  };
}
