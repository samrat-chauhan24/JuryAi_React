import { useState } from "react";
// THEME
import { colors, spacing, radius, typography } from "../theme";

type Props = {
  label?: string;
  options: string[];
  selected: string;
  onSelect: (value: any) => void;
  openDown?: boolean;
};

export const Dropdown = ({
  label,
  options,
  selected,
  onSelect,
  openDown = false,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        marginRight: spacing.sm,
      }}
    >
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: `${spacing.xs}px ${spacing.sm}px`,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.pill,
          backgroundColor: colors.surface,
          cursor: "pointer",
          ...typography.body,
          color: colors.text,
        }}
      >
        {label && label.trim() !== ""
          ? `${label}: `
          : ""}
        {selected || "Select"}{" "}
        {openDown ? "▼" : "▲"}
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
          }}
        />
      )}

      {/* Menu */}
      {open && (
        <div
          style={{
            position: "absolute",

            ...(openDown
              ? { top: "45px", right: 0 }
              : { bottom: "45px", left: 0 }),

            minWidth: "120px",
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            backgroundColor: colors.surface,

            zIndex: 1000,

            boxShadow:
              "0px 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              style={{
                width: "100%",
                padding: spacing.md,
                border: "none",
                borderBottom: `1px solid ${colors.divider}`,
                background: "transparent",
                textAlign: "left",
                color: colors.text,
                cursor: "pointer",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};