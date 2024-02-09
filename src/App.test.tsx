import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer, { initialState } from './redux/moviesSlice';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/detail/DetailPage';
import FavoritesPage from './pages/favorites/FavoritesPage';

const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: Infinity } },
});

const testStore = configureStore({
  reducer: { movies: moviesReducer },
  preloadedState: { movies: initialState },
});
describe('App component', () => {
  it('should render HomePage on the root route', () => {
    render(
      <Provider store={testStore}>
        <QueryClientProvider client={testQueryClient}>
          <App />
        </QueryClientProvider>
      </Provider>,
    );

    expect(screen.getByText('Search for some movies')).toBeInTheDocument();
  });

  it('should render FavoritesPage on the /favorites route', () => {
    render(
      <Provider store={testStore}>
        <QueryClientProvider client={testQueryClient}>
          <MemoryRouter initialEntries={[`/favorites`]}>
            <Routes>
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>,
    );

    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  jest.setTimeout(2200);

  it('should render DetailPage on the /movie/tt2084949 route', async () => {
    const movieId = 'tt2084949';
    render(
      <Provider store={testStore}>
        <QueryClientProvider client={testQueryClient}>
          <MemoryRouter initialEntries={[`/movie/${movieId}`]}>
            <Routes>
              <Route path="/movie/:movieId" element={<DetailPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>,
    );

    await waitFor(
      () => {
        expect(screen.getByText('Superman, Spiderman or Batman (2011)')).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
