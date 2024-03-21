import { firebase_db } from "@/lib/firebase";
import { collection, doc, query, where, getDocs, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { IClient } from "./interfaces";

export const getClientsByCompany = (company: string) => {
    const companyRef = doc(firebase_db, 'Company', company);
    const q = query(collection(firebase_db, 'Client'), where("company", "==", companyRef));

    return new Promise(async (resolve, reject) => {
        const querySnapshot = await getDocs(q);
        const response: any = [];
        querySnapshot.forEach((doc) => {
            response.push({id: doc.id, ...doc.data()});
        });
        resolve(response);
    })
}

export const createClient = (client_data: IClient) => {
    return new Promise(async (resolve, reject) => {
        try {
            const companyRef = doc(firebase_db, 'Company', client_data.company);
            const created_client = await addDoc(collection(firebase_db, 'Client'), {...client_data, company: companyRef});
            resolve(created_client);    
        } catch (error) {
            reject(error);
        }
    })
}

export const updateClient = (client_data: IClient) => {
    const clientRef = doc(firebase_db, 'Client', client_data.id!);

    return new Promise(async (resolve, reject) => {
        try {
            const { id, ...data } = client_data;

            const updated_client = await updateDoc(clientRef, data)

            resolve(updated_client);
        } catch (error) {
            reject(error);
        }
    })
}