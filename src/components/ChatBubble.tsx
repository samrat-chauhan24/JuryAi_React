import { parseMessage } from "../utils/parser";

// THEME
import { colors, spacing, radius, typography } from "../theme";

type Props = {
  text: string;
  isUser: boolean;
};

export const ChatBubble = ({ text, isUser }: Props) => {
  const parsed = parseMessage(text);

return (
  <div
    style={{
      display: "flex",
      justifyContent: isUser
        ? "flex-end"
        : "flex-start",

      marginTop: spacing.xs,
      marginBottom: spacing.xs,
    }}
  >
    <div
      style={{
        backgroundColor: isUser
          ? colors.primary
          : colors.surfaceLight,

        paddingLeft: spacing.md,
        paddingRight: spacing.md,
        paddingTop: 6,
        paddingBottom: 6,

        borderRadius: radius.lg,

        maxWidth: "75%",
        display: "inline-flex",
        flexDirection: "column",

        wordBreak: "break-word",
      }}
    >
      {parsed.map((line) => (
        <p
          key={line.key}
          style={{
            ...typography.body,

            color: isUser
              ? "#fff"
              : colors.text,

            margin: 0,

            whiteSpace: "pre-wrap",

            lineHeight: "1.4",
          }}
        >
          {line.isList && <br />}

          {line.segments.map((seg) => (
            <span
              key={seg.key}
              style={{
                fontWeight: seg.isBold
                  ? "bold"
                  : "normal",

                color: isUser
                  ? "#fff"
                  : colors.text,
              }}
            >
              {seg.text}
            </span>
          ))}
        </p>
      ))}
    </div>
  </div>
)};