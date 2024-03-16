import { IoCopyOutline } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { FaBook } from "react-icons/fa";

// Array de itens para a barra lateral
export const Routes = [
    {
        label: 'Workspace',
        icon: IoCopyOutline,
        link: '/workspace'
    },
    {
        label: 'Projetos',
        icon: IoPeople,
        link: '/workspace/projects'
    },
    {
        label: 'Catálogos',
        icon: CiStar,
        link: '/workspace/catalogs'
    },
    {
        label: 'Portfólios',
        icon: FaBook,
        link: '/workspace/portfolios'
    },
]