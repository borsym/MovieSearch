import Widget from "./Widget";

const WidgetList = ({ data }: any) => {
  return data?.map((element: any, index: any) => (
    <Widget element={element} index={index} key={element.id} />
  ));
};

export default WidgetList;