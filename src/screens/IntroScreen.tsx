import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo2.png";
// THEME
import { colors, spacing, typography } from "../theme";
import { AuthCard } from "../components/AuthCard";


export const IntroScreen = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(!!user);
      });

    return unsubscribe;
  }, []);

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

        paddingLeft: spacing.xl,
        paddingRight: spacing.xl,
      }}
    >
      <img
        src={logo}
        alt="JuryAi"
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          objectFit: "cover",
          marginBottom: spacing.lg,
        }}
      />

      <h1
        style={{
          ...typography.title,
          fontSize: 32,
          fontWeight: 700,
          color: colors.text,
          marginBottom: spacing.sm,
        }}
      >
        JuryAi
      </h1>

      <p
        style={{
          color: colors.subtext,
          textAlign: "center",
          lineHeight: "28px",
          marginBottom: spacing.xl,
          maxWidth: 300,
        }}
      >
        Ask about laws, rights, or regulations
      </p>

      {isLoggedIn ? (
        <button
          onClick={() => navigate("/home")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            width: 220,

            backgroundColor: colors.surface,
            borderRadius: 999,
            border: `1px solid ${colors.border}`,

            padding: `12px ${spacing.md}px`,
            cursor: "pointer",
          }}
        >
          <span
            style={{
              color: colors.subtext,
              fontSize: 15,
            }}
          >
            Get Started
          </span>

          <span
            style={{
              color: colors.primary,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            →
          </span>
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            gap: spacing.sm,
            width: "100%",
          }}
        >
          <button
            onClick={() => navigate("/signin")}
            style={{
              flex: 1,

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              backgroundColor: colors.surface,
              borderRadius: 999,
              border: `1px solid ${colors.border}`,

              padding: `12px ${spacing.md}px`,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                color: colors.subtext,
                fontSize: 15,
              }}
            >
              Sign In
            </span>

            <span
              style={{
                color: colors.primary,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              →
            </span>
          </button>

          <button
            onClick={() => navigate("/signup")}
            style={{
              flex: 1,

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              backgroundColor: colors.surface,
              borderRadius: 999,
              border: `1px solid ${colors.border}`,

              padding: `12px ${spacing.md}px`,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                color: colors.subtext,
                fontSize: 15,
              }}
            >
              Sign Up
            </span>

            <span
              style={{
                color: colors.primary,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              →
            </span>
          </button>
        </div>
      )}
    </div>
  </AuthCard>
)};