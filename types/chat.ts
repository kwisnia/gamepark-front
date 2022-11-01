export interface ChatMessage {
  id: number;
  createdAt: string;
  content: string;
  recieverID: number;
  senderID: number;
}
