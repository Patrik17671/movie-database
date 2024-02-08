import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Badge, Link, Box } from '@mui/material';
const Header = () => {
  const favoriteMovieIds = useSelector((state: RootState) => state.movies.favoriteMovieIds);
  const favoritesCount = favoriteMovieIds.length;

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Box className={'container ' + styles.nav}>
          <Link component={RouterLink} to="/">
            Home
          </Link>
          <Badge
            badgeContent={favoritesCount}
            sx={{ '.MuiBadge-badge': { backgroundColor: '#242424', color: '#fff' } }}
          >
            <Link component={RouterLink} to="/favorites">
              Favorites
            </Link>
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
