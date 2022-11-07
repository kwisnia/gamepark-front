import { BasicUserDetails } from "./user";

enum SocketMessageTypes {
  ChatMessage = "chatMessage",
  NewAchievement = "newAchievement",
}

interface SocketChatMessage {
  messageType: SocketMessageTypes.ChatMessage;
  sender: BasicUserDetails;
  content: string;
}

interface SocketNewAchievement {
  messageType: SocketMessageTypes.NewAchievement;
  badge: string;
  score: number;
  title: string;
}

export function isChatMessage(
  message: SocketMessage
): message is SocketChatMessage {
  return message.messageType === SocketMessageTypes.ChatMessage;
}

export function isNewAchievement(
  message: SocketMessage
): message is SocketNewAchievement {
  return message.messageType === SocketMessageTypes.NewAchievement;
}

export type SocketMessage = SocketChatMessage | SocketNewAchievement;
