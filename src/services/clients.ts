import { firebase_db } from "@/lib/firebase";
import { collection, doc, query, where, getDocs, getDoc } from "firebase/firestore";

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