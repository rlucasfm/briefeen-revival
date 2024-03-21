import { firebase_db } from "@/lib/firebase";
import { collection, doc, query, where, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
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
            const companyRef = doc(firebase_db, 'Company', project_data.company as string);
            const clientRef = doc(firebase_db, 'Client', project_data.client as string);
            const stageRef = doc(firebase_db, 'Stage', project_data.stage as string);
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

export const getHydratedProject = (project_id: string) => {
    const projectRef = doc(firebase_db, 'Project', project_id);

    return new Promise(async (resolve, reject) => {
        try {
            const project_snapshot = await getDoc(projectRef);
            const project_data = project_snapshot.data() as IProject;
    
            const clientRef: any = project_data.client;
            const companyRef: any = project_data.company;
            const stageRef: any = project_data.stage;
    
            const [clientData, companyData, stageData] = await Promise.all([
                getDoc(clientRef),
                getDoc(companyRef),
                getDoc(stageRef)
            ]);
    
            resolve({
                id: project_id,
                ...project_data,
                client: {...(clientData.data() as object), id: (project_data.client as any).id},
                company: {...(companyData.data() as object), id: (project_data.company as any).id},
                stage: {...(stageData.data() as object), id: (project_data.stage as any).id}
            });
        } catch (error) {
            reject(error);
        }
    })
}

export const updateProject = (project_data: IProject) => {
    const projectRef = doc(firebase_db, 'Project', project_data.id!);

    return new Promise(async (resolve, reject) => {
        try {
            const project_loaded = (await getDoc(projectRef)).data();
            const { id, client, stage, company, ...data } = project_data;
            const client_ref = client ? doc(firebase_db, 'Client', client as string) : undefined;
            const stage_ref = stage ? doc(firebase_db, 'Stage', stage as string) : undefined;
            const company_ref = company ? doc(firebase_db, 'Company', company as string) : undefined;

            const updated_project = await updateDoc(projectRef, {
                ...data,
                company: company_ref ? company_ref : (project_loaded as any).company,
                client: client_ref ? client_ref : (project_loaded as any).client,
                stage: stage_ref ? stage_ref : (project_loaded as any).stage
            })

            resolve(updated_project);
        } catch (error) {
            reject(error);
        }
    })
}

export const deleteProject = (project_id: string) => {
    const projectRef = doc(firebase_db, 'Project', project_id);

    return new Promise(async (resolve, reject) => {
        try {
            await deleteDoc(projectRef);
            resolve(true);   
        } catch (error) {
            reject(error);
        }
    })
}