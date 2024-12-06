import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url = "http://localhost:6001") => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(url, {
      reconnection: true, // Enable reconnection
    });

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return socket;
};

export default useSocket;
