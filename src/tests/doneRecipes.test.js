import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import DoneRecipes from '../Pages/DoneRecipes';
import RecipesProvider from '../context/RecipesProvider';

const doneRecipesPage = '/done-recipes';
const allBtn = 'filter-by-all-btn';
const mealBtn = 'filter-by-meal-btn';
const drinkBtn = 'filter-by-drink-btn';
const recipeOneName = '0-horizontal-name';
const recipeTwoName = '1-horizontal-name';
const recipeThreeName = '2-horizontal-name';

const mockRecipes = [
  {
    id: '52874',
    type: 'meal',
    nationality: 'Italian',
    category: 'beef',
    alcoholicOrNot: 'non-alcoholic',
    name: 'Beef and Mustard Pie',
    image: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
    doneDate: '06/03/2023',
    tags: ['pie'],
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
    tags: [],
    doneDate: '2023-03-08',
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
    tags: [],
    doneDate: '2023-03-08',
  },
];

describe('Testes da pagina DoneRecipes', () => {
  it('Testa se os elementos são renderizados', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockRecipes));
    const history = createMemoryHistory();
    history.push(doneRecipesPage);
    render(
      <RecipesProvider>
        <Router history={ history }>
          <DoneRecipes />
        </Router>
      </RecipesProvider>,
    );

    expect(screen.getByTestId(allBtn)).toBeInTheDocument();
    expect(screen.getByTestId(mealBtn)).toBeInTheDocument();
    expect(screen.getByTestId(drinkBtn)).toBeInTheDocument();
    expect(screen.getByTestId(recipeOneName)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
  });

  it('Testa os filtros', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockRecipes));
    const history = createMemoryHistory();
    history.push(doneRecipesPage);
    render(
      <RecipesProvider>
        <Router history={ history }>
          <DoneRecipes />
        </Router>
      </RecipesProvider>,
    );

    const filterMeal = screen.getByTestId(mealBtn);
    userEvent.click(filterMeal);
    expect(screen.queryByTestId(recipeTwoName)).not.toBeInTheDocument();

    const filterDrink = screen.getByTestId(drinkBtn);
    userEvent.click(filterDrink);
    expect(screen.queryByTestId(recipeTwoName)).toBeInTheDocument();
    expect(screen.queryByTestId(recipeThreeName)).not.toBeInTheDocument();

    const filterAll = screen.getByTestId(allBtn);
    userEvent.click(filterAll);
    expect(screen.queryByTestId(recipeThreeName)).toBeInTheDocument();
  });
});
