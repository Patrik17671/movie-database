import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { MovieSearchType } from '../types/moviesTypes';

type MoviesState = {
  searchTerm: string;
  movies: MovieSearchType;
  loading: boolean;
  error: string | null;
};

const initialState: MoviesState = {
  searchTerm: '',
  movies: { Search: [], totalResults: '0', Resposne: '', Error: '' },
  loading: false,
  error: null,
};

type FetchMoviesArgs = {
  inputValue: string;
  year?: string;
  type?: string;
  page?: string;
};

//Fetch movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ inputValue, year, type, page }: FetchMoviesArgs, { rejectWithValue }) => {
    try {
      let queryParams = `s=${encodeURIComponent(inputValue)}`;
      if (year) queryParams += `&y=${year}`;
      if (type) queryParams += `&type=${type}`;
      if (page) queryParams += `&page=${page}`;

      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&${queryParams}`,
      );
      const data = await response.json();

      if (data.Response === 'False') {
        throw new Error(data.Error);
      }

      return data;
    } catch (error) {
      const e = error as Error;
      return rejectWithValue(e.message);
    }
  },
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  //Fetching states
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<MovieSearchType>) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm } = moviesSlice.actions;

export default moviesSlice.reducer;
