import { useState, useEffect } from "react";

// THEME
import {
  colors,
  spacing,
  radius,
  typography,
} from "../theme";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  currentTitle: string;
};

export const RenameModal = ({
  visible,
  onClose,
  onSave,
  currentTitle,
}: Props) => {
  const [text, setText] =
    useState(currentTitle);

  useEffect(() => {
    setText(currentTitle);
  }, [currentTitle]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          "rgba(0,0,0,0.4)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "400px",
          maxWidth: "90%",
          padding: spacing.lg,
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          border: `1px solid ${colors.border}`,
        }}
      >
        <h3
          style={{
            ...typography.subtitle,
            marginBottom: spacing.md,
          }}
        >
          Rename Chat
        </h3>

        <input
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Enter new name"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!text.trim()) return;
              onSave(text);
              onClose();
            }
          }}
          style={{
            width: "100%",
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: spacing.md,
            marginBottom: spacing.lg,
            color: colors.text,
            backgroundColor: colors.bg,
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              marginRight: spacing.lg,
              color: colors.subtext,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!text.trim()) return;
              onSave(text);
              onClose();
            }}
            style={{
              color: colors.primary,
              fontWeight: "bold",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};