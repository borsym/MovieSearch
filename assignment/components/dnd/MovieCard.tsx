import React, { useContext } from 'react';
import WidgetList from './WidgetList';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import { Droppable } from 'react-beautiful-dnd';
import { TitleProps } from '../../types';

interface Props {
  data: TitleProps[];
  title: string;
  droppableId: string;
  lastTitleElementRef?: () => {};
}

const MovieCard: React.FC<Props> = ({
  data,
  droppableId,
  lastTitleElementRef,
  title,
}) => {
  // this was my idea to filter for multiple genres but I couldn't solve the fetching...
  // const { genres } = useContext<GenreContextType>(GenresContext);
  // const filterFn = (e: Result) => {
  //   if (genres.length === 0) return true;

  //   const splitGenres = e.genres?.genres.map((genre) => genre.text) ?? [];
  //   return genres.every((genre) => splitGenres.includes(genre));
  // };

  return (
    <>
      <Box>
        <Typography align="center">{title}</Typography>
      </Box>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            bgcolor="primary.main"
            sx={{
              width: 2 / 4,
              border: '2px solid #ccc',
              minHeight: 500,
              margin: 'auto',
              background: snapshot.isDraggingOver ? 'lightblue' : '',
            }}
          >
            <WidgetList
              data={data}
              lastTitleElementRef={lastTitleElementRef}
              droppableId={droppableId}
            />
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </>
  );
};

export default MovieCard;
