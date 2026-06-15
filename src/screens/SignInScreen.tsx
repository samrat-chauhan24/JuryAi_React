import  { useState } from "react";
import { useNavigate } from "react-router-dom";

import { colors, spacing, typography } from "../theme";
import { signIn } from "../services/authService";

import { AuthCard } from "../components/AuthCard";
export const SignInScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const isDisabled =
    loading ||
    !email.trim() ||
    !password.trim();

  const handleSignIn = async () => {
    if (isDisabled) return;

    try {
      setLoading(true);

      await signIn(email, password);

      navigate("/home");
    } catch (e: any) {
      if (
        e.code ===
        "auth/user-not-found"
      ) {
        alert("User not found");
      } else if (
        e.code ===
        "auth/wrong-password"
      ) {
        alert("Incorrect password");
      } else if (
        e.code ===
        "auth/invalid-email"
      ) {
        alert("Invalid email");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <AuthCard>
    <div
      style={{
        height: "100%",
        minHeight: 650,

        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          ...typography.title,
          fontSize: 32,
          fontWeight: 700,
          color: colors.text,
          marginBottom: spacing.xl,
        }}
      >
        Sign In
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: "100%",
          maxWidth: 420,

          backgroundColor:
            colors.surfaceLight,

          border: `1px solid ${colors.border}`,

          borderRadius: 999,

          padding: 14,

          color: colors.text,

          marginBottom: spacing.md,
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        style={{
          width: "100%",
          maxWidth: 420,

          backgroundColor:
            colors.surfaceLight,

          border: `1px solid ${colors.border}`,

          borderRadius: 999,

          padding: 14,

          color: colors.text,

          marginBottom: spacing.lg,
        }}
      />

      <button
        disabled={isDisabled}
        onClick={handleSignIn}
        style={{
          width: 260,

          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",

          backgroundColor:
            colors.surfaceLight,

          border: `1px solid ${colors.border}`,

          borderRadius: 999,

          padding:
            "14px 20px",

          cursor: "pointer",

          opacity:
            isDisabled
              ? 0.4
              : 1,
        }}
      >
        <span
          style={{
            color:
              colors.subtext,
          }}
        >
          {loading
            ? "Signing in..."
            : "Continue"}
        </span>

        <span
          style={{
            color:
              colors.primary,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          →
        </span>
      </button>

      <div
        style={{
          marginTop: spacing.lg,

          display: "flex",
          gap: 6,
        }}
      >
        <span
          style={{
            color:
              colors.subtext,
          }}
        >
          Don't have an account?
        </span>

        <button
          onClick={() =>
            navigate("/signup")
          }
          style={{
            background: "none",
            border: "none",
            color:
              colors.primary,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  </AuthCard>
);
};

// const styles = {
//   input: {
//     width: "100%",
//     backgroundColor:
//       colors.surface,
//     borderRadius: 999,
//     border: `1px solid ${colors.border}`,
//     padding: "12px 16px",
//     marginTop: spacing.md,
//     color: colors.text,
//     boxSizing: "border-box" as const,
//   },

//   button: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent:
//       "space-between",
//     width: "60%",
//     backgroundColor:
//       colors.surface,
//     borderRadius: 999,
//     border: `1px solid ${colors.border}`,
//     padding: "12px 16px",
//     cursor: "pointer",
//   },

//   buttonText: {
//     color: colors.subtext,
//   },

//   arrow: {
//     color: colors.primary,
//     fontSize: 18,
//     fontWeight: 600,
//   },
// };