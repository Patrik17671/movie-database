import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={'container'}>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
