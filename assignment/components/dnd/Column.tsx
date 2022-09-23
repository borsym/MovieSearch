import WidgetList from './WidgetList';

import { Box } from '@mui/system';
import { Droppable } from 'react-beautiful-dnd';

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

export default Column;
