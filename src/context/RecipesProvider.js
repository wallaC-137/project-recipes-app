import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [stateApi, setStateApi] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [handleStart, setHandleStart] = useState('');
  const [alert, setAlert] = useState(false);
  const [recipesFiltered, setRecipesFiltered] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [typeRecipe, setTypeRecipe] = useState(null);
  const [measure, setMeasure] = useState(null);
  const [recomendation, setRecomendation] = useState(null);

  const value = useMemo(() => ({
    alert,
    setAlert,
    handleStart,
    setHandleStart,
    user,
    setUser,
    stateApi,
    setStateApi,
    recipes,
    setRecipes,
    recipesFiltered,
    setRecipesFiltered,
    ingredient,
    setIngredient,
    typeRecipe,
    setTypeRecipe,
    measure,
    setMeasure,
    recomendation,
    setRecomendation,
  }), [
    user,
    stateApi,
    recipes,
    recipesFiltered,
    handleStart,
    alert,
    ingredient,
    typeRecipe,
    measure,
    recomendation,
  ]);
  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
