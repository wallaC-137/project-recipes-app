import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { fetchIdDrinks, fetchIdFood,
  fetchFoodsDrink, fetchFoodsMeal } from '../services/FetchApi';
import '../style/Details.css';
import ButtonDetails from '../components/ButtonDetails';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import RecipesContext from '../context/RecipesContext';

export default function RecipeDetails() {
  const [drink, setDrink] = useState({});
  const [meal, setMeal] = useState({});
  const {
    alert,
    ingredient,
    setIngredient,
    typeRecipe,
    setTypeRecipe,
    measure,
    setMeasure,
    recomendation,
    setRecomendation,
  } = useContext(RecipesContext);
  const history = useHistory();
  // const [recomendation, setRecomendation] = useState(null);
  // const [typeRecipe, setTypeRecipe] = useState(null);
  // const [ingredient, setIngredient] = useState('');
  // const [measure, setMeasure] = useState(null);
  const { pathname } = useLocation();
  const params = pathname.slice(1).split('/');
  const { id } = useParams();
  const typeRecipes = params[0];
  const maxNumber = 6;

  useEffect(() => {
    const fetchById = async () => {
      if (typeRecipes === 'drinks') {
        const recipeDrink = await fetchIdDrinks(id);
        const { drinks } = recipeDrink;
        setTypeRecipe(drinks);
      } else {
        const recipeFood = await fetchIdFood(id);
        const { meals } = recipeFood;
        setTypeRecipe(meals);
      }
    };
    const fetchAllRecipes = async () => {
      if (typeRecipes === 'drinks') {
        const recipeFood = await fetchFoodsMeal();
        setRecomendation(await recipeFood);
      } else {
        const recipeDrink = await fetchFoodsDrink();
        setRecomendation(recipeDrink);
      }
    };
    fetchAllRecipes();
    fetchById();
  }, []);

  useEffect(() => {
    if (typeRecipe) {
      const keys = Object.keys(typeRecipe[0]);
      const values = Object.values(typeRecipe[0]);
      const ingredients = values.filter((ingredientRecipe, i) => {
        if (keys[i].includes('strIngredient')) {
          return ingredientRecipe;
        }
        return '';
      });
      const measures = values.filter((measureRecipe, i) => {
        if (keys[i].includes('strMeasure')) {
          return measureRecipe;
        }
        return '';
      });
      setIngredient(ingredients);
      setMeasure(measures);
    }
  }, [typeRecipe]);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setDrink(obj.drinks);
      setMeal(obj.meals);
    }
  }, []);

  useEffect(() => {
    const obj = {
      drinks: {
        ...drink,
      },
      meals: {
        ...meal,
      },
    };
    localStorage.setItem('recipes', JSON.stringify(obj));
  }, [drink, meal]);

  const startRecipe = () => {
    // if (typeRecipes === 'meals') {
    //   setMeal({ ...meal, [id]: ingredient });
    // } else {
    //   setDrink({ ...drink, [id]: ingredient });
    // }
    const duration = 1000;
    setTimeout(() => {
      history.push(`/${typeRecipes}/${id}/in-progress`);
    }, duration);
  };
  if (typeRecipe) {
    return (
      <div>
        <img
          data-testid="recipe-photo"
          width="300px"
          src={ typeRecipes === 'meals' ? typeRecipe[0].strMealThumb
            : typeRecipe[0].strDrinkThumb }
          alt=""
        />
        <h1
          data-testid="recipe-title"
        >
          { typeRecipes === 'meals' ? typeRecipe[0].strMeal : typeRecipe[0].strDrink }
        </h1>
        <h4
          data-testid="recipe-category"
        >
          { typeRecipes === 'meals' ? typeRecipe[0].strCategory
            : typeRecipe[0].strAlcoholic }
        </h4>
        { ingredient && ingredient?.map((ingredientRecipe, i) => (
          <div
            key={ i }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            { `${ingredientRecipe}: ${measure[i]}` }
          </div>
        ))}
        <p data-testid="instructions">
          { typeRecipes === 'meals' ? typeRecipe[0].strInstructions
            : typeRecipe[0].strInstructions }
        </p>
        { typeRecipes === 'meals' && (
          <iframe
            data-testid="video"
            title="Video"
            frameBorder="0"
            src={ typeRecipe[0].strYoutube }
            allowFullScreen
          >
            Video
          </iframe>
        )}
        <div className="divRecomendation">
          {
            recomendation && (
              typeRecipes === 'drinks'
                ? recomendation?.slice(0, maxNumber).map((recipe, i) => (
                  <div
                    data-testid={ `${i}-recommendation-card` }
                    key={ `recipe.idMeal ${i}` }
                  >
                    <p data-testid={ `${i}-recommendation-title` }>{ recipe.strMeal }</p>
                  </div>
                ))
                : recomendation?.slice(0, maxNumber).map((recipe, i) => (
                  <div
                    data-testid={ `${i}-recommendation-card` }
                    key={ `recipe.idDrink ${i}` }
                  >
                    <p data-testid={ `${i}-recommendation-title` }>{recipe.strDrink}</p>
                  </div>
                ))
            )
          }
        </div>
        <ButtonDetails
          startRecipe={ startRecipe }
          meal={ meal }
          drink={ drink }
          typeRecipes={ typeRecipes }
          id={ id }
        />
        <ButtonFavorite
          typeRecipe={ typeRecipe }
          typeRecipes={ typeRecipes }
          id={ id }
        />
        <ButtonShare pathname={ pathname } />
        { alert && <p>Link copied!</p> }
      </div>
    );
  }
}
