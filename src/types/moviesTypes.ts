export type MovieTypesType = {
  Type: 'movie' | 'series' | 'episode' | '' | string;
};

export type MovieType = {
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
  Poster: string;
};

export type MovieSearchType = {
  Search?: MovieType[];
  totalResults?: string;
  Resposne?: string;
  Error?: string;
};
