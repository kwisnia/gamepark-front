import { BasicUserDetails } from "./user";

enum SocketMessageTypes {
  ChatMessage = "chatMessage",
}

interface SocketChatMessage {
  messageType: SocketMessageTypes.ChatMessage;
  sender: BasicUserDetails;
  content: string;
}

export function isChatMessage(
  message: SocketMessage
): message is SocketChatMessage {
  console.log(message);
  return message.messageType === SocketMessageTypes.ChatMessage;
}

export type SocketMessage = SocketChatMessage;
