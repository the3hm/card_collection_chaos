// filters.js
import { getAllCards } from './dataLoader.js';
import { renderCards } from './renderer.js';

let activeFilters = {
  colors: [],
  expansion: 'any',
  cost: 'any',
  keyword: ''
};

export function setupFilters(cards) {
  const searchInput = document.getElementById('searchInput');
  const colorFilter = document.getElementById('colorFilter');
  const expansionFilter = document.getElementById('expansionFilter');
  const costFilter = document.getElementById('costFilter');

  // Populate expansions dynamically
  const uniqueExpansions = [...new Set(cards.map(c => c.expansion))];
  expansionFilter.innerHTML = `<option value="any">Any</option>` +
    uniqueExpansions.map(ex => `<option value="${ex}">${ex}</option>`).join('');

  searchInput.addEventListener('input', updateFilters);
  colorFilter.addEventListener('change', updateFilters);
  expansionFilter.addEventListener('change', updateFilters);
  costFilter.addEventListener('change', updateFilters);
}

function updateFilters() {
  const searchInput = document.getElementById('searchInput');
  const colorFilter = document.getElementById('colorFilter');
  const expansionFilter = document.getElementById('expansionFilter');
  const costFilter = document.getElementById('costFilter');

  activeFilters.keyword = searchInput.value.toLowerCase();
  activeFilters.colors = Array.from(colorFilter.selectedOptions).map(o => o.value);
  activeFilters.expansion = expansionFilter.value;
  activeFilters.cost = costFilter.value;

  const filtered = getFilteredCards();
  renderCards(filtered);
}

export function getFilteredCards(sortBy = null) {
  const cards = getAllCards();
  let result = cards.filter(card => {
    const matchesKeyword = card.text.toLowerCase().includes(activeFilters.keyword);
    const matchesColor = activeFilters.colors.length === 0 || activeFilters.colors.every(c => card.colors.includes(c));
    const matchesExpansion = activeFilters.expansion === 'any' || card.expansion === activeFilters.expansion;
    const matchesCost = activeFilters.cost === 'any' ||
      (activeFilters.cost === '5+' ? card.cost >= 5 : card.cost == activeFilters.cost);

    return matchesKeyword && matchesColor && matchesExpansion && matchesCost;
  });

  if (sortBy === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'cost') {
    result.sort((a, b) => a.cost - b.cost);
  }

  return result;
}
