 const API_KEY = '4c914838adc44b7b881d4667518e01de';

export async function fetchRecipes(query) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&addRecipeInformation=true&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return (data.results || []).map(item => ({
    title: item.title,
    description: item.summary ? item.summary.replace(/<[^>]+>/g, '') : '',
    calories: item.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 'N/A',
    ingredients: item.extendedIngredients ? item.extendedIngredients.map(ing => ing.original) : [],
    prepTime: item.readyInMinutes ? `${item.readyInMinutes} mins` : 'N/A',
    cookTime: 'N/A',
    diet: item.diets ? item.diets.join(', ') : '',
    image: item.image,
    servings: item.servings || 'N/A'
  }));
}