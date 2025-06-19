// main.js (module)

import { fetchRecipes } from './recipes.js';
import { fetchNutrition } from './nutrition-tracker.js';

document.addEventListener("DOMContentLoaded", function () {
  // Menu toggle for mobile navigation
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("change", function () {
      if (this.checked) {
        navLinks.classList.add("open");
      } else {
        navLinks.classList.remove("open");
      }
    });
  }

  const page = window.location.pathname;

  const searchBtn = document.querySelector('#searchBtn');
  const searchInput = document.querySelector('#searchInput');
  const results = document.querySelector('#results');

  // Display recipes with ingredients and details
  function displayRecipes(recipes) {
    if (!recipes || recipes.length === 0) {
      results.innerHTML = "<p>No recipes found.</p>";
      return;
    }
    results.innerHTML = recipes.map(item => `
      <div class="card">
        <h4>${item.title}</h4>
        <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'"/>
        <p>${item.description || ''}</p>
        <p><strong>Ingredients:</strong> ${item.ingredients ? item.ingredients.join(', ') : ''}</p>
        <p><strong>Calories:</strong> ${item.calories || ''}</p>
        <p><strong>Diet:</strong> ${item.diet || ''}</p>
        <p><strong>Prep Time:</strong> ${item.prepTime || ''}</p>
        <p><strong>Cook Time:</strong> ${item.cookTime || ''}</p>
        <p><strong>Servings:</strong> ${item.servings || ''}</p>
      </div>
    `).join('');
  }

  // On page load, show all recipes or last search
  if (page.includes('index.html') || page.includes('recipes.html')) {
    // Restore last search from localStorage
    const lastRecipeSearch = localStorage.getItem('lastRecipeSearch') || "";
    searchInput.value = lastRecipeSearch;
    fetchRecipes(lastRecipeSearch).then(displayRecipes);

    // On search button click
    searchBtn.addEventListener('click', async () => {
      const query = searchInput.value.trim();
      localStorage.setItem('lastRecipeSearch', query); // Save to localStorage
      const recipes = await fetchRecipes(query);
      displayRecipes(recipes);
    });
  }

  // === Nutrition Tracker Page ===
  if (page.includes('nutrition-tracker.html')) {
    // Restore last search from localStorage
    const lastNutritionSearch = localStorage.getItem('lastNutritionSearch') || "";
    searchInput.value = lastNutritionSearch;
    if (lastNutritionSearch) {
      fetchNutrition(lastNutritionSearch).then(displayNutrition);
    }

    searchBtn.addEventListener('click', async () => {
      const query = searchInput.value.trim();
      if (!query) return;
      localStorage.setItem('lastNutritionSearch', query); // Save to localStorage
      const items = await fetchNutrition(query);
      displayNutrition(items);
    });
  }

  function displayNutrition(items) {
    if (!items || items.length === 0) {
      results.innerHTML = `<p>No nutrition info found.</p>`;
      return;
    }
    results.innerHTML = items.map(item => `
      <div class="card">
        <h4>${item.name}</h4>
        <p>Calories: ${item.calories}</p>
        <p>Fat: ${item.fat}g</p>
        <p>Protein: ${item.protein}g</p>
        <p>Carbs: ${item.carbs}g</p>
      </div>
    `).join('');
  }

  // Footer date/time (keep as is)
  const lastUpdatedSpan = document.getElementById('lastUpdated');
  if (lastUpdatedSpan) {
    const lastUpdatedDate = new Date(document.lastModified);
    lastUpdatedSpan.textContent = lastUpdatedDate.toLocaleDateString();
  }
  function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    const currentTimeSpan = document.getElementById("currentTime");
    if (currentTimeSpan) currentTimeSpan.textContent = timeString;
  }
  updateTime();
  setInterval(updateTime, 1000);
});