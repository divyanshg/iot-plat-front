import { useEffect, useState } from 'react';

import { AreaChart as Ac } from '@tremor/react';

import { Payload, useSocket } from '../../context/Dashboard';

interface AreaChartProps {
  config: {
    topic: string;
    index: string;
    categories: string[];
    colors: string[];
  };
  data:
    | {
        time: string;
        [propertyName: string]: string;
      }[];
}
function AreaChart(props: AreaChartProps) {
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
    <Ac
      data={data}
      index={props.config.index}
      categories={props.config.categories}
      colors={props.config.colors}
      yAxisWidth={30}
      enableLegendSlider={true}
    />
  );
}

export default AreaChart;
