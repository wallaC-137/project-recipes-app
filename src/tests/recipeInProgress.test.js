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
    const getCheckbox = screen.getAllByRole('checkbox');
    expect(getCheckbox).toHaveLength(6);
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
    const getCheckBox = screen.getAllByRole('checkbox');
    expect(getCheckBox).toHaveLength(3);
  });

  it('', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/52771/in-progress'] },
    );

    window.document.execCommand = jest.fn(() => true);

    const button = screen.getByTestId('share-btn');
    userEvent.click(button);

    const textCopy = await screen.findByText(/link copied!/i);

    await waitFor(() => {
      expect(textCopy).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });
});

describe('', () => {
  it('', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks/14229/in-progress'] },
    );

    await waitFor(() => {
      const getName = screen.getByText(/747/i);
      expect(getName).toBeInTheDocument();
    });

    const getCheckBox = screen.getAllByRole('checkbox');
    expect(getCheckBox).toHaveLength(3);

    userEvent.click(getCheckBox[0]);
    userEvent.click(getCheckBox[0]);

    getCheckBox[0].checked = true;
    expect(getCheckBox[0]).toBeChecked();
    getCheckBox[0].checked = false;
    expect(getCheckBox[0]).not.toBeChecked();

    const getBtnFinish = screen.getByRole('button', { name: /finalizar receita/i });
    for (let i = 0; i < 3; i += 1) {
      userEvent.click(getCheckBox[i]);
    }
    userEvent.click(getBtnFinish);
  });

  it('', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/52771/in-progress'] },
    );

    await waitFor(() => {
      const getName = screen.getByText(/Spicy Arrabiata Penne/i);
      expect(getName).toBeInTheDocument();
    });

    const getCheckBox = screen.getAllByRole('checkbox');
    expect(getCheckBox).toHaveLength(8);

    userEvent.click(getCheckBox[0]);
    userEvent.click(getCheckBox[0]);

    getCheckBox[0].checked = true;
    expect(getCheckBox[0]).toBeChecked();
    getCheckBox[0].checked = false;
    expect(getCheckBox[0]).not.toBeChecked();

    const getBtnFinish = screen.getByRole('button', { name: /finalizar receita/i });
    for (let i = 0; i < 8; i += 1) {
      userEvent.click(getCheckBox[i]);
    }
    userEvent.click(getBtnFinish);
  });

  it('', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks/15997/in-progress'] },
    );

    await waitFor(() => {
      const getName = screen.getByText(/Spicy Arrabiata Penne/i);
      expect(getName).toBeInTheDocument();
    });

    const getCheckBox = screen.getAllByRole('checkbox');
    expect(getCheckBox).toHaveLength(3);

    userEvent.click(getCheckBox[0]);
    userEvent.click(getCheckBox[0]);

    getCheckBox[0].checked = true;
    expect(getCheckBox[0]).toBeChecked();
    getCheckBox[0].checked = false;
    expect(getCheckBox[0]).not.toBeChecked();

    const getBtnFinish = screen.getByRole('button', { name: /finalizar receita/i });
    for (let i = 0; i < 3; i += 1) {
      userEvent.click(getCheckBox[i]);
    }
    userEvent.click(getBtnFinish);
  });
});
