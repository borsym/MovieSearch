import React, { createContext, useState } from 'react';
import useFetch from '../hooks/useFetch';

export type GenreContextType = {
  genres: string[];
  addGenre: (genre: string[]) => void;
};

export const GenresContext = createContext<GenreContextType>({
  genres: [],
  addGenre: () => {},
});

export const GenresProvider = (props: any) => {
  const [genres, setGenres] = useState<string[]>([]);

  const addGenre = (genre: string[]) => setGenres(() => genre);

  return (
    <GenresContext.Provider value={{ genres, addGenre }}>
      {props.children}
    </GenresContext.Provider>
  );
};
