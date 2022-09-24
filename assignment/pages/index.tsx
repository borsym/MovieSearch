import type { NextPage } from 'next';
import { useContext, useRef, useCallback, useState, useEffect } from 'react';

import GenreReccomendations from '../components/GenreReccomendations';
import SearchBar from '../components/SearchBar';
import DnD from '../components/dnd/DnD';

import { TitlesContext, TitlesContextType } from '../contexts/TitlesContext';

import { KeyboardArrowUp } from '@mui/icons-material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Box, Zoom, Fab } from '@mui/material';
import ScrollToTop from '../components/common/ScrollToTop';
import Toolbar from '@mui/material/Toolbar';

const Home: NextPage = (props) => {
  const {
    titles,
    nextUrl,
    favourites,
    updateTiltes,
    fetchNextPage,
    updateFavourites,
  } = useContext<TitlesContextType>(TitlesContext);

  const [isBrowser, setIsBrowser] = useState(false); // next + r-beut-dnd not compatible with dnd https://github.com/atlassian/react-beautiful-dnd/issues/2175
  const observer = useRef<any>();

  useEffect(() => {
    setIsBrowser(process.browser);
  }, []);

  const lastTitleElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextUrl !== null) {
          // on the page somewhere and we can see - entires length always 1
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [nextUrl] // loading?
  );

  // make a more cleaner code!
  const onDragEnd = (result: any) => {
    // this has to be more generic, maybe a new file where I store the data as a json where the columns has ID
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

        updateFavourites(items);
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
      updateFavourites(copiedFinish);
    } else {
      updateTiltes(copiedFinish);
      updateFavourites(copiedStart);
    }
  };

  return (
    <>
      <SearchBar id="back-to-top-anchor" />
      <GenreReccomendations />
      {isBrowser ? (
        <DnD
          titles={titles}
          favourites={favourites}
          onDragEnd={onDragEnd}
          lastTitleElementRef={lastTitleElementRef}
        />
      ) : null}
      <ScrollToTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollToTop>
    </>
  );
};

export default Home;
