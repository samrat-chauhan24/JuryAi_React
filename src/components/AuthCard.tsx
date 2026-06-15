// components/AuthCard.tsx

type Props = {
  children: React.ReactNode;
};

export const AuthCard = ({
  children,
}: Props) => {
  return (
    <div
      style={{
        minHeight: "100vh",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#0B0F14",
      }}
    >
      <div
        style={{
          width: 420,
          minHeight: 650,

          backgroundColor: "#121821",

          border: "1px solid #1F2A37",

          borderRadius: 24,

          padding: 32,

          boxShadow:
            "0 20px 60px rgba(0,0,0,0.45)",
        }}
      >
        {children}
      </div>
    </div>
  );
};