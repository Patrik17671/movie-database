import React, { FC } from 'react';
import { MovieDetailType } from '../../types/moviesTypes';
import { Grid } from '@mui/material';
import times from 'lodash/times';
import ResultsSkeleton from '../../components/search/ResultsSkeleton';
import { isEmpty } from 'lodash';
import Alert from '@mui/material/Alert';
import map from 'lodash/map';
import Card from '../../components/card/Card';

type FavoritesListType = {
  loading: boolean;
  error: string | null;
  movies?: MovieDetailType[];
};
const FavoritesList: FC<FavoritesListType> = ({ movies, loading, error }) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {times(6, index => (
          <Grid item xs={6} sm={4} key={index}>
            <ResultsSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!loading && isEmpty(movies)) {
    return (
      <div>
        <Alert severity="warning">First you need to add movies to favorites</Alert>
      </div>
    );
  }

  return (
    <Grid container spacing={3}>
      {map(movies, (item, index) => {
        return (
          <Grid key={`movie-card-${index}`} item xs={6} sm={4}>
            <Card item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default FavoritesList;
