import {
  useState,
  useCallback,
} from "react";

import { useNavigate } from "react-router-dom";

import { createChat } from "../database/chatQueries";
import { LegalControls } from "../components/LegalControls";
import { CountryDropdown } from "../components/CountryDropdown";
import { ScopeDropdown } from "../components/ScopeDropdown";

import { colors, spacing, typography } from "../theme";
import { useLegalStore } from "../store/useLegalStore";

export const HomeScreen = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const jurisdiction = useLegalStore(
    (s) => s.jurisdiction
  );

  const countries = useLegalStore(
    (s) => s.countries
  );

  const isDisabled =
    sending ||
    !input.trim() ||
    (jurisdiction ===
      "specific country" &&
      countries.length !== 1) ||
    (jurisdiction === "comparison" &&
      countries.length !== 2);

  const handleSend = useCallback(() => {
    if (isDisabled) return;

    setSending(true);

    const chatId =
      Date.now().toString();

    createChat(chatId);

    navigate(`/chat/${chatId}`, {
      state: {
        initialMessage: input,
      },
    });

    setInput("");
    setSending(false);
  }, [isDisabled, input, navigate]);

  return (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: colors.bg,
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: spacing.lg,
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
          fontWeight: 600,
        }}
      >
        ☰
      </button>

      <LegalControls />
    </div>

    {/* Center */}
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.xl,
      }}
    >
      <h2
        style={{
          ...typography.title,
          textAlign: "center",
        }}
      >
        Ask about laws, rights, or regulations
      </h2>
    </div>

    {/* Bottom Area */}
    <div
      style={{
        width: "90%",
        margin: "0 auto",
        marginBottom: spacing.lg,
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
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask JuryAi..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            color: colors.text,
            fontSize: 15,
            minWidth: 0,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisabled) {
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
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
            flexShrink: 0,
          }}
        >
          ➜
        </button>
      </div>
    </div>
  </div>
)};