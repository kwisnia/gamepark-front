import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import invariant from "tiny-invariant";
import Notification from "../components/common/Notification";
import useLoggedInUser from "../hooks/useLoggedInUser";
import {
  isChatMessage,
  isNewAchievement,
  SocketMessage,
} from "../types/socket";

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
  const router = useRouter();

  const socketMessageHandler = useCallback(
    (event: MessageEvent<string>) => {
      console.log(event);
      const data: SocketMessage = JSON.parse(event.data);
      if (isChatMessage(data) && router.pathname !== "/chat") {
        toast({
          render: () => (
            <Notification
              title={`New message from ${data.sender.displayName}`}
              message={data.content}
              image={data.sender.avatar ?? ""}
            />
          ),
        });
        const audio = new Audio("/kkondae.mp3");
        audio.play();
      } else if (isNewAchievement(data)) {
        toast({
          render: () => (
            <Notification
              title={`New achievement unlocked!`}
              message={`${data.title} +${data.score} points`}
              image={data.badge}
            />
          ),
        });
        const audio = new Audio("/new-achievement-ding.mp3");
        audio.volume = 0.2;
        audio.play();
      }
    },
    [router.pathname, toast]
  );

  useEffect(() => {
    if (!window || !user) {
      return;
    }
    console.log("New socket time");
    const authToken = localStorage.getItem("gaming-token");
    const newSocket = new WebSocket(
      `ws://localhost:8080/ws?authorization=${encodeURIComponent(
        "Bearer " + authToken
      )}`
    );
    newSocket.addEventListener("open", () => {
      console.log("Connected to websocket");
    });
    newSocket.addEventListener("close", () => {
      console.log("Disconnected from websocket");
    });

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

    return () => {
      newSocket.close();
    };
  }, [toast, user]);

  useEffect(() => {
    socket?.addEventListener("message", socketMessageHandler);

    return () => {
      socket?.removeEventListener("message", socketMessageHandler);
    };
  }, [socket, socketMessageHandler]);

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
