"use client";

import { Avatar, Divider } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { Routes } from "./routes";

// Componente SidebarItem
const SidebarItem = ({ label, Icon, link }: { label:string, Icon: any, link: string }) => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = pathname === link;

    return (
        <div 
            className={`flex items-center justify-around cursor-pointer p-2 py-3 ${isActive ? 'bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-600' : 'hover:bg-green-200 hover:text-green-600'}`}
            onClick={() => router.push(link)}
        >
            <Icon className="ml-4" size={20} />
            <p className="mr-auto ml-4 text-sm">{label}</p>
        </div>
    );
};


// Componente Sidebar
export default function Sidebar() {
    return (
        <div className="flex flex-col min-w-[250px] w-[250px] h-screen shadow-[1px_0_10px_rgba(0,0,0,0.5)] mr-4">
            <div className="mt-10 flex flex-col items-center">
                <h1 className="text-lg mb-2 font-medium">Bem-vindo</h1>
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large" />
                <h2 className="text-lg font-semibold mt-6">Persona Projetos</h2>
                <p className="text-sm font-light">Administrador</p>
            </div>
            <Divider className="mt-10 mb-4" />
            <div className="flex flex-col">
                {Routes.map((item, index) => (
                    <div key={index}>
                        <SidebarItem label={item.label} Icon={item.icon} link={item.link} />
                    </div>
                ))}
            </div>
        </div>
    );
}
