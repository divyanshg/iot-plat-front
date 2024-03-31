import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import LineChart from './LineChart';
import Video from './Video';

export type WidgetConfig = {
  id: string;
  title?: string;
  description?: string;
} & (
  | {
      type: "VIDEO";
      config: {
        deviceId: string;
      };
      data: {
        url: string;
      };
    }
  | {
      type: "LINECHART" | "BARCHART" | "AREACHART";
      config: {
        topic: string;
        index: string;
        categories: string[];
        colors: string[];
      };
      data: {
        time: string;
        [propertyName: string]: string;
      }[];
    }
  | {
      type: "DONUTCHART";
      config: {
        topic: string;
        index: string;
        categories: string;
        colors: string[];
      };
      data: {
        time: string;
        [propertyName: string]: string;
      }[];
    }
  | {
      type: "TEXT";
      config: {
        topic: string;
        category: string;
      };
      data: {
        text: string;
      };
    }
);
function Widget(props: WidgetConfig) {
  let widget = null;
  switch (props.type) {
    case "VIDEO":
      widget = <Video {...props} />;
      break;
    case "LINECHART":
      widget = <LineChart {...props} />;
      break;
    case "BARCHART":
      widget = <BarChart {...props} />;
      break;
    case "AREACHART":
      widget = <AreaChart {...props} />;
      break;
    case "DONUTCHART":
      widget = <DonutChart {...props} />;
      break;
    default:
      return null;
  }

  return (
    <div key={props.id} className="w-full h-full">
      <Card>
        {props.title && (
          <CardHeader>
            <CardTitle>{props.title}</CardTitle>
            {props.description && (
              <CardDescription>{props.description}</CardDescription>
            )}
          </CardHeader>
        )}
        <CardContent>{widget}</CardContent>
        <CardFooter>
          <CardDescription>
            {props.type === "AREACHART" ||
              props.type === "BARCHART" ||
              props.type === "LINECHART" ||
              (props.type === "DONUTCHART" && props.config.topic)}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Widget;
