import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import useFetch from '../hooks/useFetch';
import { useContext, useEffect, useState } from 'react';
import { options } from '../constans';
import GenreReccomendations from '../components/GenreReccomendations';
import MultipleSelectChip from '../components/common/MultipleSelectChip';
import { GenreContextType, GenresContext } from '../contexts/GenresContext';
import CostumeCard from '../components/common/MediaCard';
import MediaCard from '../components/common/MediaCard';
import { Button, Card, CardActionArea, CardActions, Grid } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Widget from '../components/dnd/Widget';
import { Box } from '@mui/system';
import SearchBar from '../components/SearchBar';
import { TitlesContext, TitlesContextType } from '../contexts/TitlesContext';

const WidgetList = ({ data }: any) => {
  return data?.map((element: any, index: any) => (
    <Widget element={element} index={index} key={element.id} />
  ));
};

const Column = ({ data, droppableId }: any) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <Box
          {...provided.droppableProps}
          ref={provided.innerRef}
          bgcolor="primary.main"
          sx={{ width: 2 / 4 }}
        >
          <WidgetList data={data} />
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
const Home: NextPage = () => {
  const { genres } = useContext(GenresContext) as GenreContextType;
  const { titles } = useContext(TitlesContext) as TitlesContextType;

  //"next": "/titles/search/title/Spiderman?page=2"  igy kell majd a tobbi adatot betolteni
  const onDragEnd = (result: any) => {
    
    // tehat egy masik box amibe belemegy
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
                <Column droppableId="favourite" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DragDropContext>
    </>
  );
};

export default Home;
