import { firebase_db } from "@/lib/firebase";
import { collection, doc, query, where, getDocs, getDoc, addDoc } from "firebase/firestore";
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