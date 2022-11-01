import { Box, Text } from "@chakra-ui/react";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { ChatMessage } from "../../types/chat";
import { BasicUserDetails, UserDetails } from "../../types/user";

interface MessageProps {
  message: ChatMessage;
  user: BasicUserDetails;
  loggedInUser?: UserDetails;
}

const Message = ({ message, user, loggedInUser }: MessageProps) => {
  return (
    <Box
      bg={message.senderID === loggedInUser?.id ? "blue.500" : "gray.500"}
      color="white"
      p={2}
      borderRadius="md"
      alignSelf={
        message.senderID === loggedInUser?.id ? "flex-end" : "flex-start"
      }
      mt={2}
    >
      <Text>{message.content}</Text>
    </Box>
  );
};

export default Message;
