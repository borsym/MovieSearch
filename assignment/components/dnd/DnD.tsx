import MovieCard from './MovieCard';

import { Grid } from '@mui/material';

import { DragDropContext } from 'react-beautiful-dnd';

const DnD = (props: any) => {
  return (
    <DragDropContext onDragEnd={props.onDragEnd}>
      <Grid
        item
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid container spacing={3}>
          <Grid item container xs={6} alignContent="baseline">
            <Grid item xs={12}>
              <MovieCard
                data={props.titles}
                droppableId="movies"
                lastTitleElementRef={props.lastTitleElementRef}
                title="Movies"
              />
            </Grid>
          </Grid>
          <Grid item container xs={6}>
            <Grid item xs={12}>
              <MovieCard
                data={props.favourites}
                droppableId="favourite"
                title="Favourites"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default DnD;
