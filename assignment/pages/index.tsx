import type { NextPage } from 'next';
import { useContext, useEffect, useState, useRef, useCallback } from 'react';

import GenreReccomendations from '../components/GenreReccomendations';
import SearchBar from '../components/SearchBar';
import Column from '../components/dnd/Column';

import { GenreContextType, GenresContext } from '../contexts/GenresContext';
import { TitlesContext, TitlesContextType } from '../contexts/TitlesContext';
import DnD from '../components/dnd/DnD';
import { Button } from '@mui/material';

const Home: NextPage = () => {
  const { genres } = useContext(GenresContext) as GenreContextType;
  const { titles, updateTiltes, fetchNextPage, nextUrl } = useContext(
    TitlesContext
  ) as TitlesContextType;
  const [favourites, setFavourites] = useState<any[]>([]);
  const observer = useRef<any>();
  // We do not have to check the last element is moved to the fav col
  const lastTitleElementRef = useCallback(
    (node: any) => {
      // if(loading) return; ? 
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextUrl !== null) { // on the page somewhere and we can see - entires length always 1
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [nextUrl] // loading?
  );

  console.log('nextURL', nextUrl);
  // make a more cleaner code!
  const onDragEnd = (result: any) => {
    // this has to be more generic, maybe a new file where I store the data as a json where the columns has ID
    console.log(result);
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = source.droppableId === 'movies' ? titles : favourites;
    const finish = destination.droppableId === 'movies' ? titles : favourites;

    if (start === finish) {
      if (source.droppableId === 'movies') {
        const items = Array.from(titles);
        const [reOrderdTitels] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reOrderdTitels);
        updateTiltes(items);
        return;
      } else {
        const items = Array.from(favourites);
        const [reOrderdTitels] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reOrderdTitels);

        setFavourites(items);
        return;
      }
    }

    // Moving from one list to another
    const copiedStart = Array.from(start);
    const copiedFinish = Array.from(finish);
    const move = copiedStart.find((x) => x.id === draggableId);

    copiedStart.splice(source.index, 1);
    copiedFinish.splice(destination.index, 0, move);

    if (source.droppableId === 'movies') {
      updateTiltes(copiedStart);
      setFavourites(copiedFinish);
    } else {
      updateTiltes(copiedFinish);
      setFavourites(copiedStart);
    }
  };


  // minden searchnel varok 1mpt ha nincs valtozas akkor hajtodig vegre a search ha van akkor ujra indul a timer
  return (
    <>
      <SearchBar />
      <Button onClick={() => fetchNextPage()}>fetch</Button>
      <GenreReccomendations />
      <DnD
        titles={titles}
        favourites={favourites}
        onDragEnd={onDragEnd}
        lastTitleElementRef={lastTitleElementRef}
      />
    </>
  );
};

export default Home;
