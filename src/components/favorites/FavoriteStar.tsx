import React, { SyntheticEvent, useState } from 'react';
import { IconButton, SnackbarCloseReason } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Snackbar from '@mui/material/Snackbar';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/moviesSlice';
import { RootState } from '../../redux/store';
import styles from './Favorites.module.scss';

type FavoriteStarProps = {
  movieId: string;
};

const FavoriteStar: React.FC<FavoriteStarProps> = ({ movieId }) => {
  const dispatch = useDispatch();
  const favoriteMovieIds = useSelector((state: RootState) => state.movies.favoriteMovieIds);
  const isFavorite = favoriteMovieIds.includes(movieId);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movieId));
      setSnackbarMessage('Removed from favorites');
    } else {
      dispatch(addToFavorites(movieId));
      setSnackbarMessage('Added to favorites');
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      setSnackbarOpen(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleFavoriteClick}
        aria-label="add to favorites"
        className={styles.btn}
      >
        {isFavorite ? (
          <StarIcon fontSize={'large'} sx={{ color: '#fbc02d' }} />
        ) : (
          <StarBorderIcon fontSize={'large'} sx={{ color: '#fbc02d' }} />
        )}
      </IconButton>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </>
  );
};

export default FavoriteStar;
