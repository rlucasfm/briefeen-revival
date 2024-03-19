import { firebase_db } from "@/lib/firebase";
import { collection, doc, query, where, getDocs, getDoc, addDoc } from "firebase/firestore";
import { IProject } from "./interfaces";

export const getProjectsByCompany = async (company: string) => {
    const companyRef = doc(firebase_db, 'Company', company);
    const q = query(collection(firebase_db, 'Project'), where("company", "==", companyRef));

    try {
        const querySnapshot = await getDocs(q);
        const response = [];
        
        for (const doc of querySnapshot.docs) {
            const projectData = doc.data();
            const stageRef = projectData.stage;
            const stageDoc = await getDoc(stageRef);
            
            if (stageDoc.exists()) {
                const stageData = stageDoc.data();
                const projectWithStage = { id: doc.id, ...projectData, stage: stageData };
                response.push(projectWithStage);
            }
        }
        
        return response;
    } catch (error) {
        console.error("Erro ao obter projetos por empresa:", error);
        throw error;
    }
}

export const createProject = (project_data: IProject) => {
    return new Promise(async (resolve, reject) => {
        try {
            const companyRef = doc(firebase_db, 'Company', project_data.company);
            const clientRef = doc(firebase_db, 'Client', project_data.client);
            const stageRef = doc(firebase_db, 'Stage', project_data.stage);
            const created_project = 
                await addDoc(
                    collection(firebase_db, 'Project'), 
                    {...project_data, 
                        company: companyRef,
                        client: clientRef,
                        stage: stageRef
                    });
            resolve(created_project);    
        } catch (error) {
            reject(error);
        }
    })
}