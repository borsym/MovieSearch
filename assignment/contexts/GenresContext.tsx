import React, { createContext, useState } from 'react';
import useFetch from '../hooks/useFetch';

export type GenreContextType = {
  genres: string[];
  removeGenre: (genre: string) => void;
  addGenre: (genre: string[]) => void;
};

export const GenresContext = createContext<GenreContextType>({
  genres: [],
  removeGenre: () => {},
  addGenre: () => {},
});

export const GenresProvider = (props: any) => {
  const [genres, setGenres] = useState<string[]>([]);

  const removeGenre = (genre: string) =>
    setGenres((genres) => genres.filter((element) => element !== genre));

  const addGenre = (genre: string[]) => setGenres(() => genre);

  return (
    <GenresContext.Provider value={{ genres, removeGenre, addGenre }}>
      {props.children}
    </GenresContext.Provider>
  );
};
