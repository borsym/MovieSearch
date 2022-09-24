import { Grid } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

const DnD = (props: any) => {
  return (
    <DragDropContext onDragEnd={props.onDragEnd}>
      <Grid
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid container spacing={3}>
          <Grid item container xs={6} alignContent="baseline">
            <Grid
              item
              xs={12}
              style={{
                backgroundColor: 'yellow',
              }}
            >
              <Column data={props.titles} droppableId="movies" lastTitleElementRef={props.lastTitleElementRef}/>
            </Grid>
          </Grid>
          <Grid item container xs={6}>
            <Grid
              item
              xs={12}
              style={{
                backgroundColor: 'red',
              }}
            >
              <Column data={props.favourites} droppableId="favourite" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default DnD;
