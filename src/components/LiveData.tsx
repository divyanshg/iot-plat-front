import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSocket } from '../context/Dashboard';

function LiveData() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { widgetData } = useSocket();

  useEffect(() => {
    //widget data format :
    /* 
        {
            "<id>/anything": {
                time: "2021-09-29T07:00:00.000Z",
                value: "20"
            }
        }
    */
    //extracting the data from the widgetData where the id is equal to the id of the device
    const deviceData = Object.entries(widgetData).filter(([key]) =>
      key.includes(id!)
    );

    setData(deviceData.map(([, value]) => value) as never[]);
  }, [id, widgetData]);
  return (
    <div>
      <ul className="flex flex-col space-y-3">
        {data.map((item, i) => (
          <li key={i} className="p-2 border border-gray-100 rounded shadow">
            <pre className="text-blue-400">
              {JSON.stringify(item, null, 2)}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LiveData;
