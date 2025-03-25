// dataLoader.js

const expansions = ['core', 'dawn', 'warforged']; // Add more expansion keys here

let allCards = [];

/**
 * Loads all expansion JSONs from the data/expansions folder
 */
export async function loadAllCards() {
  const promises = expansions.map(name => fetch(`/data/expansions/${name}.json`).then(res => res.json()));
  const results = await Promise.all(promises);
  allCards = results.flat();
  return allCards;
}

/**
 * Optionally expose cached card data
 */
export function getAllCards() {
  return allCards;
}
