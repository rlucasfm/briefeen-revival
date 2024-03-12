import { firebase_app } from "@/lib/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

firebase_app;
// Defining utility functions for authentication
export const createAuthUser = (email: string, password: string) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
}

export const loginAuthUser = (email: string, password: string) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
}

export enum AuthErrors {
    invalidEmail = 'auth/invalid-email',
    invalidPassword = 'auth/invalid-credential'
}