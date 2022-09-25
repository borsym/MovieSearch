import React from 'react';
import { TitleProps } from '../../types';
import Widget from './Widget';

interface Props {
  data: TitleProps[];
  droppableId: string;
  lastTitleElementRef: () => {};
  filterFn?: () => {};
}

const WidgetList: React.FC<Props> = ({
  data,
  lastTitleElementRef,
  droppableId,
  filterFn = () => true,
}) => {
  return (
    <>
      {data?.filter(filterFn).map((element: any, index: number) => {
        if (data.length === index + 1) {
          return (
            <Widget
              element={element}
              index={index}
              lastTitleElementRef={lastTitleElementRef}
              droppableId={droppableId}
              key={element.id}
            />
          );
        }
        return (
          <Widget
            element={element}
            index={index}
            droppableId={droppableId}
            key={element.id}
          />
        );
      })}
    </>
  );
};

export default WidgetList;
