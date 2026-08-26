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
    // Normaliza todo el texto de la tarjeta quitando acentos y convirtiéndolo a minúsculas
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