import React, { createContext, useState } from 'react';
import { baseUrl, options } from '../constans';
import useFetch from '../hooks/useFetch';
import { TitleProps } from '../types';

export type TitlesContextType = {
  titles: TitleProps[];
  favourites: TitleProps[];
  nextUrl: string | null;
  search: (title: string, genres: string[]) => void;
  fetchNextPage: () => void;
  updateTiltes: (titels: TitleProps[]) => void;
  updateFavourites: (favourites: TitleProps[]) => void;
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
  const [titles, setTitles] = useState<TitleProps[]>([]);
  const [favourites, setFavourites] = useState<TitleProps[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const search = async (title: string, genres: string[]) => {
    if (!title || title.length === 0) return;

    let res;
    // TODO
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
