# JuryAI React 

A React + TypeScript web application for asking legal questions across different jurisdictions.

## Features

- User Authentication
  - Sign Up
  - Sign In
  - Sign Out

- Legal AI Assistant
  - Global mode
  - Specific Country mode
  - Comparison mode

- AI Response Modes
  - Basic
  - Advanced

- Chat Management
  - Create chats
  - Rename chats
  - Delete chats
  - Chat history

- Local Storage
  - Chat persistence
  - Message persistence

---

## Tech Stack

- React
- TypeScript
- React Router
- Zustand
- Firebase Authentication

---


## Project Structure

```text
src
│
├── components
│   ├── ChatBubble
│   ├── ComparisonTable
│   ├── CountryDropdown
│   ├── Dropdown
│   ├── LegalControls
│   ├── MessageRenderer
│   ├── ScopeDropdown
│   └── StructuredResponse
│
├── screens
│   ├── IntroScreen
│   ├── SignInScreen
│   ├── SignUpScreen
│   ├── HomeScreen
│   ├── ChatScreen
│   └── ChatListScreen
│
├── services
│   ├── authService
│   └── chatService
│
├── store
│   └── useLegalStore
│
├── database
│   ├── db
│   └── chatQueries
│
├── theme
│
└── types
```

---


## Future Improvements

- Streaming responses
- Chat drawer animation
- Mobile responsive layout
- Markdown support
- Dark / Light theme
- Real backend integration
- Conversation search

---

## Author

Built by Samrat Chauhan.