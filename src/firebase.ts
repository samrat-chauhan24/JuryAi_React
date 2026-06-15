import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSK0WHhmhdNMlESmxPQxhqmsx9TLUowYg",
  authDomain: "juryaireact.firebaseapp.com",
  projectId: "juryaireact",
  storageBucket: "juryaireact.firebasestorage.app",
  messagingSenderId: "851738429360",
  appId: "1:851738429360:web:df161ca13f012604b2f875"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;