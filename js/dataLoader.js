// dataLoader.js

const expansions = ['core', 'dawn', 'warforged']; // Add more sets here

let allCards = [];

/**
 * Loads all expansion JSONs from the /data folder
 */
export async function loadAllCards() {
  const promises = expansions.map(name =>
    fetch(`/data/${name}.json`).then(res => res.json())
  );
  const results = await Promise.all(promises);
  allCards = results.flat();
  return allCards;
}

export function getAllCards() {
  return allCards;
}
