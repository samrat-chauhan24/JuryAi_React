import {
useState,
useEffect,
useCallback,
} from "react";

import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import {auth} from "../firebase";

import {
getChats,
deleteChat,
renameChat,
} from "../database/chatQueries";

import { RenameModal } from "../components/RenameModal";

import {
colors,
spacing,
radius,
typography,
} from "../theme";

type Chat = {
id: string;
title: string;
};

export const ChatListScreen = () => {
const navigate = useNavigate();

const [chats, setChats] =
useState<Chat[]>([]);

const [
selectedId,
setSelectedId,
] = useState<string | null>(
null
);

const [
renameVisible,
setRenameVisible,
] = useState(false);

const [
currentTitle,
setCurrentTitle,
] = useState("");

const loadChats =
useCallback(() => {
const data =
getChats() || [];

  setChats([...data]);
}, []);


useEffect(() => {
loadChats();
}, [loadChats]);

const handleDelete = (
chatId: string
) => {
const confirmed =
window.confirm(
"Delete Chat?\n\nThis cannot be undone."
);


if (!confirmed) return;

deleteChat(chatId);

setSelectedId(null);

loadChats();


};

const handleRename = (
chatId: string,
title: string
) => {
setCurrentTitle(title);
setSelectedId(chatId);
setRenameVisible(true);
};

const handleSaveRename = (
newTitle: string
) => {
if (
!selectedId ||
!newTitle.trim()
)
return;

renameChat(
  selectedId,
  newTitle.trim()
);

setRenameVisible(false);

setSelectedId(null);

loadChats();


};

const handleLogout =
async () => {
const confirmed =
window.confirm(
"Are you sure you want to sign out?"
);


  if (!confirmed) return;

  try {
    await signOut(auth);

    navigate("/");
  } catch (e) {
    console.error(
      "Logout error",
      e
    );
  }
};


return (
<div
onClick={() =>
setSelectedId(null)
}
style={{
minHeight: "100vh",
backgroundColor:
colors.bg,
padding:
spacing.lg,
position: "relative",
}}
>
<h1
style={{
...typography.title,
marginBottom:
spacing.md,
}}
>
Recent Chats </h1>

```
  {chats.map((item) => {
    const isSelected =
      selectedId === item.id;

    return (
      <div
        key={item.id}
        onClick={(e) => {
          e.stopPropagation();

          if (
            isSelected
          ) {
            setSelectedId(
              null
            );
          } else {
            navigate(
              `/chat/${item.id}`
            );
          }
        }}
        onContextMenu={(
          e
        ) => {
          e.preventDefault();

          setSelectedId(
            item.id
          );
        }}
        style={{
          padding:
            spacing.md,
          backgroundColor:
            isSelected
              ? colors.surfaceLight
              : colors.bg,
          borderRadius:
            radius.md,
          marginBottom:
            spacing.sm,
          cursor:
            "pointer",
        }}
      >
        <div
          style={{
            ...typography.body,
            fontSize: 16,
          }}
        >
          {item.title ||
            "New Chat"}
        </div>

        {isSelected && (
          <div
            style={{
              display:
                "flex",
              gap: spacing.lg,
              marginTop:
                spacing.sm,
            }}
          >
            <button
              onClick={(
                e
              ) => {
                e.stopPropagation();

                handleRename(
                  item.id,
                  item.title
                );
              }}
            >
              Rename
            </button>

            <button
              onClick={(
                e
              ) => {
                e.stopPropagation();

                handleDelete(
                  item.id
                );
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  })}

  <button
    onClick={() =>
      navigate("/home")
    }
    style={{
      position: "fixed",
      bottom: spacing.xl,
      right: spacing.lg,
      backgroundColor:
        colors.primary,
      color: "#fff",
      border: "none",
      borderRadius:
        radius.pill,
      padding: `${spacing.sm}px ${spacing.lg}px`,
      cursor: "pointer",
    }}
  >
    + New Chat
  </button>

  <button
    onClick={handleLogout}
    style={{
      position: "fixed",
      bottom: spacing.xl,
      left: spacing.lg,
      backgroundColor:
        colors.primary,
      color: "#fff",
      border: "none",
      borderRadius:
        radius.pill,
      padding: `${spacing.sm}px ${spacing.lg}px`,
      cursor: "pointer",
    }}
  >
    Sign Out
  </button>

  <RenameModal
    visible={renameVisible}
    currentTitle={
      currentTitle
    }
    onClose={() =>
      setRenameVisible(
        false
      )
    }
    onSave={
      handleSaveRename
    }
  />
</div>


);
};
