import { Draggable } from 'react-beautiful-dnd';
import MediaCard from '../common/MediaCard';
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
            {/* <MediaCard
              key={props.element.id}
              title={props.element?.titleText.text}
              data={props.element}
            /> */}
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
