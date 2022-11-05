
import { MessageItem } from '@chat-app/shared'
import {
  loadAllMessagesItems,
  saveMessageItem,
} from "../models/messages-repository";


export const saveMessage = async (messageItem: MessageItem, author: string): Promise<MessageItem[]> => {
  if (!messageItem.text || messageItem.text == "") {
    throw new Error("Invalid text on message item!");
  }
  messageItem.timeStamp = new Date();
  messageItem.author = author

  await saveMessageItem(messageItem);

  return await loadAllMessagesItems();
};

export const loadMesagges = async (): Promise<MessageItem[]> => {
  return await loadAllMessagesItems();
};
