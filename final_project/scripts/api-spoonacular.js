// api-spoonacular.js
const API_KEY = 'dd860f1129664e69947fec499b626629';

export async function fetchRecipes(query) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
}
