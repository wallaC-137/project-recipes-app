import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useRouteMatch } from 'react-router-dom';
import clipboard from 'clipboard-copy';
import style from './RecipeInProgress.module.css';
import RecipesContext from '../context/RecipesContext';
import ButtonFavorite from '../components/ButtonFavorite';
import { fetchIdDrinks, fetchIdFood } from '../services/FetchApi';

function RecipeInProgress() {
  const { alert, setAlert } = useContext(RecipesContext);

  const [done, setDone] = useState([]); // marked input array
  const [goLs2, setGoLs2] = useState([]); // accumulator
  const [lockLs, setLockLs] = useState(false);// lock to prevent the localstorage from being updated more than once
  const [responseApi, setResponseApi] = useState([]); // response from the api
  const [ingredient, setIngredient] = useState([]); // array of ingredients
  const [amount, setAmount] = useState([]); // array of amounts

  const { pathname } = useLocation();
  const { id } = useParams();
  const match = useRouteMatch();

  const params = pathname.slice(1).split('/');
  const typeRecipes = params[0];

  /**
   * function responsible for the system to copy the link
   */
  const handleClick = () => {
    const paramsUrl = match.url.split('/');
    const URL = `http://localhost:3000/${paramsUrl[1]}/${paramsUrl[2]}`;
    clipboard(URL);
    setAlert(true);
    const duration = 3000;
    setTimeout(() => {
      setAlert(false);
    }, duration);
  };

  /**
   * function responsible for getting from localstorage the ingredients already used
   */
  const lsRecovery2 = () => {
    const mealsOrDrinks = match.url.split('/')[1]; // captures whether it is the meals or drinks route to be used as a key
    const recipeKey = match.params.id; // captures the id of the recipe to be used as a key

    const lsSaved = JSON.parse(localStorage
      .getItem('inProgressRecipes')) ?? {
      meals: {},
      drinks: {},
    };

    setGoLs2(lsSaved[mealsOrDrinks][recipeKey]);
  };

  /**
   * function responsible for updating the localstorage with the marked inputs
   */
  const checkedList = () => {
    const mealsOrDrinks = match.url.split('/')[1]; // captures whether it is the meals or drinks route to be used as a key
    const recipeKey = match.params.id; // captures the id of the recipe to be used as a key

    const algo2 = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? {
      meals: {},
      drinks: {},
    };

    localStorage.setItem('inProgressRecipes', JSON
      .stringify({
        ...algo2,
        [mealsOrDrinks]: {
          ...algo2[mealsOrDrinks],
          [recipeKey]: done,
        },
      }));
  };

  /**
   * function responsible for receiving the result from the api and extracting the ingredients and their respective quantities from within it
   * @param {*} x - response from the api
   */
  const getIngredients = (x) => {
    const ingredients = [];
    const measures = [];
    const max = 20;
    for (let i = 1; i <= max; i += 1) {
      const ingredientName = `strIngredient${i}`;
      const measureName = `strMeasure${i}`;
      if (x[0][ingredientName]) {
        ingredients.push(x[0][ingredientName]);
        measures.push(x[0][measureName]);
      }
    }
    setIngredient(ingredients);
    setAmount(measures);
  };

  /**
   * function responsible for executing requests to the api
   */
  useEffect(() => {
    const fetchById = async () => {
      if (typeRecipes === 'drinks') {
        const recipeDrink = await fetchIdDrinks(id);
        const { drinks } = recipeDrink;
        setResponseApi(drinks);
        getIngredients(drinks);
      } else {
        const recipeFood = await fetchIdFood(id);
        const { meals } = recipeFood;
        setResponseApi(meals);
        getIngredients(meals);
      }
    };
    fetchById();
  }, []);

  /**
   * function responsible for updating the localstorage and getting the ingredients already used
   */
  useEffect(() => {
    if (lockLs) { checkedList(); }
    lsRecovery2();
  }, [done]);

  return (
    <div>
      <h1
        data-testid="recipe-title"
      >
        { responseApi[0]?.strMeal ?? responseApi[0]?.strDrink }
      </h1>
      <img
        data-testid="recipe-photo"
        width="300px"
        src={ responseApi[0]?.strMealThumb ?? responseApi[0]?.strDrinkThumb }
        alt=""
      />
      <br />
      <button
        className="buttonShare"
        data-testid="share-btn"
        onClick={ handleClick }
      >
        Share
      </button>
      <ButtonFavorite
        typeRecipe={ responseApi }
        typeRecipes={ typeRecipes }
        id={ id }
      />
      { alert && <p>Link copied!</p> }
      <h4
        data-testid="recipe-category"
      >
        { responseApi[0]?.strCategory ?? responseApi[0]?.strAlcoholic }
      </h4>
      <h3>Ingredientes</h3>
      <div className={ style.list }>
        { ingredient?.map((ingredientRecipe, i) => (
          <label
            key={ `${ingredientRecipe}-${i}` }
            data-testid={ `${i}-ingredient-step` }
            className={ `${goLs2
              ?.includes(ingredientRecipe) && style['list-of-ingredients']}` }
          >
            <input
              type="checkbox"
              name=""
              checked={ goLs2?.includes(ingredientRecipe) }
              onChange={ () => {
                setDone((prev) => {
                  if (prev?.includes(ingredientRecipe)) {
                    return prev?.filter((element) => element !== ingredientRecipe);
                  }
                  return [...prev, ingredientRecipe];
                });
                setLockLs(true);
              } }
            />
            { `${ingredientRecipe}: ${amount[i]}` }
          </label>
        ))}
      </div>
      <h3>Instruções</h3>
      <p data-testid="instructions">
        { responseApi[0]?.strInstructions ?? responseApi[0]?.strInstructions }
      </p>
      <button
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}
export default RecipeInProgress;
