import React, { createContext, useEffect, useReducer, useState } from 'react';
import { baseUrl, options } from '../constans';
import useFetch from '../hooks/useFetch';

export type TitlesContextType = {
  titles: any[];
  nextUrl: string | null;
  search: (title: string) => void;
  fetchNextPage: () => void;
  updateTiltes: (titels: any[]) => void;
};

export const TitlesContext = createContext<TitlesContextType>({
  titles: [],
  nextUrl: null,
  search: () => {},
  fetchNextPage: () => {}, // maybe write here async
  updateTiltes: () => {},
});

export const TitlesProvider = (props: any) => {
  const [titles, setTitles] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const search = async (title: string) => {
    /// check if i can use the useFetch
    const res = await fetch(
      `${baseUrl}/titles/search/title/${title}?info=base_info&limit=10&page=1&genre=Action`,
      options
    );

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
      console.log(titles);
      console.log(data.results);
      console.log([...titles, ...data.results]);
      setNextUrl(() => data.next);
    }
  };

  const updateTiltes = (titels: any[]) => {
    setTitles(titels);
  };

  return (
    <TitlesContext.Provider
      value={{
        titles: titles,
        nextUrl: nextUrl,
        search: search,
        fetchNextPage: fetchNextPage,
        updateTiltes: updateTiltes,
      }}
    >
      {props.children}
    </TitlesContext.Provider>
  );
};
