import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import drinkIcon from '../images/drinkIcon.svg';

function DoneRecipes() {
  const [data] = useState([{
    id: '0',
    type: 'drink',
    nationality: 'brazil',
    category: 'hot',
    alcoholicOrNot: 'alcoholic',
    name: 'Caipitinha',
    image: 'imagem',
    doneDate: 'data',
    tags: 'tag',
  },
  {
    id: '1',
    type: 'drink',
    nationality: 'mexico',
    category: 'vazio',
    alcoholicOrNot: 'alcoholic',
    name: 'tequila',
    image: 'imagem2',
    doneDate: 'quando2',
    tags: 'tag2',
  }]);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(data));
  }, [data]);

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

        <img src={ drinkIcon } alt="imge" data-testid={ `0-horizontal-image` } />

        <p data-testid={ `0-horizontal-top-text` }>Category text</p>

        <p data-testid={ `0-horizontal-name` }>recipe name</p>

        <p data-testid={ `0-horizontal-done-date` }>
          data q a receita foi feita
        </p>

        <button type="button" data-testid={ `0-horizontal-share-btn` }>
          Share
        </button>
        <p>Tags</p>
        <p data-testid={ `0-Pasta-horizontal-tag` }>Pasta</p>
        <p data-testid={ `0-Curry-horizontal-tag` }>Curry</p>
      </div>
    </div>
  );
}

export default DoneRecipes;
