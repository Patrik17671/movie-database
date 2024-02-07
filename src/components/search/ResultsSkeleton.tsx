import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Skeleton } from '@mui/material';

//Loading cards
const MovieCardSkeleton = () => {
  return (
    <Card>
      <Skeleton variant="rectangular" width="100%" height={400} />
      <CardContent>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </CardContent>
    </Card>
  );
};

export default MovieCardSkeleton;
