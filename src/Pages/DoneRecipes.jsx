import Header from '../components/Header';
import RecipesCard from '../components/RecipesCard';

function DoneRecipes() {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div>
      <Header />
      <h1 data-testid="page-title">
        Done Recipes
      </h1>
      <div>
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-meal-btn">
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        <br />
        <br />
        <RecipesCard recipes={ recipes } />
      </div>
    </div>
  );
}

export default DoneRecipes;
