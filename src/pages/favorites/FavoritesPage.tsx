import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from 'react-query';
import { Typography } from '@mui/material';
import { MovieDetailType } from '../../types/moviesTypes';
import FavoritesList from './FavoritesList';

const fetchMovies = async (movieIds: string[]): Promise<MovieDetailType[]> => {
  try {
    const movieDetailsPromises = movieIds.map(id =>
      fetch(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}&plot=full`,
      ).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }),
    );
    return await Promise.all(movieDetailsPromises);
  } catch (error) {
    console.error('Fetching movies details failed:', error);
    throw error;
  }
};

const FavoritesPage = () => {
  const favoriteMovieIds = useSelector((state: RootState) => state.movies.favoriteMovieIds);

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery<MovieDetailType[], string>(
    ['favoritesMovies', favoriteMovieIds],
    () => fetchMovies(favoriteMovieIds),
    {
      enabled: favoriteMovieIds.length > 0,
    },
  );

  return (
    <div>
      <Typography variant={'h1'} component={'h1'}>
        Favorites
      </Typography>
      <FavoritesList movies={movies} error={error} loading={isLoading} />
    </div>
  );
};
export default FavoritesPage;
