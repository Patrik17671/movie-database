import times from 'lodash/times';
import { Grid } from '@mui/material';
import ResultsSkeleton from './ResultsSkeleton';
import { isEmpty } from 'lodash';
import map from 'lodash/map';
import Card from '@mui/material/Card';
import styles from './Search.module.scss';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import { MovieType } from '../../types/moviesTypes';
import Alert from '@mui/material/Alert';

type ResultsListProps = {
  loading: boolean;
  error: string | null;
  searchResults?: MovieType[];
};

const ResultsList: FC<ResultsListProps> = ({ loading, searchResults, error }) => {
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

  if (!loading && isEmpty(searchResults)) {
    return (
      <div>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <Grid container spacing={3}>
      {map(searchResults, (item, index) => {
        return (
          <Grid key={`movie-card-${index}`} item xs={6} sm={4}>
            <Card sx={{ maxWidth: 300 }} className={styles.card}>
              <CardMedia
                component="img"
                image={item.Poster}
                alt={item.Title}
                className={styles.cardImage}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" className={styles.cardTitle}>
                  {item.Title}
                </Typography>
              </CardContent>
              <CardActions>
                <Link className={styles.cardLink} to={`/movie/${item.imdbID}`}>
                  Detail
                </Link>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ResultsList;
