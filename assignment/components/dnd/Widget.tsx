import { Draggable } from 'react-beautiful-dnd';

import TheNewMediaCard from '../common/TheNewMediaCard';

const Widget = (props: any) => {
  return (
    <Draggable draggableId={props.element.id} index={props.index}>
      {(provided) => (
        <div ref={props.lastTitleElementRef}>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TheNewMediaCard
              key={props.element.id}
              title={props.element?.titleText.text}
              data={props.element}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Widget;
