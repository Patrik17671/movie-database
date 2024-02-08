import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { MovieDetailParametersType, MovieDetailType } from '../../types/moviesTypes';
import { Typography, Grid, Paper, Box, Rating, Chip, Tooltip } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import styles from './DetailPage.module.scss';
import map from 'lodash/map';
import split from 'lodash/split';
import startCase from 'lodash/startCase';
import { capitalize } from 'lodash';
import { getImageSrc } from '../../utils';
import DetailPageSkeleton from './DetailPageSkeleton';
import Alert from '@mui/material/Alert';
import FavoriteStar from '../../components/favorites/FavoriteStar';

//Fetching movie data
const fetchMovieDetails = async (movieId: string | undefined): Promise<MovieDetailType> => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${movieId}&plot=full`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<MovieDetailType>;
  } catch (error) {
    console.error('Fetching movie details failed:', error);
    throw error;
  }
};

const DetailPage: FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  //get data
  const {
    data: movie,
    isLoading,
    error,
  } = useQuery<MovieDetailType, Error>(
    ['movieDetails', movieId],
    () => fetchMovieDetails(movieId),
    { enabled: !!movieId },
  );

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  if (error)
    return (
      <div>
        <Alert severity="error">An error occurred: {error?.message}</Alert>
      </div>
    );
  if (!movie) {
    return (
      <div>
        <Alert severity="error">Movie was not found!</Alert>
      </div>
    );
  }

  //Convert rating to number
  const getNumericRating = (value: string): number => {
    const parsedValue = parseFloat(value.split('/')[0]);
    const isPercent = value.includes('%');
    return isPercent ? parsedValue / 10 : parsedValue / 2;
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'movie':
        return <MovieIcon />;
      case 'series':
        return <TvIcon />;
      case 'episode':
        return <OndemandVideoIcon />;
      default:
        return null;
    }
  };

  //Allowed keys of parameters to show
  const keysToDisplay: string[] = [
    'Rated',
    'Released',
    'Runtime',
    'Genre',
    'Writer',
    'Actors',
    'Language',
    'Country',
    'Awards',
    'Metascore',
    'imdbRating',
    'imdbVotes',
    'imdbID',
    'DVD',
    'BoxOffice',
    'Production',
    'Website',
  ];

  const formatKey = (key: string) => {
    return capitalize(startCase(key).toLowerCase());
  };

  return (
    <div className={styles.detail}>
      <Paper elevation={6} sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              sx={{ width: '100%', borderRadius: '8px' }}
              src={getImageSrc(movie.Poster)}
              alt={`Poster of ${movie.Title}`}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" gutterBottom component="h1">
              {movie.Title} ({movie.Year})
              <FavoriteStar movieId={movie.imdbID} />
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="center">
              {map(split(movie.Genre, ', '), genre => {
                if (genre.trim() === 'N/A') {
                  return '';
                }
                return <Chip key={genre} label={genre.trim()} sx={{ marginRight: 1 }} />;
              })}
              <Tooltip title={movie.Type}>
                <Chip label={getContentIcon(movie.Type)} />
              </Tooltip>
            </Box>
            {movie.Plot !== 'N/A' ? (
              <Typography variant="body1" paragraph sx={{ my: 2 }}>
                {movie.Plot}
              </Typography>
            ) : (
              ''
            )}
            {movie.Director !== 'N/A' ? (
              <Typography variant="body2" color="text.secondary">
                Directed by {movie.Director}
              </Typography>
            ) : (
              ''
            )}
            <Box sx={{ my: 2 }}>
              {map(movie.Ratings, (rating, index) => {
                return (
                  <Box key={index} mr={2} display="inline-block">
                    <Typography variant="subtitle2" component="legend">
                      {rating.Source}
                    </Typography>
                    <Rating
                      name={`rating-${index}`}
                      value={getNumericRating(rating.Value)}
                      readOnly
                      precision={0.1}
                    />
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {map(keysToDisplay, key => {
              const value = movie[key as keyof MovieDetailParametersType];
              if (value === 'N/A') {
                return null;
              }
              return (
                <Grid item xs={6} sm={4} key={key}>
                  <Typography variant="body2" color="primary.dark">
                    {formatKey(key)}:{' '}
                    <Box component="span" color="text.secondary">
                      {value}
                    </Box>
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default DetailPage;
