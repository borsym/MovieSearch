import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Result } from '../../types';

import TheNewMediaCard from '../common/TheNewMediaCard';

interface Props {
  element: Result;
  index: number;
  droppableId: string;
  lastTitleElementRef?: () => {};
}

const Widget: React.FC<Props> = ({
  element,
  index,
  droppableId,
  lastTitleElementRef,
}) => {
  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <div ref={lastTitleElementRef} style={{ padding: 8 }}>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TheNewMediaCard
              droppableId={droppableId}
              key={element.id}
              data={element}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Widget;
