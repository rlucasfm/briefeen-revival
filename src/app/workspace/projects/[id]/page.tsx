"use client";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button, Card, CardBody, Divider, Input, Select, SelectItem, Skeleton, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/user";
import { getStagesByCompany } from "@/services/stages";
import { deleteProject, getHydratedProject, updateProject } from "@/services/projects";
import { IProject } from "@/services/interfaces";
import CardClient from "./components/CardClient";
import { ContractSituations } from "@/services/constants";
import ModalDeleteProject from "@/components/modal/deleteProject";

export default function Page({ params }: { params: { id: string }}) {
    const router = useRouter();
    const userRecoil = useRecoilValue(userAtom);
    const [isLoading, setIsLoading] = useState(true);
    const [stages, setStages] = useState([]);
    const [project, setProject] = useState<IProject>();
    const [projectStage, setProjectStage] = useState();
    const [projectSituation, setProjectSituation] = useState();
    const [deliveryDate, setDeliveryDate] = useState();
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const handleUpdateProjectData = () => {
        setIsLoading(true);
        updateProject({
            id: project?.id,
            delivery_date: deliveryDate,
            stage: projectStage,
            situation: projectSituation
        }).then(async () => {
            await loadProjectData();
            setIsLoading(false);
        })
    }

    const handleOnUpdateClient = () => {
        setIsLoading(true);
        loadProjectData().then(() => setIsLoading(false))
    }

    const handleDeleteProject = () => {
        setIsLoading(true);
        onClose();
        
        deleteProject(project!.id as any).then(() => {
            router.push('/workspace/projects');

        })
    }

    const loadProjectData = () => {
        return new Promise((resolve, reject) => {
            getHydratedProject(params.id).then((res: any) => {
                setProject(res as IProject);
                setProjectStage(res.stage.id);
                setProjectSituation(res.situation)
                setDeliveryDate(res.delivery_date);
                resolve(res);
            }).catch(err => reject(err))
        })
    }

    useEffect(() => {
        let loaded_stages = false;
        let loaded_project = false;
        getStagesByCompany(userRecoil.company).then((res: any) => {
            setStages(res);

            loaded_stages = true;
            if(loaded_project) setIsLoading(false);
        })

        loadProjectData().then(() => {
            loaded_project = true;
            if(loaded_stages) setIsLoading(false);
        })
    }, []);

    return(
        <>
            <ScrollArea className="w-full" style={{ height: '100vh' }}>
                <div className="container mx-auto mt-10 mb-10 w-full">
                    <Skeleton isLoaded={!isLoading} className="p-4 rounded-lg">
                        <Card>
                            <CardBody>
                                <div className="flex justify-between items-center">
                                    <h1 className="font-medium text-xl">{project?.name}</h1>
                                    <IoArrowBackOutline 
                                        size={30} 
                                        onClick={() => 
                                            router.push('/workspace/projects')
                                        }
                                        className="cursor-pointer"
                                    />
                                </div>
                                <Divider className="my-3" />
                                <ScrollArea className="h-ful">
                                <div className="flex flex-col">
                                    <div className="flex py-4 px-3 mb-3 items-center">
                                        <div className="flex gap-4 items-center">
                                            <p className="text-base font-light">Briefing</p>
                                        </div>
                                        <Divider orientation="vertical" className="mx-6 h-10" />
                                        <p className="font-light ml-auto hover:underline cursor-pointer">Clique aqui para ver o briefing respondido</p>
                                    </div>
                                    <Divider />
                                    <div className="flex py-4 px-3 mb-3 items-center">
                                        <div className="flex gap-4 items-center">
                                            <p className="text-base font-light">Documentos e Anexos</p>
                                        </div>
                                        <Divider orientation="vertical" className="mx-6 h-10" />
                                        <p className="font-light ml-auto hover:underline cursor-pointer">Clique aqui para ver os anexos</p>
                                    </div>
                                    <Divider />
                                    <div className="flex py-4 px-3 mb-3 items-center">
                                        <div className="flex gap-4 items-center">
                                            <p className="text-base font-light">Estágio do Projeto</p>
                                        </div>
                                        <Divider orientation="vertical" className="mx-6 h-10" />
                                        <Select
                                            aria-label="stage"
                                            items={stages}
                                            className="w-1/3 ml-auto"
                                            value={projectStage}
                                            onChange={(ev: any) => setProjectStage(ev.target.value)}
                                            selectedKeys={[projectStage] as any}
                                        >
                                            {(loadedStages: any) => <SelectItem key={loadedStages.id}>{loadedStages.name}</SelectItem>}
                                        </Select>
                                    </div>
                                    <Divider />
                                    <div className="flex py-4 px-3 mb-3 items-center">
                                        <div className="flex gap-4 items-center">
                                            <p className="text-base font-light">Situação contratual</p>
                                        </div>
                                        <Divider orientation="vertical" className="mx-6 h-10" />
                                        <Select
                                            aria-label="situation"
                                            className="w-1/3 ml-auto"
                                            value={projectSituation}
                                            onChange={(ev: any) => setProjectSituation(ev.target.value)}
                                            selectedKeys={[projectSituation] as any}
                                        >
                                            {ContractSituations.map((situation, index) => (
                                                <SelectItem key={index}>{situation}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <Divider />
                                    <div className="flex py-4 px-3 mb-3 items-center">
                                        <div className="flex gap-4 items-center">
                                            <p className="text-base font-light">Data de Entrega Final</p>
                                        </div>
                                        <Divider orientation="vertical" className="mx-6 h-10" />
                                        <Input
                                            type="date" 
                                            className="w-1/3 ml-auto"
                                            value={deliveryDate}
                                            onChange={(ev: any) => setDeliveryDate(ev.target.value)}
                                        />
                                    </div>
                                    <Divider />
                                    <div className="flex py-4 px-3 mb-3 items-center">
                                        <div className="flex gap-4 items-center">
                                            <p className="text-base font-light">Link de Feedback</p>
                                        </div>
                                        <Divider orientation="vertical" className="mx-6 h-10" />
                                        <p className="font-light ml-auto hover:underline cursor-pointer">Clique aqui para ver o link do feedback</p>
                                    </div>
                                    <Divider />
                                    <Button 
                                        color="primary" 
                                        size="lg" 
                                        className="mt-4 ml-auto mr-auto"
                                        onClick={handleUpdateProjectData}
                                    >Salvar alterações</Button>
                                </div>
                                </ScrollArea>
                            </CardBody>
                        </Card>
                        {project && 
                            <CardClient 
                                clientData={project!.client as any} 
                                onUpdate={handleOnUpdateClient} 
                                isLoading={isLoading} 
                            />
                        }
                        <Card className="mt-10">
                            <CardBody>
                                <h1 className="text-red-600 font-medium text-xl">Zona de Risco</h1>
                                <Divider className="mt-5 mb-5" />
                                <div className="flex">
                                    <div className="flex py-4 px-3 mb-3 items-center w-full">
                                        <div className="flex gap-4 items-center">
                                            <p className="text-xl font-base">Excluir projeto definitivamente</p>
                                        </div>
                                        <Divider orientation="vertical" className="mx-6 h-10" />
                                        <FaRegTrashCan 
                                            size={30} 
                                            className="ml-auto mr-auto text-red-500 cursor-pointer" 
                                            onClick={onOpen}
                                        />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Skeleton>
                </div>
            </ScrollArea>
            <ModalDeleteProject
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onOpen={onOpen}
                onDelete={handleDeleteProject}
                project={project!}
            />
        </>
    )
}