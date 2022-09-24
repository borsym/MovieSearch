import Widget from './Widget';

const WidgetList = ({
  data,
  lastTitleElementRef,
  droppableId,
  filterFn = () => true,
}: any) => {
  return data?.filter(filterFn).map((element: any, index: any) => {
    if (data.length === index + 1) {
      return (
        <Widget
          element={element}
          index={index}
          key={element.id}
          lastTitleElementRef={lastTitleElementRef}
          droppableId={droppableId}
        />
      );
    }
    return (
      <Widget
        element={element}
        index={index}
        key={element.id}
        droppableId={droppableId}
      />
    );
  });
};

export default WidgetList;
