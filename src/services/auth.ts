import { firebase_app, firebase_db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/user";

firebase_app;
// Defining utility functions for authentication
export const createAuthUser = (email: string, password: string) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
}

export const loginAuthUser = (email: string, password: string) => {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userData) => {
                const uuid = userData.user.uid;
                const userRef = doc(firebase_db, 'Colaborator', uuid);
                const userSnap = await getDoc(userRef);

                if(userSnap.exists()) {
                    resolve({...userSnap.data(), id: uuid});
                } else {
                    reject({code: 'auth/unknow'});
                }
            }).catch(e => {
                reject(e);
            });
    })
}

export const logoutAuthUser = () => {
    const auth = getAuth();
    
    return new Promise((resolve, reject) => {
        signOut(auth).then(() => {
            resolve('logged out');
        }).catch((err) => {
            reject(err);
        })
    })
}

export const useAuth = () => {
    const router = useRouter();
    const userRecoil = useRecoilValue(userAtom);
    const auth = getAuth();

    if(userRecoil.id === '')
        router.push('/');

    useEffect(() => {
        auth.authStateReady().then(() => {
            const currentUser = auth.currentUser;
            if (!currentUser)
                router.push('/');
        })
    }, [])

    return auth;
}

export enum AuthErrors {
    invalidEmail = 'auth/invalid-email',
    invalidPassword = 'auth/invalid-credential',
    unknownError = 'auth/unknow'
}