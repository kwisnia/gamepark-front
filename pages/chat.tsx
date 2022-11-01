import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsArrowReturnLeft } from "react-icons/bs";
import ChatWindow from "../components/chat/ChatWindow";
import { useWebSocket } from "../contexts/WebSocketContext";
import useLoggedInUser from "../hooks/useLoggedInUser";

const ChatPage = () => {
  const socket = useWebSocket();
  const { isInitialized, user, loggedOut } = useLoggedInUser();
  const router = useRouter();

  if (!user && isInitialized) {
    router.replace("/");
    return;
  }

  return (
    <Container maxW="container.xl" mt={10} height="2xl">
      <BsArrowReturnLeft
        onClick={() => router.back()}
        style={{ cursor: "pointer" }}
      />
      <ChatWindow />
    </Container>
  );
};

export default ChatPage;
