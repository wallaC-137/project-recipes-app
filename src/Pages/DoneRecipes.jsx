import { useState } from 'react';
import Header from '../components/Header';
import RecipesCard from '../components/RecipesCard';

function DoneRecipes() {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  function applyFilter(filter) {
    if (filter) {
      setFilteredRecipes(recipes.filter((recipe) => recipe.type === filter));
    } else {
      setFilteredRecipes(recipes);
    }
  }
  return (
    <div>
      <Header />
      <h1 data-testid="page-title">
        Done Recipes
      </h1>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => applyFilter('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => applyFilter('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => applyFilter('drink') }
        >
          Drinks
        </button>
      </div>
      {filteredRecipes.map((recipe, index) => (
        <div key={ index }>
          <RecipesCard recipe={ recipe } index={ index } />
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
