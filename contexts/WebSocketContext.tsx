import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useRef } from "react";
import invariant from "tiny-invariant";
import useLoggedInUser from "../hooks/useLoggedInUser";

interface Props {
  children: React.ReactNode;
}

export const WebSocketContext = createContext<WebSocket | null | undefined>(
  undefined
);

export const WebSocketProvider = ({ children }: Props) => {
  const socket = useRef<WebSocket | null>(null);
  const toast = useToast();
  const { user, loggedOut } = useLoggedInUser();

  useEffect(() => {
    if (!window) {
      return;
    }
    if (!loggedOut) {
      socket.current = new WebSocket("ws://localhost:4000");
      socket.current.onopen = () => {
        console.log("Connected to websocket");
      };
      socket.current.onclose = () => {
        console.log("Disconnected from websocket");
        console.log(user?.id);
      };
      socket.current.onerror = () => {
        toast({
          title: "Error",
          description:
            "An error occurred while establishing connection to the server",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      };
    }

    const socketInstance = socket.current;
    return () => {
      socketInstance?.close();
    };
  }, [toast, loggedOut, user]);

  return (
    <WebSocketContext.Provider value={socket.current}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  invariant(
    context !== undefined,
    "useWebSocket must be used within WebSocketProvider"
  );
  return context;
};
