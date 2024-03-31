import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Socket as SocketType } from 'socket.io-client';

import { useAuth } from '../hooks/useAuth';
import { socket } from '../socket';

export type Payload = {
  [propertyName: string]: string;
  time: string;
};
// Define types
interface WidgetData {
  [topic: string]: Payload;
}

interface SocketContextType {
  socket: SocketType | null;
  widgetData: WidgetData;
}

// Create a context
const SocketContext = createContext<SocketContextType>({
  socket: null,
  widgetData: {},
});

// Create a provider component
export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [, setIsConnected] = useState(socket.connected);
  const [widgetData, setWidgetData] = useState<WidgetData>({});

  useEffect(() => {
    socket?.connect();
    socket.emit("join", user?.organizationId);
    return () => {
      socket.disconnect();
    };
  }, [user?.organizationId]);

  useEffect(() => {
    function onConnect() {
      console.log("Connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onDataEvent(data: { topic: string; payload: Payload }) {
      console.log(data);
      setWidgetData((prevData) => {
        const { topic, payload } = data;
        return { ...prevData, [topic]: payload };
      });
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

  return (
    <SocketContext.Provider value={{ socket, widgetData }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => useContext(SocketContext);
