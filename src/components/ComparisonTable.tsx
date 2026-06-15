import { memo } from "react";
import type { CSSProperties } from "react";

// THEME
import { colors, spacing, radius, typography } from "../theme";

type Item = {
  country: string;
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

export const ComparisonTable = memo(
  ({
    data,
    mode,
  }: {
    data: Item[];
    mode?: string;
  }) => {
    const isAdvanced = (mode ?? "basic") === "advanced";

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return (
      <div
        style={{
          marginTop: spacing.md,
          marginBottom: spacing.md,
        }}
      >
        {data.map((item) => {
          const conditions =
            item.analysis?.conditions || [];

          const risks =
            item.analysis?.risks || [];

          const hasReferences =
            item.references?.length > 0;

          const answerColor =
            item.answer === "Allowed"
              ? "#16a34a"
              : "#dc2626";

          const riskColor =
            item.risk === "Low"
              ? "#16a34a"
              : item.risk === "Medium"
              ? "#f59e0b"
              : "#dc2626";

          return (
            <div
              key={item.country}
              style={styles.card}
            >
              <p style={styles.country}>
                {item.country}
              </p>

              <div style={styles.badgeRow}>
                <Badge
                  label={item.answer}
                  color={answerColor}
                />

                <Badge
                  label={`${item.risk} Risk`}
                  color={riskColor}
                />
              </div>

              <p style={styles.summary}>
                {item.summary}
              </p>

              {isAdvanced && (
                <>
                  {item.analysis?.explanation && (
                    <p style={styles.explanation}>
                      {item.analysis.explanation}
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

                      {item.references.map(
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
        })}
      </div>
    );
  }
);

const styles: Record<string, CSSProperties> = {
  card: {
    border: `1px solid ${colors.border}`,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },

  country: {
    ...typography.subtitle,
    marginBottom: spacing.xs,
  },

  badgeRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },

  badge: {
    padding: `4px ${spacing.sm}px`,
    borderRadius: radius.md,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
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

  section: {
    marginTop: spacing.sm,
  },

  sectionTitle: {
    ...typography.subtitle,
    marginBottom: spacing.xs,
  },

  bullet: {
    ...typography.body,
    color: colors.subtext,
  },

  reference: {
    color: colors.muted,
    fontSize: 13,
  },
};