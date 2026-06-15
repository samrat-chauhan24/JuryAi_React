import React, { useEffect, useState } from "react";

import {
BrowserRouter,
Routes,
Route,
Navigate,
} from "react-router-dom";

import {
onAuthStateChanged,
} from "firebase/auth";

import type{
User,
} from "firebase/auth";

import { auth } from "./firebase";

import { IntroScreen } from "./screens/IntroScreen";
import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { ChatListScreen } from "./screens/ChatListScreen";

import { colors } from "./theme";

function ProtectedRoute({
user,
children,
}: {
user: User | null;
children: React.ReactNode;
}) {
if (!user) {
return <Navigate to="/" replace />;
}

return <>{children}</>;
}

export default function App() {
const [user, setUser] =
useState<User | null>(null);

const [checkingAuth, setCheckingAuth] =
useState(true);

useEffect(() => {
const unsubscribe =
onAuthStateChanged(
auth,
(currentUser) => {
setUser(currentUser);
setCheckingAuth(false);
}
);

return unsubscribe;


}, []);

if (checkingAuth) {
return (
<div
style={{
height: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
flexDirection: "column",
backgroundColor: colors.bg,
}}
>
<img
src="/logo3.png"
alt="LawGPT"
style={{
width: 80,
height: 80,
borderRadius: 40,
marginBottom: 20,
}}
/>


    <p>Loading...</p>
  </div>
);


}

return ( <BrowserRouter> <Routes>
{/* Public */}
<Route
path="/"
element={<IntroScreen />}
/>


    <Route
      path="/signin"
      element={<SignInScreen />}
    />

    <Route
      path="/signup"
      element={<SignUpScreen />}
    />

    {/* Protected */}
    <Route
      path="/home"
      element={
        <ProtectedRoute user={user}>
          <HomeScreen />
        </ProtectedRoute>
      }
    />

    <Route
      path="/chats"
      element={
        <ProtectedRoute user={user}>
          <ChatListScreen />
        </ProtectedRoute>
      }
    />

    <Route
      path="/chat/:chatId"
      element={
        <ProtectedRoute user={user}>
          <ChatScreen />
        </ProtectedRoute>
      }
    />

    <Route
      path="*"
      element={<Navigate to="/" replace />}
    />
  </Routes>
</BrowserRouter>


);
}
