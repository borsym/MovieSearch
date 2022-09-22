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

const WidgetList = (data: any) => {
  return data?.results?.map((element: any, index: any) => (
    <Widget element={element} index={index} key={element.id} />
  ));
};

const Home: NextPage = () => {
  const [inputVal, setInputVal] = useState('');
  const text = 'Action';
  const { genres } = useContext(GenresContext) as GenreContextType;
  // quary parameterekre ra kell jonni
  let urlSearch = new URL(
    `https://moviesdatabase.p.rapidapi.com/titles/search/title/${inputVal}?info=base_info&genre=Action`
  );
  const { data, loading, error } = useFetch(urlSearch.toString(), options);

  useEffect(() => {
    // urlSearch.searchParams.append('genre', genres[0]);
  }, [genres]);

  //"next": "/titles/search/title/Spiderman?page=2"  igy kell majd a tobbi adatot betolteni
  const onDragEnd = (result: any) => {
    console.log(result);
    // tehat egy masik box amibe belemegy
  };

  // minden searchnel varok 1mpt ha nincs valtozas akkor hajtodig vegre a search ha van akkor ujra indul a timer
  return (
    <div>
      <p>home</p>
      Read <Link href="/details">this page!</Link>
      <input
        type="text"
        placeholder="Enter the title of the movie"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <GenreReccomendations />
      {loading ? (
        <p>loading...</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="movies">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <WidgetList data={data} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default Home;
