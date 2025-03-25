// popup.js
import { getAllCards } from './dataLoader.js';

export function setupPopupHandlers() {
  // Click on card image triggers popup
  document.getElementById('cardPanel').addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;

    const cardId = card.dataset.cardId;
    const data = getAllCards().find(c => c.id === cardId);
    if (data) showCardPopup(data);
  });

  // Close button
  document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('cardPopup').classList.add('hidden');
  });
}

function showCardPopup(card) {
  const popup = document.getElementById('cardPopup');
  const content = document.getElementById('popupDetails');
  popup.classList.remove('hidden');

  content.innerHTML = `
    <h2>${card.name}</h2>
    <p><strong>Type:</strong> ${card.type}</p>
    <p><strong>Cost:</strong> ${card.cost}</p>
    <p><strong>Expansion:</strong> ${card.expansion}</p>
    <p>${highlightKeywords(card.text)}</p>
  `;
}

function highlightKeywords(text) {
  // Optional: Highlight game keywords like 'flying', 'lifelink', etc.
  const keywords = ['flying', 'lifelink', 'trample', 'haste'];
  const regex = new RegExp(`\b(${keywords.join('|')})\b`, 'gi');
  return text.replace(regex, '<span class="keyword">$1</span>');
}
