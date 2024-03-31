import { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import { Link, useParams } from 'react-router-dom';

// import { MS_API_URL } from '../api';
import AddWidgetDrawer from '../components/AddWidgetDrawer';
import { Button } from '../components/ui/button';
import Widget, { WidgetConfig } from '../components/widgets';
import useRoom from '../hooks/useRoom';
import { socket } from '../socket';

type Layout = {
  w: number;
  h: number;
  x: number;
  y: number;
  i: string;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  moved: boolean;
  static: boolean;
}[];

function Dashboard() {
  const { id } = useParams();
  const { data: room } = useRoom(id!);
  const [_layout, setLayout] = useState<Layout[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [, setIsConnected] = useState(socket.connected);

  const [, setChartData] = useState<
    {
      time: string;
      [propertyName: string]: string;
    }[]
  >([]);

  useEffect(() => {
    socket.connect();
    socket.emit("join", id);
    return () => {
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onDataEvent(value: {
      time: string;
      [property_name: string]: string;
    }) {
      console.log(value);
      setChartData((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("data", onDataEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("data", onDataEvent);
    };
  }, []);

  useEffect(() => {
    if (room?.data.properties) {
      setChartData(room?.data.properties);
      //save [property_name: string]: string; to properties
    }
  }, [room?.data.properties]);
  const layout = [
    {
      w: 4,
      h: 9,
      x: 0,
      y: 0,
      i: "a",
      moved: false,
      static: false,
    },
    {
      w: 4,
      h: 11.5,
      x: 8,
      y: 11.5,
      i: "b",
      minW: 4,
      maxW: 8,
      minH: 11.5,
      maxH: 11.5,
      moved: false,
      static: false,
    },
    {
      w: 8,
      h: 11.5,
      x: 4,
      y: 0,
      i: "c",
      minW: 4,
      maxW: 8,
      minH: 11.5,
      maxH: 11.5,
      moved: false,
      static: false,
    },
    {
      w: 4,
      h: 11.5,
      x: 4,
      y: 11.5,
      i: "d",
      minW: 4,
      maxW: 8,
      minH: 11.5,
      maxH: 11.5,
      moved: false,
      static: false,
    },
  ];

  const widgets: WidgetConfig[] = [
    // {
    //   id: "a",
    //   type: "VIDEO",
    //   title: "Live Feed",
    //   description: "Live video feed from the room camera",
    //   data: {
    //     url: `${MS_API_URL}/${id}.flv`,
    //   },
    // },
    {
      id: "b",
      type: "LINECHART",
      title: "Occupancy",
      description: "Occupancy of the room",
      data: [],
      config: {
        topic: "af14/temperature",
        index: "time",
        categories: ["occupants"],
        colors: ["lime"],
      },
    },
    {
      id: "c",
      type: "BARCHART",
      title: "Occupancy",
      description: "Occupancy of the room",
      data: [],
      config: {
        topic: "af14/temperature",
        index: "time",
        categories: ["occupants"],
        colors: ["lime"],
      },
    },
    {
      id: "d",
      type: "AREACHART",
      title: "Occupancy",
      description: "Occupancy of the room",
      data: [],
      config: {
        topic: "af14/temperature",
        index: "time",
        categories: ["occupants"],
        colors: ["red"],
      },
    },
  ];

  function handleLayoutChange(layout: Layout[]) {
    setLayout(layout);
  }

  function handleEdit() {
    setIsEditing((previous) => !previous);
  }

  function saveLayout() {
    console.log(_layout);
  }

  return (
    <>
      <div className="flex items-center w-full h-12 px-12 py-4 bg-gray-100 border-b border-gray-100 shadow">
        <div className="flex flex-row space-x-4">
          <Button onClick={saveLayout}>Save</Button>
          <Link to="properties">
            <Button>Properties</Button>
          </Link>
          <AddWidgetDrawer />
          <Button onClick={handleEdit}>{isEditing ? "Cancel" : "Edit"}</Button>
        </div>
      </div>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 py-2 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <GridLayout
          className="layout"
          layout={layout}
          isDraggable={isEditing}
          isResizable={isEditing}
          cols={12}
          rowHeight={30}
          width={1600}
          onLayoutChange={handleLayoutChange as never}
        >
          {widgets.map((widget) => (
            <div key={widget.id}>
              <Widget {...widget} />
            </div>
          ))}
        </GridLayout>
      </main>
    </>
  );
}

export default Dashboard;
