import React, { FC, useEffect, useState } from 'react';
import { RootState, AppDispatch } from '../../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, setSearchTerm } from '../../redux/moviesSlice';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import styles from './Search.module.scss';
import { isEmpty } from 'lodash';
const Search: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.movies.loading);
  const [inputValue, setInputValue] = useState('');
  const [year, setYear] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [page, setPage] = useState<string>('');
  const [isSearchTermValid, setIsSearchTermValid] = useState<boolean>(true);
  const [isYearValid, setIsYearValid] = useState<boolean>(true);

  //Load search params from url
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('s') || '';
    const year = queryParams.get('y') || '';
    const type = queryParams.get('type') || '';
    const page = queryParams.get('page') || '';

    const inputValue = search;

    setInputValue(decodeURIComponent(search));
    setYear(year);
    setType(type);
    setPage(page);
    if (!isEmpty(inputValue)) {
      dispatch(setSearchTerm(inputValue));
      dispatch(fetchMovies({ inputValue, year, type, page }));
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsSearchTermValid(true);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
    setIsYearValid(!e.target.value || e.target.value.length === 4);
  };

  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (inputValue) queryParams.set('s', inputValue);
    if (year) queryParams.set('y', year);
    if (type) queryParams.set('type', type);

    //Validation
    const searchTermValid = !!inputValue.trim();
    const yearValid = !year || year.length === 4;
    setIsSearchTermValid(searchTermValid);
    setIsYearValid(yearValid);

    if (!isSearchTermValid || !isYearValid) {
      return;
    }

    //Fetch data
    navigate(`?${queryParams.toString()}`);
    dispatch(fetchMovies({ inputValue, year, type, page }));
    dispatch(setSearchTerm(inputValue));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formWrap}>
        <TextField
          label="Search for..."
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          error={!isSearchTermValid}
          helperText={!isSearchTermValid ? 'This field is required!' : ''}
        />
        <TextField
          label="Year"
          variant="outlined"
          value={year}
          onChange={handleYearChange}
          error={!isYearValid}
          helperText={!isYearValid ? 'The year must contain 4 digits' : ''}
        />
        <FormControl variant="outlined" className={styles.type}>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={handleTypeChange} label="Type">
            <MenuItem value={''}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="movie">Film</MenuItem>
            <MenuItem value="series">Serial</MenuItem>
            <MenuItem value="episode">Episode</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" className={styles.btn}>
          {loading ? 'Loading...' : 'Search'}
        </Button>
      </form>
    </div>
  );
};

export default Search;
