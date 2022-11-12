import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import type { ChatMessage } from "../../types/chat";
import type { UserDetails } from "../../types/user";

interface MessageProps {
  message: ChatMessage;
  loggedInUser?: UserDetails;
}

const Message = ({ message, loggedInUser }: MessageProps) => {
  const replaceUrlWithImage = (message: string) => {
    const regex = /((http|https):\/\/.*\.(?:png|jpg|gif|jpeg))/g;
    if (message.match(regex)) {
      return (
        <Image
          src={message}
          alt="Message image"
          width={300}
          height={300}
          priority
        />
      );
    } else {
      return <Text>{message}</Text>;
    }
  };

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
      {replaceUrlWithImage(message.content)}
    </Box>
  );
};

export default Message;
