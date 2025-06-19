// nutritionix.js
const NUTRITIONIX_APP_ID = 'cc2d8011';
const NUTRITIONIX_APP_KEY = '01f29755029cd0136ba928516ef9f4cd';

export async function fetchNutrition(foodItem) {
  const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': NUTRITIONIX_APP_ID,
      'x-app-key': NUTRITIONIX_APP_KEY
    },
    body: JSON.stringify({ query: foodItem })
  });

  const data = await response.json();
  // Return formatted list
  return data.foods.map(food => ({
    name: food.food_name,
    calories: food.nf_calories
  }));
}
