import { IoCopyOutline } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { FaBook } from "react-icons/fa";
import { Avatar, Divider } from "@nextui-org/react";

// Componente SidebarItem
const SidebarItem = ({ label, Icon }) => {
    return (
        <div className="flex items-center justify-around cursor-pointer p-2 py-3 hover:bg-green-200 hover:text-green-600">
            <Icon className="ml-4" size={20} />
            <p className="mr-auto ml-4 text-sm">{label}</p>
        </div>
    );
};

// Array de itens para a barra lateral
const Items = [
    {
        label: 'Workspace',
        icon: IoCopyOutline
    },
    {
        label: 'Clientes',
        icon: IoPeople
    },
    {
        label: 'Catálogos',
        icon: CiStar
    },
    {
        label: 'Portfólios',
        icon: FaBook
    },
]

// Componente Sidebar
export default function Sidebar() {
    return (
        <div className="flex flex-col w-[15rem] h-screen shadow-[1px_0_10px_rgba(0,0,0,0.5)] mr-4">
            <div className="mt-10 flex flex-col items-center">
                <h1 className="text-lg mb-2 font-medium">Bem-vindo</h1>
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large" />
                <h2 className="text-lg font-semibold mt-6">Persona Projetos</h2>
                <p className="text-sm font-light">Administrador</p>
            </div>
            <Divider className="mt-10 mb-4" />
            <div className="flex flex-col">
                {Items.map((item, index) => (
                    <div key={index}>
                        <SidebarItem label={item.label} Icon={item.icon} />
                    </div>
                ))}
            </div>
        </div>
    );
}
