function filterBooks() {
  const input = document.getElementById('searchInput');
  
  // Normaliza el término de búsqueda quitando acentos y convirtiéndolo a minúsculas
  const filter = input.value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    // Si la tarjeta tiene la clase 'card-promo', siempre se mantiene visible
    if (card.classList.contains('card-promo')) {
      card.style.display = '';
      return;
    }

    // Normaliza el texto de la tarjeta de libro para la comparación
    const text = card.textContent
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (text.includes(filter)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
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

// Función global para alternar la reproducción del botón "Avance"
function toggleAudio(button) {
  const container = button.closest('.sample-audio-container');
  const audio = container.querySelector('.audio-element');
  const btnText = button.querySelector('.btn-text');
  const icon = button.querySelector('.play-icon');

  // Detener cualquier otro audio en reproducción y restablecer sus botones
  document.querySelectorAll('.audio-element').forEach(otherAudio => {
    if (otherAudio !== audio && !otherAudio.paused) {
      otherAudio.pause();
      const otherBtn = otherAudio.closest('.sample-audio-container').querySelector('.sample-btn');
      if (otherBtn) {
        otherBtn.querySelector('.btn-text').textContent = 'Avance';
        otherBtn.querySelector('.play-icon path').setAttribute('d', 'M8 5v14l11-7z');
      }
    }
  });

  // Alternar reproducir / pausar
  if (audio.paused) {
    audio.play();
    btnText.textContent = 'Pausar';
    icon.querySelector('path').setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
  } else {
    audio.pause();
    btnText.textContent = 'Avance';
    icon.querySelector('path').setAttribute('d', 'M8 5v14l11-7z');
  }

  // Restaurar el botón al terminar la pista
  audio.onended = function() {
    btnText.textContent = 'Avance';
    icon.querySelector('path').setAttribute('d', 'M8 5v14l11-7z');
  };
}