import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../../redux/moviesSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  preloadedState: {
    movies: {
      searchTerm: '',
      movies: { Search: [], totalResults: '0', Resposne: '', Error: '' },
      loading: false,
      error: null,
      favoriteMovieIds: ['tt2705436', 'tt2084949', 'tt0100669'],
    },
  },
});

describe('Header', () => {
  it('should display the number of favorite movies', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
