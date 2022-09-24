import React, {
  createContext,
  useEffect,
  useReducer,
  useState,
  useContext,
} from 'react';
import { baseUrl, options } from '../constans';
import useFetch from '../hooks/useFetch';
import { GenreContextType, GenresContext } from './GenresContext';

export type TitlesContextType = {
  titles: any[];
  favourites: any[];
  nextUrl: string | null;
  search: (title: string, genres: string[]) => void;
  fetchNextPage: () => void;
  updateTiltes: (titels: any[]) => void;
  updateFavourites: (favourites: any[]) => void;
};

export const TitlesContext = createContext<TitlesContextType>({
  titles: [],
  favourites: [],
  nextUrl: null,
  search: () => {},
  fetchNextPage: () => {},
  updateTiltes: () => {},
  updateFavourites: () => {},
});

export const TitlesProvider = (props: any) => {
  const [titles, setTitles] = useState<any[]>([]);
  const [favourites, setFavourites] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const search = async (title: string, genres: string[]) => {
    /// check if i can use the useFetch
    let res;
    if (genres.length !== 0) {
      res = await fetch(
        `${baseUrl}/titles/search/title/${title}?info=base_info&limit=10&page=1&genre=${genres[0]}`,
        options
      );
    } else {
      res = await fetch(
        `${baseUrl}/titles/search/title/${title}?info=base_info&limit=10&page=1`,
        options
      );
    }

    if (res?.ok) {
      const data = await res.json();
      setTitles(data.results);
      setNextUrl(data.next);
    }
  };

  const fetchNextPage = async () => {
    if (!nextUrl) return;
    const res = await fetch(`${baseUrl}/${nextUrl}`, options);

    if (res?.ok) {
      const data = await res.json();
      setTitles(() => [...titles, ...data.results]);
      setNextUrl(() => data.next);
    }
  };

  const updateTiltes = (titels: any[]) => setTitles(titels);
  const updateFavourites = (favourites: any[]) => setFavourites(favourites);

  return (
    <TitlesContext.Provider
      value={{
        titles: titles,
        favourites: favourites,
        nextUrl: nextUrl,
        search: search,
        fetchNextPage: fetchNextPage,
        updateTiltes: updateTiltes,
        updateFavourites: updateFavourites,
      }}
    >
      {props.children}
    </TitlesContext.Provider>
  );
};
