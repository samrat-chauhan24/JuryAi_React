import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

export const signUp = async (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const signIn = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const logout = async () => {
  return signOut(auth);
};