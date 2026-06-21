import { memo } from "react";
import type { CSSProperties } from "react";

// THEME
import { colors, spacing, radius, typography } from "../theme";

type Props = {
  data: {
    answer: string;
    risk: string;
    summary: string;
    analysis: {
      explanation?: string;
      conditions?: string[];
      risks?: string[];
    };
    references: string[];
  };
  mode?: string;
};

const Badge = ({
  label,
  color,
}: {
  label: string;
  color: string;
}) => (
  <div
    style={{
      ...styles.badge,
      backgroundColor: color,
    }}
  >
    <span style={styles.badgeText}>{label}</span>
  </div>
);

export const StructuredResponse = memo(
  ({ data, mode }: Props) => {
    const isAdvanced = mode === "advanced";

    if (!data) return null;

    const answerColor =
      data.answer === "Allowed"
        ? "#16a34a"
        : data.answer === "Conditional"
        ? "#f59e0b"
        : data.answer === "Informational"
        ? "#3b82f6"
        : "#dc2626";

    const riskColor =
      data.risk === "Low"
        ? "#16a34a"
        : data.risk === "Medium"
        ? "#f59e0b"
        : "#dc2626";

    const conditions =
      data.analysis?.conditions || [];

    const risks =
      data.analysis?.risks || [];

    const hasReferences =
      data.references?.length > 0;

    const normalizedRisk =
  data.risk?.trim().toLowerCase();

const showRisk =
  normalizedRisk &&
  normalizedRisk !== "none" &&
  normalizedRisk !== "none risk" &&
  normalizedRisk !== "no risk";

    return (
      <div style={styles.card}>
        <p style={styles.sectionTitle}>
          Answer
        </p>

        <div style={styles.badgeRow}>
          <Badge
            label={data.answer}
            color={answerColor}
          />

          {showRisk && (
            <Badge
              label={`${data.risk} Risk`}
              color={riskColor}
            />
          )}
        </div>

        <p style={styles.summary}>
          {data.summary}
        </p>

        {isAdvanced && (
          <>
            {data.analysis?.explanation && (
              <p style={styles.explanation}>
                {data.analysis.explanation}
              </p>
            )}

            {conditions.length > 0 && (
              <div style={styles.section}>
                <p style={styles.sectionTitle}>
                  Conditions
                </p>

                {conditions.map((c, i) => (
                  <p
                    key={i}
                    style={styles.bullet}
                  >
                    • {c}
                  </p>
                ))}
              </div>
            )}

            {risks.length > 0 && (
              <div style={styles.section}>
                <p style={styles.sectionTitle}>
                  Potential Risks
                </p>

                {risks.map((r, i) => (
                  <p
                    key={i}
                    style={styles.bullet}
                  >
                    • {r}
                  </p>
                ))}
              </div>
            )}

            {hasReferences && (
              <div style={styles.section}>
                <p style={styles.sectionTitle}>
                  Legal Sources
                </p>

                {data.references.map(
                  (ref, i) => (
                    <p
                      key={i}
                      style={styles.reference}
                    >
                      {ref}
                    </p>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

const styles: Record<string, CSSProperties> = {
  card: {
    border: `1px solid ${colors.border}`,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },

  badgeRow: {
    display: "flex",
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  badge: {
    padding: `4px ${spacing.sm}px`,
    borderRadius: radius.md,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: 500,
  },

  section: {
    marginTop: spacing.md,
  },

  sectionTitle: {
    ...typography.subtitle,
    marginBottom: spacing.xs,
  },

  summary: {
    ...typography.body,
    color: colors.subtext,
    marginBottom: spacing.xs,
  },

  explanation: {
    ...typography.body,
    color: colors.subtext,
    marginTop: spacing.xs,
  },

  bullet: {
    ...typography.body,
    color: colors.subtext,
    marginBottom: 2,
  },

  reference: {
    color: colors.muted,
    fontSize: 13,
    marginBottom: 2,
  },
};