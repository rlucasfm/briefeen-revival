import Sidebar from "@/components/sidebar";
import { useAuth } from "@/services/auth";

export default function WorkspaceLayout({children}: {children: React.ReactNode}) {
    const auth = useAuth();

    return(
        <div className="flex">
            <Sidebar />
            {children}
        </div>
    )
}