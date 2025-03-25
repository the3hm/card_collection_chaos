// renderer.js

/**
 * Renders a list of cards as image elements in the #cardPanel
 *
 * @param {Array} cards - List of card objects (each with an `image`, `name`, `id`, etc)
 */
export function renderCards(cards) {
  const panel = document.getElementById('cardPanel');
  panel.innerHTML = '';

  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.dataset.cardId = card.id;

    const img = document.createElement('img');
    img.src = card.image; // e.g. /cards/expansion123/cardname.jpg
    img.alt = card.name;

    cardDiv.appendChild(img);
    panel.appendChild(cardDiv);
  });
}
