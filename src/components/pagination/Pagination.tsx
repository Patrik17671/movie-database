import { useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import styles from './Pagination.module.scss';

type PaginationProps = {
  totalPages?: number;
};
const PaginationComponent: FC<PaginationProps> = ({ totalPages }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = Number(searchParams.get('page')) || 1;

  //Create Link for pagination item
  const createPaginationHref = (targetPage: number | null) => {
    if (!targetPage) {
      return '';
    }
    if (targetPage === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', targetPage.toString());
    }
    return `${location.pathname}?${searchParams.toString()}`;
  };

  return (
    <div className={styles.wrapper}>
      <Pagination
        page={currentPage}
        count={totalPages}
        renderItem={item => (
          <PaginationItem
            key={item.page}
            component={Link}
            to={createPaginationHref(item.page)}
            {...item}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          />
        )}
      />
    </div>
  );
};
export default PaginationComponent;
