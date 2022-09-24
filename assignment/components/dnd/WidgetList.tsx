import Widget from './Widget';

const WidgetList = ({ data, lastTitleElementRef }: any) => {
  return data?.map((element: any, index: any) => {
    if (data.length === index + 1) {
      return (
        <Widget
          element={element}
          index={index}
          key={element.id}
          lastTitleElementRef={lastTitleElementRef}
        />
      );
    }
    return <Widget element={element} index={index} key={element.id} />;
  });
};

export default WidgetList;
