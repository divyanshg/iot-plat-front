import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_URL } from '@/api';
import Widget from '@/components/widgets';
import useRoom from '@/hooks/useRoom';
import { clickToCopy } from '@/lib/utils';
import { Badge } from '@tremor/react';

import { socket } from '../socket';

type ChartTypes = "LINECHART" | "BARCHART" | "AREACHART";

function Room() {
  const { id } = useParams();
  const { data: room } = useRoom(id!);
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [chartType, setChartType] = useState<ChartTypes>("AREACHART");
  const [chartColor, setChartColor] = useState<string>("blue");

  // const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [chartData, setChartData] = useState<
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
    if (room?.data.properties) {
      setChartData(room?.data.properties);
      //save [property_name: string]: string; to properties
    }
  }, [room?.data.properties]);

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

  const chartWidget = useCallback(
    () => (
      <Widget
        type={chartType}
        title="Occupancy"
        description="Occupancy of the room"
        config={{
          index: "time",
          categories: ["occupants"],
          colors: [chartColor],
        } as never}
        data={chartData}
        id="occupancy"
      />
    ),
    [chartType, chartData, chartColor]
  );

  function changeChartType(cType: ChartTypes) {
    setChartType(cType);
  }

  function changeChartColor(cColor: string) {
    setChartColor(cColor);
  }

  const url = `${API_URL}/rooms/${id}/property/update?name=occupants&value=<VALUE>&key=<API_KEY>`;

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
      <div className="flex flex-col w-full gap-4 mx-auto">
        <span>
          Endpoint:{" "}
          <code
            onClick={() => clickToCopy(url as string)}
            title="Click to copy"
            className="px-2 py-1 bg-gray-200 rounded cursor-pointer active:bg-lime-200 hover:bg-lime-100"
          >
            {url}
          </code>
        </span>
        <span>
          Room Id:{" "}
          <code
            onClick={() => clickToCopy(id as string)}
            title="Click to copy"
            className="px-2 py-1 bg-gray-200 rounded cursor-pointer active:bg-lime-200 hover:bg-lime-100"
          >
            {id}
          </code>
        </span>
        <span className="flex flex-row space-x-2">
          <span>Connection Status: </span>
          <span>
            <div className="flex flex-row space-x-1">
              {isConnected ? (
                <div className="relative flex flex-row">
                  <Badge color={"green"}>Connected</Badge>
                  <span className="relative flex w-3 h-3" title="Connected">
                    <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                    <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span>
                  </span>
                </div>
              ) : (
                <div className="relative flex flex-row">
                  <Badge color="red">Not Connected</Badge>
                  <span className="relative flex w-3 h-3" title="Not connected">
                    <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                    <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
                  </span>
                </div>
              )}
            </div>
          </span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* <Widget
          type="VIDEO"
          title="Live Feed"
          description="Live video feed from the room camera"
          data={{ url: `${MS_API_URL}/${id}.flv` }}
          id="live-feed"
        /> */}
        <span>
          <div className="flex flex-row space-x-3">
            <select
              name="chart-type"
              id="chart-type"
              value={chartType}
              onChange={(e) => changeChartType(e.target.value as ChartTypes)}
            >
              <option value="LINECHART">Line Chart</option>
              <option value="BARCHART">Bar Chart</option>
              <option value="AREACHART">Area Chart</option>
            </select>
            <select
              name="chart-color"
              id="chart-color"
              value={chartColor}
              onChange={(e) => changeChartColor(e.target.value as ChartTypes)}
            >
              <option value="lime">Lime</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="orange">Orange</option>
            </select>
          </div>
          {chartWidget()}
        </span>
      </div>
    </main>
  );
}

export default Room;
