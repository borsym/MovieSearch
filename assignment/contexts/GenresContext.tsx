import React, { createContext, useEffect, useReducer, useState } from 'react';
import { options } from '../constans';
import useFetch from '../hooks/useFetch';

export type GenreContextType = {
  genres: string[]; // ez megadja hogy hany darab genres em van de nem fogom tudni szamon tartani ezzel a kivalasztottakat
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

  // maybe bug can happen;
  const removeGenre = (genre: string) => {
    return setGenres((genres) => genres.filter((element) => element !== genre));
  };
  // maybe bug can happen;
  const addGenre = (genre: string[]) => {
    return setGenres(() => genre);
  };

  return (
    <GenresContext.Provider value={{ genres, removeGenre, addGenre }}>
      {props.children}
    </GenresContext.Provider>
  );
};
