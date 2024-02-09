import { Grid, Typography } from '@mui/material';
import times from 'lodash/times';
import ResultsSkeleton from '../search/ResultsSkeleton';
import React from 'react';

const FavoritesSkeleton = () => {
  return (
    <div>
      <Typography variant={'h1'} component={'h1'}>
        Favorites
      </Typography>
      <Grid container spacing={3}>
        {times(6, index => (
          <Grid item xs={6} sm={4} key={index}>
            <ResultsSkeleton />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default FavoritesSkeleton;
