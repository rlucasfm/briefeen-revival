"use client";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button, Card, CardBody, Divider, Input, Select, SelectItem, Skeleton } from "@nextui-org/react";
import { useAuth } from "@/services/auth";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/user";
import { getStagesByCompany } from "@/services/stages";
import { getHydratedProject, updateProject } from "@/services/projects";
import { IProject } from "@/services/interfaces";

export default function Page({ params }: { params: { id: string }}) {
    const auth = useAuth();
    const router = useRouter();
    const userRecoil = useRecoilValue(userAtom);
    const [isLoading, setIsLoading] = useState(true);
    const [stages, setStages] = useState([]);
    const [project, setProject] = useState<IProject>();
    const [projectSituation, setProjectSituation] = useState();
    const [deliveryDate, setDeliveryDate] = useState();

    const handleUpdateProjectData = () => {
        setIsLoading(true);
        updateProject({
            id: project?.id,
            delivery_date: deliveryDate,
            stage: projectSituation
        }).then(async () => {
            await loadProjectData();
            setIsLoading(false);
        })
    }

    const loadProjectData = () => {
        return new Promise((resolve, reject) => {
            getHydratedProject(params.id).then((res: any) => {
                setProject(res as IProject);
                setProjectSituation(res.stage.id);
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
                                            <p className="text-base font-light">Situação do cliente</p>
                                        </div>
                                        <Divider orientation="vertical" className="mx-6 h-10" />
                                            <Select
                                                aria-label="stage"
                                                items={stages}
                                                className="w-1/3 ml-auto"
                                                value={projectSituation}
                                                onChange={(ev: any) => setProjectSituation(ev.target.value)}
                                                selectedKeys={[projectSituation] as any}
                                            >
                                                {(loadedStages: any) => <SelectItem key={loadedStages.id}>{loadedStages.name}</SelectItem>}
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
                        <Card className="mt-10">
                            <CardBody>
                                <div className="flex justify-between items-center">
                                    <h1 className="font-medium text-xl mb-3">Cliente</h1>
                                </div>
                                <Divider />
                                <div className="flex py-4 px-3 mb-3 items-center">
                                    <div className="flex gap-4 items-center">
                                        <p className="text-base font-medium">Nome</p>
                                    </div>
                                    <Divider orientation="vertical" className="mx-6 h-10" />
                                    <p className="font-light ml-auto hover:underline">Cliente Teste</p>
                                </div>
                                <Divider />
                                <div className="flex py-4 px-3 mb-3 items-center">
                                    <div className="flex gap-4 items-center">
                                        <p className="text-base font-medium">Email</p>
                                    </div>
                                    <Divider orientation="vertical" className="mx-6 h-10" />
                                    <p className="font-light ml-auto hover:underline">cliente@teste.com</p>
                                </div>
                                <Divider />
                                <div className="flex py-4 px-3 mb-3 items-center">
                                    <div className="flex gap-4 items-center">
                                        <p className="text-base font-medium">Telefone</p>
                                    </div>
                                    <Divider orientation="vertical" className="mx-6 h-10" />
                                    <p className="font-light ml-auto hover:underline">(99) 99199-7205</p>
                                </div>
                                <Divider />
                                <div className="flex py-4 px-3 mb-3 items-center">
                                    <div className="flex gap-4 items-center">
                                        <p className="text-base font-medium">Documento</p>
                                    </div>
                                    <Divider orientation="vertical" className="mx-6 h-10" />
                                    <p className="font-light ml-auto hover:underline">999.999.999-99</p>
                                </div>
                                <Divider />
                                <div className="flex py-4 px-3 mb-3 items-center">
                                    <div className="flex gap-4 items-center">
                                        <p className="text-base font-medium">Endereço</p>
                                    </div>
                                    <Divider orientation="vertical" className="mx-6 h-10" />
                                    <p className="font-light ml-auto hover:underline cursor-pointer">Endereço do Cliente, rua Tal. Numero tal.</p>
                                </div>
                                <Divider />
                            </CardBody>
                        </Card>
                    </Skeleton>
                </div>
            </ScrollArea>
        </>
    )
}