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