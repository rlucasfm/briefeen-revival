import { Timestamp } from "firebase/firestore";

export interface IClient {
    id?: string;
    name: string;
    email: string;
    phone: string;
    document_number: string;
    address: string;
    company: string;    
}

export interface IProject {
    id?: string;
    name?: string;
    stage?: string | IStage;
    situation?: string;
    description?: string;
    delivery_date?: string;
    client?: string | IClient;
    company?: string | ICompany;
}

export interface ICompany {
    id?: string;
    address: string;
    phone: string;
    created: Timestamp;
    name: string;
    updated: Timestamp;
    signature_type: string;
    email: string;
    due_date: Timestamp;
}

export interface IStage {
    id?: string;
    updated: Timestamp;
    created: Timestamp;
    name: string;
    company: string;
}