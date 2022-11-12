import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ChatWindow from "../components/chat/ChatWindow";
import useLoggedInUser from "../hooks/useLoggedInUser";

const ChatPage = () => {
  const { isInitialized, user } = useLoggedInUser();
  const router = useRouter();

  if (!user && isInitialized) {
    router.replace("/");
    return;
  }

  return (
    <Container maxW="100%" maxH="100%" height="2xl">
      <ChatWindow />
    </Container>
  );
};

export default ChatPage;
