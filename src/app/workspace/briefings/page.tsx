"use client";
import { useAuth } from "@/services/auth";

export default function Page() {
    const auth = useAuth();
    
    return(
        <>
            <p>Briefieng Raiz</p>
        </>
    )
}