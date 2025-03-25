// main.js
import { loadAllCards } from './dataLoader.js';
import { renderCards } from './renderer.js';
import { setupFilters, getFilteredCards } from './filters.js';
import { setupPopupHandlers } from './popup.js';
import { animateSorting } from './animations.js';

let allCards = [];

async function initApp() {
  allCards = await loadAllCards();
  setupFilters(allCards);
  renderCards(allCards);
  setupPopupHandlers();
  attachSorting();
}

function attachSorting() {
  const sortSelect = document.getElementById('sortSelector');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', () => {
    const panel = document.getElementById('cardPanel');
    animateSorting(panel, () => {
      const sorted = getFilteredCards(sortSelect.value);
      renderCards(sorted);
    });
  });
}

document.addEventListener('DOMContentLoaded', initApp);
