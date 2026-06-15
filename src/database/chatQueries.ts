const CHATS_KEY = "juryai_chats";
const MESSAGES_KEY = "juryai_messages";

const getStoredChats = () => {
  return JSON.parse(
    localStorage.getItem(CHATS_KEY) || "[]"
  );
};

const setStoredChats = (chats: any[]) => {
  localStorage.setItem(
    CHATS_KEY,
    JSON.stringify(chats)
  );
};

const getStoredMessages = () => {
  return JSON.parse(
    localStorage.getItem(MESSAGES_KEY) || "[]"
  );
};

const setStoredMessages = (messages: any[]) => {
  localStorage.setItem(
    MESSAGES_KEY,
    JSON.stringify(messages)
  );
};

// Create Chat
export const createChat = (chatId: string) => {
  const chats = getStoredChats();

  chats.push({
    id: chatId,
    title: "New Chat",
    lastMessage: "",
    updatedAt: Date.now(),
    createdAt: Date.now(),
  });

  setStoredChats(chats);
};

// Get Chats
export const getChats = () => {
  return getStoredChats().sort(
    (a: any, b: any) =>
      b.updatedAt - a.updatedAt
  );
};

// Save Message
export const saveMessage = (msg: any) => {
  const messages = getStoredMessages();

  messages.push({
    ...msg,
    createdAt: Date.now(),
    status: "sent",
  });

  setStoredMessages(messages);

  updateChatAfterMessage(
    msg.chatId,
    msg.text
  );

  if (msg.sender === "user") {
    updateChatTitleIfFirstMessage(
      msg.chatId,
      msg.text
    );
  }
};

// Update Chat
export const updateChatAfterMessage = (
  chatId: string,
  text: string
) => {
  const chats = getStoredChats();

  const updated = chats.map((chat: any) =>
    chat.id === chatId
      ? {
          ...chat,
          lastMessage: text,
          updatedAt: Date.now(),
        }
      : chat
  );

  setStoredChats(updated);
};

// Get Messages
export const getMessages = (
  chatId: string
) => {
  const rows = getStoredMessages()
    .filter(
      (msg: any) => msg.chatId === chatId
    )
    .sort(
      (a: any, b: any) =>
        a.createdAt - b.createdAt
    );

  return rows.map((msg: any) => {
    if (msg.sender === "bot") {
      try {
        const parsedText = JSON.parse(
          msg.text
        );

        return {
          ...msg,
          data:
            parsedText.data ??
            parsedText,
          mode:
            parsedText.mode ??
            "basic",
        };
      } catch {
        return msg;
      }
    }

    return msg;
  });
};

// First Message → Chat Title
export const updateChatTitleIfFirstMessage =
  (
    chatId: string,
    text: string
  ) => {
    const chats = getStoredChats();

    const updated = chats.map(
      (chat: any) => {
        if (
          chat.id === chatId &&
          chat.title === "New Chat"
        ) {
          return {
            ...chat,
            title: text.slice(0, 30),
          };
        }

        return chat;
      }
    );

    setStoredChats(updated);
  };

// Delete Chat
export const deleteChat = (
  chatId: string
) => {
  const chats = getStoredChats().filter(
    (c: any) => c.id !== chatId
  );

  const messages =
    getStoredMessages().filter(
      (m: any) => m.chatId !== chatId
    );

  setStoredChats(chats);
  setStoredMessages(messages);
};

// Rename Chat
export const renameChat = (
  chatId: string,
  newTitle: string
) => {
  const chats = getStoredChats();

  const updated = chats.map(
    (chat: any) =>
      chat.id === chatId
        ? {
            ...chat,
            title: newTitle,
          }
        : chat
  );

  setStoredChats(updated);
};