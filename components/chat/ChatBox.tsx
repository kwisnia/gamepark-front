import {
  Avatar,
  Box,
  Flex,
  Input,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useWebSocket } from "../../contexts/WebSocketContext";
import useChatHistory from "../../hooks/useChatHistory";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import type { BasicUserDetails } from "../../types/user";
import { uploadImage } from "../../utils/ImageUtils";
import Message from "./Message";
import Notification from "../common/Notification";
import { useSpinDelay } from "spin-delay";

interface ChatBoxProps {
  user: BasicUserDetails;
}

const ChatBox = ({ user }: ChatBoxProps) => {
  const { socket, soundEnabled } = useWebSocket();
  const { messages, mutate, fetchNextPage, isLoading } = useChatHistory(
    user.username
  );
  const { ref, inView } = useInView();
  const { user: loggedInUser } = useLoggedInUser();
  const toast = useToast();
  const shouldRenderSkeleton = useSpinDelay(isLoading);
  const messagesFlat = messages?.flat() ?? [];

  const messageNodes =
    messagesFlat.length > 0 ? (
      <>
        {messagesFlat.map((message) => (
          <Message
            key={message.id}
            message={message}
            loggedInUser={loggedInUser}
          />
        ))}
        <Box ref={ref} height={1} />
      </>
    ) : (
      <Stack>
        <Avatar src={user.avatar ?? ""} mx="auto" size="2xl" mt={2} mb={2} />
        <Text align="center">
          This is the beginning of your chat with {user.displayName}
        </Text>
      </Stack>
    );

  const socketMessageHandler = useCallback(
    (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (
        data.messageType === "chatMessage" ||
        data.messageType === "successfulMessageSend"
      ) {
        if (data.messageType === "chatMessage" && data.sender.id !== user.id) {
          toast({
            render: () => (
              <Notification
                title={`New message from ${data.sender.displayName}`}
                message={data.content}
                image={data.sender.avatar}
              />
            ),
          });
          if (soundEnabled) {
            const audio = new Audio("/message-ding.mp3");
            audio.volume = 0.5;
            audio.play();
          }
        }
        mutate();
      }
    },
    [mutate, toast, user.id, soundEnabled]
  );

  useEffect(() => {
    socket?.addEventListener("message", socketMessageHandler);
    return () => {
      socket?.removeEventListener("message", socketMessageHandler);
    };
  }, [socket, socketMessageHandler]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const onPaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          if (!blob) {
            continue;
          }
          try {
            const url = await uploadImage(blob);
            socket?.send(
              JSON.stringify({
                messageType: "chatMessage",
                data: {
                  content: url,
                  receiver: user.id,
                },
              })
            );
          } catch (e) {
            const error = e as Error;
            console.error(error);
          }
        }
      }
    }
  };

  const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.currentTarget.value === "") {
        return;
      }
      socket?.send(
        JSON.stringify({
          messageType: "chatMessage",
          data: {
            content: e.currentTarget.value,
            receiver: user.id,
          },
        })
      );
      e.currentTarget.value = "";
      mutate();
    }
  };

  return (
    <Box height="100%">
      <Flex
        maxH="90%"
        minH="90%"
        direction="column-reverse"
        overflowY="scroll"
        p={3}
      >
        {shouldRenderSkeleton ? (
          <Stack spacing={3}>
            {[...Array(15)].map((_, i) => (
              <Skeleton
                key={`message-skeleton-${i}`}
                alignSelf={Math.random() >= 0.5 ? "flex-start" : "flex-end"}
                width={Math.random() * 100 + 200}
                height={14}
              />
            ))}
          </Stack>
        ) : (
          messageNodes
        )}
      </Flex>
      <Input height="10%" onKeyDown={onSubmit} onPaste={onPaste} />
    </Box>
  );
};

export default ChatBox;
