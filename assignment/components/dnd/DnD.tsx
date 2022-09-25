import MovieCard from './MovieCard';

import { Grid } from '@mui/material';

import { DragDropContext } from 'react-beautiful-dnd';
import { TitleProps } from '../../types';

interface Props {
  titles: TitleProps[];
  favourites: TitleProps[];
  onDragEnd: () => {};
  lastTitleElementRef: () => {};
}
const DnD: React.FC<Props> = ({
  titles,
  favourites,
  onDragEnd,
  lastTitleElementRef,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid
        item
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid container spacing={3}>
          <Grid item container xs={6} alignContent="baseline">
            <Grid item xs={12} data-cy="movies-block">
              <MovieCard
                data={titles}
                droppableId="movies"
                lastTitleElementRef={lastTitleElementRef}
                title="Movies"
              />
            </Grid>
          </Grid>
          <Grid item container xs={6}>
            <Grid item xs={12}>
              <MovieCard
                data={favourites}
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
