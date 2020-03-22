import FuzzySearch from "fuzzy-search";

const {categories, foods} = require('./all_foods.json');
const searcher = new FuzzySearch(foods, ['name'], {caseSensitive: false});

export function performSearch(query) {
  const trimmedQuery = query.trim();
  const matchingFoods = trimmedQuery !== '' && trimmedQuery.length > 2 ? searcher.search(trimmedQuery) : foods;

  const byCategory = new Map();

  for (const food of matchingFoods) {
    if (!byCategory.has(food.categoryId)) {
      byCategory.set(food.categoryId, []);
    }
    byCategory.get(food.categoryId).push(food);
  }

  const results = [];

  for (const [categoryId, items] of byCategory) {
    items.sort((a, b) => a.name.localeCompare(b.name))

    results.push({header: true, ...categories[categoryId], id: categoryId});

    for (const item of items) {
      results.push({header: false, ...item});
    }
  }

  return results;
}
