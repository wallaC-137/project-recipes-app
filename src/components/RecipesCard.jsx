import { number, arrayOf, string, shape } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function RecipesCard({ recipes }) {
  return (
    <div>
      {recipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          { recipe.type === 'meal' ? recipe.tags.map((tag) => (
            <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ index }>
              {tag}
            </p>
          )) : null }
          <button
            src={ shareIcon }
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ shareIcon } alt="share-icon" />
          </button>

        </div>
      ))}
    </div>
  );
}

RecipesCard.propTypes = {
  recipes: arrayOf(
    shape({
      id: number,
      name: string,
      image: string,
      category: string,
      doneDate: string,
      type: string,
      tags: arrayOf(string),
    }),
  ),
}.isRequired;

export default RecipesCard;
