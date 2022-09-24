import WidgetList from './WidgetList';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import { Droppable } from 'react-beautiful-dnd';

const Column = ({ data, droppableId, lastTitleElementRef, title }: any) => {
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
            <WidgetList data={data} lastTitleElementRef={lastTitleElementRef} droppableId={droppableId}/>
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </>
  );
};

export default Column;
