import { useEffect, useState } from 'react';

import { DonutChart as Dc } from '@tremor/react';

import { Payload, useSocket } from '../../context/Dashboard';

interface DonutProps {
  config: {
    topic: string;
    index: string;
    categories: string;
    colors: string[];
  };
  data:
    | {
        time: string;
        [propertyName: string]: string;
      }[];
}
function DonutChart(props: DonutProps) {
  const { widgetData } = useSocket();
  const [data, setData] = useState<Payload[]>([]);
  const d = widgetData[props.config.topic];
  // const data = d[props.config.categories[0]];

  useEffect(() => {
    if (d === undefined) return;
    setData((prevData) => {
      return [...prevData, d];
    });
    // setData((prevData) => {
    //   // Concatenate the new data with the existing data array
    //   const newDataArray = [...prevData, d];

    //   // If the length exceeds 10, remove the first 10 elements
    //   if (newDataArray.length > 10) {
    //     return newDataArray.slice(newDataArray.length - 10);
    //   } else {
    //     return newDataArray;
    //   }
    // });
  }, [d]);
  return (
    <Dc
      data={data}
      category={props.config.categories}
      index={props.config.index}
      colors={props.config.colors}
    />
  );
}

export default DonutChart;
