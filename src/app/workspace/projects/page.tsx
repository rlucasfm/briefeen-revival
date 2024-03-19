"use client";

import { CiCirclePlus } from "react-icons/ci";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, Card, CardBody, CircularProgress, Divider, useDisclosure } from "@nextui-org/react";
import { userAtom } from "@/atoms/user";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getProjectsByCompany } from "@/services/projects";
import CreateProjectModal from "@/components/modal/createProject";
import { useAuth } from "@/services/auth";

const ProjectItem = ({name, stage}: {name: string, stage: string}) => {
    return(
        <div>
            <div className="flex py-4 px-3 mb-3 items-center">
                <div className="flex gap-4 items-center">
                    <Avatar name={name} size="md" />
                    <p className="text-base font-light">{name}</p>
                </div>
                <Divider orientation="vertical" className="mx-6 h-10" />
                <p className="font-light">{stage}</p>
            </div>
            <Divider />
        </div>

    )
}

export default function Page() {
    const auth = useAuth();
    const [ isLoading, setIsLoading ] = useState(true);
    const [userRecoil, setUserRecoil] = useRecoilState(userAtom);
    const [loadedProjects, setLoadedProjects] = useState<any[]>([]);
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const loadProjects = () => {
        getProjectsByCompany(userRecoil.company).then((res: any) =>{
            setLoadedProjects(res);
            setIsLoading(false);
        })
    }

    const handleOnCreate = () => {
        loadProjects();
        onClose();
    }

    useEffect(() => {
        loadProjects();
    }, [])

    return(
        <>
            <div className="container mx-auto mt-20">
                <Card>
                    <CardBody style={{ height: '80vh' }}>
                        <div className="flex justify-between items-center">
                            <h1 className="font-medium">Projetos</h1>
                            {!isLoading && <CiCirclePlus size={25} className="cursor-pointer" onClick={onOpen} />}
                        </div>
                        <Divider className="my-3" />
                        <ScrollArea className="h-full">
                            <div className="flex flex-col gap-4">
                                {isLoading ? <CircularProgress size="lg" aria-label="Loading..."/> : null}
                                {loadedProjects.map((project, index) => 
                                    <ProjectItem name={project.name} stage={(project.stage.name)} key={index} />
                                )}
                            </div>
                        </ScrollArea>
                    </CardBody>
                </Card>
            </div>
            <CreateProjectModal         
                isOpen={isOpen} 
                onOpen={onOpen} 
                onOpenChange={onOpenChange}
                onCreate={handleOnCreate}
            />
        </>
    )
}