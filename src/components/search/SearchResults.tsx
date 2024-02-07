import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PaginationComponent from '../pagination/Pagination';
import ResultsList from './ResultsList';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';

const SearchResults: React.FC = () => {
  const searchTerm = useSelector((state: RootState) => state.movies.searchTerm);
  const searchData = useSelector((state: RootState) => state.movies);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const error = useSelector((state: RootState) => state.movies.error);

  let totalPages = 0;
  let searchResults;
  const defaultPerPage = process.env.REACT_APP_DEFAULT_PER_PAGE
    ? Number(process.env.REACT_APP_DEFAULT_PER_PAGE)
    : 10;

  if (searchData?.movies?.Search && searchData?.movies?.Search?.length > 0) {
    searchResults = searchData.movies.Search;
  }
  if (searchData.movies.totalResults) {
    totalPages = Math.ceil(Number(searchData.movies.totalResults) / defaultPerPage);
  }

  if (isEmpty(searchTerm)) {
    return (
      <div>
        <Typography gutterBottom variant="h2" component="div">
          Search for some movies
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography gutterBottom variant="h2" component="div">
        Searched film: {searchTerm}
      </Typography>
      <ResultsList loading={loading} searchResults={searchResults} error={error} />
      {totalPages > 0 ? <PaginationComponent totalPages={totalPages} /> : ''}
    </div>
  );
};

export default SearchResults;
