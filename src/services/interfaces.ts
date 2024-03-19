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
    name: string;
    stage: string;
    situation: string;
    delivery_date: string;
    client: string;
    company: string;
}