// animations.js

/**
 * Smooth transition for sorting animations.
 * Adds 'sorting' class, updates content, then removes the class.
 *
 * @param {HTMLElement} panel - The card panel container.
 * @param {Function} renderCallback - Function that renders the sorted content.
 */
function animateSorting(panel, renderCallback) {
  panel.classList.add('sorting');

  setTimeout(() => {
    renderCallback();
    requestAnimationFrame(() => {
      panel.classList.remove('sorting');
    });
  }, 200);
}

/**
 * Toggles an expandable filter section.
 *
 * @param {HTMLElement} section - The DOM element with the class 'filter-section'.
 */
function toggleFilterSection(section) {
  section.classList.toggle('expanded');
}

// Example usage in main.js:
// const panel = document.getElementById('cardPanel');
// animateSorting(panel, () => renderCards(sortedData));
//
// const section = document.querySelector('.filter-section');
// toggleFilterSection(section);

// Export for modular use if using ES Modules or bundlers
// export { animateSorting, toggleFilterSection };
