import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

describe('All tests from Search', () => {
  it('It should navigate to the selected meal page when a meal category is clicked and a specific meal is selected from the list', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/53060/in-progress'] },
    );

    await waitFor(() => {
      for (let i = 0; i < 6; i += 1) {
        const input = screen.getByTestId(`${i}-ingredient-step`);
        userEvent.click(input);
      }
    });
    const algo = screen.getAllByRole('checkbox');
    expect(algo).toHaveLength(6);
  });

  it('It should navigate to the selected meal page when a meal category is clicked and a specific meal is selected from the list', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks/14229/in-progress'] },
    );

    await waitFor(() => {
      for (let i = 0; i < 3; i += 1) {
        const input = screen.getByTestId(`${i}-ingredient-step`);
        userEvent.click(input);
      }
    });
    const algo = screen.getAllByRole('checkbox');
    expect(algo).toHaveLength(3);
  });
});
