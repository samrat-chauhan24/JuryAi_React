import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

import {
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import type { Message } from "../types/message";

import { sendMessageToAI } from "../services/chatService";

import {
  saveMessage,
  getMessages,
} from "../database/chatQueries";

import { useLegalStore } from "../store/useLegalStore";
import { LegalControls } from "../components/LegalControls";

import { MessageRenderer } from "../components/MessageRender";
import { CountryDropdown } from "../components/CountryDropdown";
import { ScopeDropdown } from "../components/ScopeDropdown";

import {
  colors,
  spacing,
  typography,
} from "../theme";

export const ChatScreen = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialMessage =
    (location.state as any)?.initialMessage;

  const [messages, setMessages] =
    useState<any[]>([]);

  const [input, setInput] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const [
    hasSentInitial,
    setHasSentInitial,
  ] = useState(false);

  const messagesRef =
    useRef<HTMLDivElement>(null);

  const jurisdiction =
    useLegalStore(
      (s) => s.jurisdiction
    );

  const countries =
    useLegalStore(
      (s) => s.countries
    );

  const mode = useLegalStore(
    (s) => s.mode
  );

  const isValid =
    useLegalStore(
      (s) => s.isValid
    );

  const isDisabled =
    !input.trim() ||
    !isValid() ||
    sending;

  const loadMessages =
    useCallback(() => {
      if (!chatId) return;

      const data =
        getMessages(chatId) || [];

      setMessages([...data]);
    }, [chatId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top:
        messagesRef.current
          .scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  const handleSend = async (
    textOverride?: string
  ) => {
    const text =
      textOverride ?? input;

    if (
      !text?.trim() ||
      sending ||
      !chatId ||
      !isValid()
    ) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      chatId,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");
    setSending(true);

    try {
      saveMessage(userMessage);
    } catch {}

    try {
      const data =
        await sendMessageToAI({
          query: text,
          jurisdiction,
          countries,
          mode,
        });

      const botMessage = {
        id: `${Date.now()}_bot`,
        sender: "bot",
        chatId,
        data,
        mode,
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);

      try {
        saveMessage({
          id: botMessage.id,
          text: JSON.stringify({
            data,
            mode,
          }),
          sender: "bot",
          chatId,
        });
      } catch {}
    } catch {
      const errorMessage: Message = {
        id: `${Date.now()}_error`,
        text:
          "⚠️ Failed to connect. Try again.",
        sender: "bot",
        chatId,
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (
      !initialMessage ||
      hasSentInitial
    ) {
      return;
    }

    handleSend(initialMessage);

    setHasSentInitial(true);
  }, [
    initialMessage,
    hasSentInitial,
  ]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.bg,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: spacing.lg,
          paddingRight: spacing.lg,
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: colors.bg,
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => navigate("/chats")}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.surface,
            color: colors.text,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          ☰
        </button>

        <h2
          style={{
            ...typography.subtitle,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            margin: 0,
            color: colors.text,
            pointerEvents: "none",
          }}
        >
          JuryAI
        </h2>

        <LegalControls />
      </div>

      {/* MESSAGES */}
      <div
        ref={messagesRef}
        style={{
          flex: 1,
          overflowY: "auto",
          paddingLeft: spacing.md,
          paddingRight: spacing.md,
          paddingTop: spacing.lg,
          paddingBottom: 220,
        }}
      >
        {messages.map((item, index) => {
          const isLastMessage =
            index === messages.length - 1;

          const showLoaderAfterThisMessage =
            sending &&
            isLastMessage &&
            item.sender === "user";

          return (
            <div
              key={item.id}
              style={{
                marginTop:
                  index === 0
                    ? spacing.md
                    : 0,
              }}
            >
              <MessageRenderer item={item} />

              {showLoaderAfterThisMessage && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: spacing.sm,
                    marginBottom: spacing.md,
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "10px 14px",
                      borderRadius: 18,
                      border: `1px solid ${colors.border}`,
                      backgroundColor: colors.surface,
                      color: colors.text,
                      fontSize: 14,
                    }}
                  >
                    <span
                      style={{
                        letterSpacing: 2,
                        fontWeight: 700,
                        color: colors.primary,
                      }}
                    >
                      •••
                    </span>

                    <span>
                      JuryAI is analyzing...
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* INPUT AREA */}
      <div
        style={{
          position: "fixed",
          bottom: spacing.lg,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: spacing.sm,
            marginBottom: spacing.xs,
          }}
        >
          <ScopeDropdown />
          <CountryDropdown />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: colors.surface,
            borderRadius: 999,
            border: `1px solid ${colors.border}`,
            padding: spacing.sm,
          }}
        >
          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Ask legal question..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              color: colors.text,
              fontSize: 15,
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !isDisabled
              ) {
                handleSend(input);
              }
            }}
          />

          <button
            onClick={() =>
              handleSend(input)
            }
            disabled={isDisabled}
            style={{
              marginLeft: spacing.sm,
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: "none",
              backgroundColor: isDisabled
                ? colors.surfaceLight
                : colors.primary,
              color: "#fff",
              cursor: isDisabled
                ? "not-allowed"
                : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            ➜
          </button>
        </div>
      </div>
    </div>
  );
};