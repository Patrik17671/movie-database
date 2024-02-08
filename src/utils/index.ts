import placeholderImage from '../assets/placeholder.png';
import { Middleware } from '@reduxjs/toolkit';

export const getImageSrc = (src: string) => {
  return src !== 'N/A' ? src : placeholderImage;
};

export const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const typedAction = action as { type: string };
  if (typedAction.type.startsWith('movies/')) {
    const favoriteMovieIds = store.getState().movies.favoriteMovieIds;
    localStorage.setItem('favoriteMovieIds', JSON.stringify(favoriteMovieIds));
  }
  return result;
};
