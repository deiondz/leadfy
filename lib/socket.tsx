import { io } from "socket.io-client";

let socket: any;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      transports: ["websocket"],
      reconnection: true,
    });
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }
  return socket;
};
