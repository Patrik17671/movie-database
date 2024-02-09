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

export type Rating = {
  Source: string;
  Value: string;
};

export type MovieDetailType = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
};

export type MovieDetailParametersType = {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Writer: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Error?: string;
};
