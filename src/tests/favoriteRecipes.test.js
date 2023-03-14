import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithRouter } from './helpers/renderWith';
import RecipesProvider from '../context/RecipesProvider';
import FavoriteRecipes from '../Pages/FavoriteRecipes';

const favoriteRecipesPage = '/favorite-recipes';
const allBtn = 'filter-by-all-btn';
const mealBtn = 'filter-by-meal-btn';
const drinkBtn = 'filter-by-drink-btn';
// const deleteButton = '3-horizontal-share-btn';
const favoriteOne = '0-horizontal-name';
const favoriteTwo = '1-horizontal-name';
const favoriteThree = '2-horizontal-name';
const favoriteFour = '3-horizontal-name';

const mockFavoriteRecipes = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image:
      'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
  {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image:
      'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  },
  {
    id: '53065',
    type: 'meal',
    nationality: 'Japanese',
    category: 'Seafood',
    alcoholicOrNot: '',
    name: 'Sushi',
    image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
  },
];

describe('Testanto Favorite Recipes page', () => {
  test('Testando se renderiza componentes', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
    const history = createMemoryHistory();
    history.push(favoriteRecipesPage);
    renderWithRouter(
      <RecipesProvider>
        <Router history={ history }>
          <FavoriteRecipes />

        </Router>
      </RecipesProvider>,
    );
    expect(screen.getByTestId(allBtn)).toBeInTheDocument();
    expect(screen.getByTestId(mealBtn)).toBeInTheDocument();
    expect(screen.getByTestId(drinkBtn)).toBeInTheDocument();
    expect(screen.getByTestId(favoriteOne)).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('2-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('3-horizontal-share-btn')).toBeInTheDocument();
  });
  test('Testando a funcionalidade dos filtros', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
    const history = createMemoryHistory();
    history.push(favoriteRecipesPage);
    renderWithRouter(
      <RecipesProvider>
        <Router history={ history }>
          <FavoriteRecipes />

        </Router>
      </RecipesProvider>,
    );
    const deleteFavorite = screen.getByTestId(mealBtn);
    userEvent.click(deleteFavorite);
    expect(screen.queryByTestId(favoriteThree)).not.toBeInTheDocument();

    const filterFavoriteDrink = screen.getByTestId(drinkBtn);
    userEvent.click(filterFavoriteDrink);
    expect(screen.queryByTestId(favoriteTwo)).toBeInTheDocument();
    expect(screen.queryByTestId(favoriteFour)).not.toBeInTheDocument();

    const filterAll = screen.getByTestId(allBtn);
    userEvent.click(filterAll);
    expect(screen.queryByTestId(favoriteThree)).toBeInTheDocument();
    expect(screen.queryByTestId(favoriteOne)).toBeInTheDocument();
  });
  // test('Testando a botão de excluir do favoritos', () => {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
  //   const history = createMemoryHistory();
  //   history.push(favoriteRecipesPage);
  //   renderWithRouter(
  //     <RecipesProvider>
  //       <Router history={ history }>
  //         <FavoriteRecipes />

  //       </Router>
  //     </RecipesProvider>,
  //   );
  //   const buttonFavorite = screen.getByTestId(deleteButton);
  //   expect(screen.queryByTestId(buttonFavorite)).toBeInTheDocument();

  //   const filterFavoriteDrink = screen.getByTestId(drinkBtn);
  //   userEvent.click(filterFavoriteDrink);
  //   expect(screen.queryByTestId(favoriteTwo)).toBeInTheDocument();
  //   expect(screen.queryByTestId(favoriteFour)).not.toBeInTheDocument();

  //   const filterAll = screen.getByTestId(allBtn);
  //   userEvent.click(filterAll);
  //   expect(screen.queryByTestId(favoriteThree)).toBeInTheDocument();
  //   expect(screen.queryByTestId(favoriteOne)).toBeInTheDocument();
  // });
});
