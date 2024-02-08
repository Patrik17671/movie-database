import styles from './Card.module.scss';
import CardMedia from '@mui/material/CardMedia';
import { getImageSrc } from '../../utils';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import { FC } from 'react';
import { MovieDetailType, MovieType } from '../../types/moviesTypes';
import FavoriteStar from '../favorites/FavoriteStar';

type CardProps = {
  item: MovieType | MovieDetailType;
};
const CardComponent: FC<CardProps> = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 300 }} className={styles.card}>
      <CardMedia
        component="img"
        image={getImageSrc(item.Poster)}
        alt={item.Title}
        className={styles.cardImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className={styles.cardTitle}>
          {item.Title}
          <FavoriteStar movieId={item.imdbID} />
        </Typography>
      </CardContent>
      <CardActions>
        <Link className={styles.cardLink} to={`/movie/${item.imdbID}`}>
          Detail
        </Link>
      </CardActions>
    </Card>
  );
};
export default CardComponent;
