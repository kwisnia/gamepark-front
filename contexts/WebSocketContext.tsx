import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import Notification from "../components/common/Notification";
import useLoggedInUser from "../hooks/useLoggedInUser";

interface Props {
  children: React.ReactNode;
}

export const WebSocketContext = createContext<WebSocket | null | undefined>(
  undefined
);

export const WebSocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const toast = useToast();
  const { user } = useLoggedInUser();

  useEffect(() => {
    if (!window || !user) {
      return;
    }
    const authToken = localStorage.getItem("gaming-token");
    const newSocket = new WebSocket(
      `ws://localhost:8080/ws?authorization=${encodeURIComponent(
        "Bearer " + authToken
      )}`
    );
    newSocket.onopen = () => {
      console.log("Connected to websocket");
      toast({
        title: "Connected to websocket",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    };
    newSocket.addEventListener("message", (e) => {
      console.log(e);
      const data = JSON.parse(e.data);
      if (data.messageType === "chatMessage") {
        toast({
          render: () => (
            <Notification
              title={`New message from ${data.sender.displayName}`}
              message={data.content}
              image={data.sender.avatar}
            />
          ),
        });
        const audio = new Audio("/kkondae.mp3");
        audio.play();
      }
    });
    newSocket.onclose = () => {
      console.log("Disconnected from websocket");
    };

    newSocket.onerror = (e) => {
      console.log(e);
      toast({
        title: "Error",
        description:
          "An error occurred while establishing connection to the server",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    };
    setSocket(newSocket);
  }, [toast, user]);

  useEffect(() => {
    return () => {
      if (socket) {
        console.log("Closing socket");
        socket.close();
      }
    };
  }, [socket]);

  return (
    <WebSocketContext.Provider value={socket}>
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
