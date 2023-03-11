import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

describe('All tests from Search', () => {
  it('', async () => {
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

  it('', async () => {
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

  it.only('', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks/14229/in-progress'] },
    );

    // await waitFor(() => {
    const button = screen.getByTestId('share-btn');
    userEvent.click(button);
    // });
    // const textCopy = screen.getByText(/link copied!/i);
    // userEvent.click(textCopy);
    // const algo = screen.getAllByRole('checkbox');
    // expect(algo).toHaveLength(3);
  });
});
