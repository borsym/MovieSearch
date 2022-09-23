import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';

import GenreReccomendations from '../components/GenreReccomendations';
import SearchBar from '../components/SearchBar';
import Column from '../components/dnd/Column';

import { GenreContextType, GenresContext } from '../contexts/GenresContext';
import { TitlesContext, TitlesContextType } from '../contexts/TitlesContext';

import { Box } from '@mui/system';
import { Button, Card, CardActionArea, CardActions, Grid } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Home: NextPage = () => {
  const { genres } = useContext(GenresContext) as GenreContextType;
  const { titles, updateTiltes } = useContext(
    TitlesContext
  ) as TitlesContextType;
  const [favourites, setFavourites] = useState<any[]>([]);

  //"next": "/titles/search/title/Spiderman?page=2"  igy kell majd a tobbi adatot betolteni
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
      <GenreReccomendations />
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item container xs={6} alignContent="baseline">
              <Grid item xs={12} style={{ backgroundColor: 'yellow' }}>
                <Column data={titles} droppableId="movies" />
              </Grid>
            </Grid>
            <Grid item container xs={6}>
              <Grid item xs={12} style={{ backgroundColor: 'red' }}>
                <Column data={favourites} droppableId="favourite" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DragDropContext>
    </>
  );
};

export default Home;
