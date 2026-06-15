// services/chatService.ts

const USE_MOCK_API = true;

type ChatRequest = {
  query: string;
  jurisdiction: string;
  countries: string[];
  mode: string;
};

// ===============================
// REAL API
// ===============================
const callRealAPI = async ({
  query,
  jurisdiction,
  countries,
  mode,
}: ChatRequest) => {
  const response = await fetch(
    "http://localhost:8000/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        jurisdiction,
        countries,
        mode,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Network error");
  }

  return response.json();
};

// ===============================
// MOCK API
// ===============================
const callMockAPI = async ({
  query,
  jurisdiction,
  countries,
  mode,
}: ChatRequest) => {
  console.log("🔥 MOCK API HIT", {
    query,
    jurisdiction,
    countries,
    mode,
  });

  await new Promise((res) =>
    setTimeout(res, 800)
  );

  // Comparison Mode
  if (jurisdiction === "comparison") {
    return countries.map(
      (country, index) => {
        const base = {
          country,
          answer:
            index % 2 === 0
              ? "Allowed"
              : "Conditional",

          risk:
            index % 2 === 0
              ? "Low"
              : "Medium",

          summary:
            index % 2 === 0
              ? "Generally allowed under most conditions."
              : "Allowed but depends on local restrictions.",
        };

        if (mode === "basic") {
          return {
            ...base,
            analysis: {},
            references: [],
          };
        }

        return {
          ...base,
          analysis: {
            explanation:
              "This is based on local legal frameworks and regulatory policies.",
            conditions: [
              "Must comply with local regulations",
              "Applies only in regulated scenarios",
            ],
            risks: [
              "Possible compliance issues",
              "Legal interpretation may vary",
            ],
          },
          references: [
            `${country} Legal Code Section 101`,
            `${country} Data Protection Act`,
          ],
        };
      }
    );
  }

  // Single Country / Global
  const base = {
    answer: "Allowed",
    risk: "Low",
    summary:
      "This is generally allowed under most conditions.",
  };

  if (mode === "basic") {
    return {
      ...base,
      analysis: {},
      references: [],
    };
  }

  return {
    ...base,
    analysis: {
      explanation:
        "This action is permitted under relevant laws with certain conditions.",
      conditions: [
        "Follow applicable compliance guidelines",
        "Ensure proper documentation",
      ],
      risks: [
        "Regulatory review possible",
        "Interpretation may vary by region",
      ],
    },
    references: [
      "IT Act Section 43A",
      "Data Protection Bill 2023",
    ],
  };
};

// ===============================
// PUBLIC API
// ===============================
export const sendMessageToAI = async (
  payload: ChatRequest
) => {
  if (USE_MOCK_API) {
    return callMockAPI(payload);
  }

  return callRealAPI(payload);
};