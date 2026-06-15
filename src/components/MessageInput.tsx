// THEME
import { colors, spacing, radius, typography } from "../theme";

type Props = {
  input: string;
  setInput: (text: string) => void;
  onSend: (text?: string) => void;
  disabled?: boolean;
};

export const MessageInput = ({
  input,
  setInput,
  onSend,
  disabled = false,
}: Props) => {
  const handleSend = () => {
    if (!disabled) {
      onSend(input);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        padding: spacing.md,
        borderTop: `1px solid ${colors.border}`,
        backgroundColor: colors.bg,
      }}
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask legal question..."
        style={{
          flex: 1,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.pill,
          padding: `${spacing.sm}px ${spacing.md}px`,
          color: colors.text,
          backgroundColor: colors.surface,
          outline: "none",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <button
        onClick={handleSend}
        disabled={disabled}
        style={{
          marginLeft: spacing.sm,
          opacity: disabled ? 0.4 : 1,
          background: "none",
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <span
          style={{
            ...typography.subtitle,
            color: colors.primary,
          }}
        >
          Send
        </span>
      </button>
    </div>
  );
};