import { userAtom } from "@/atoms/user";
import { formatCpfInput, formatPhoneInput } from "@/lib/utils";
import { createClient, getClientsByCompany } from "@/services/clients";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem, Input, CircularProgress } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { IClient } from "@/services/interfaces";
import { getStagesByCompany } from "@/services/stages";
import { createProject } from "@/services/projects";

interface IClientForm {
    nome: string;
    email: string;
    fone: string;
    cpf: string;
    endereco: string;
}

interface IProjectForm {
    nome: string;
    fase: string;
    situacao: string;
    data_entrega: string;
}

const selectClient = yup.object({
    client: yup.string().required('Escolha um cliente')
})


const validationSchema = yup.object({
    nome: yup.string().required('Preencha o campo acima'),
    email: yup.string().required('Preencha o campo acima'),
    fone: yup.string().required('Preencha o campo acima'),
    cpf: yup.string().required('Preencha o campo acima'),
    endereco: yup.string().required('Preencha o campo acima'),
})

const projectSchema = yup.object({
    nome: yup.string().required('Preencha o campo acima'),
    fase: yup.string().required('Preencha o campo acima'),
    situacao: yup.string().required('Preencha o campo acima'),
    data_entrega: yup.string().required('Preencha o campo acima'),
})

export default function CreateProjectModal(
    {
        isOpen, 
        onOpen, 
        onOpenChange,
        onCreate
    }: 
    {
        isOpen: boolean, 
        onOpen: () => any, 
        onOpenChange: () => any,
        onCreate: () => any
    }
) {
    const [isLoading, setIsLoading] = useState(false);
    const { register: registerSelect, handleSubmit: handleSubmitSelect, reset: resetSelect, formState: { errors: errorsSelect } } = useForm<{ client: string }>({ resolver: yupResolver(selectClient) })
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IClientForm>({ resolver: yupResolver(validationSchema) })
    const { register: registerProject, handleSubmit: handleSubmitProject, reset: resetProject, formState: { errors: errorsProject } } = useForm<IProjectForm>({ resolver: yupResolver(projectSchema) })
    const userRecoil = useRecoilValue(userAtom);
    const [step, setStep] = useState(0);
    const [loadedClients, setLoadedClients] = useState([]);
    const [loadedStages, setLoadedStages] = useState([]);
    const [clientToProject, setClientToProject] = useState<IClient>();

    const onCloseHandle = (onClose: () => any) => {
        setStep(0);
        reset();
        resetSelect();
        resetProject();
        onClose();
    }

    const loadClients = () => {
        getClientsByCompany(userRecoil.company).then((res: any) => {
            setLoadedClients(res);
        })
    }

    const loadStages = () => {
        getStagesByCompany(userRecoil.company).then((res: any) => {
            setLoadedStages(res);
        })
    }

    const onSubmit: SubmitHandler<IClientForm> = (data) => {
        setIsLoading(true);
        createClient({
            name: data.nome,
            email: data.email,
            document_number: data.cpf,
            phone: data.fone,
            address: data.endereco,
            company: userRecoil.company
        }).then((res: any) => {
            setClientToProject({
                id: res.id,
                name: data.nome,
                email: data.email,
                document_number: data.cpf,
                phone: data.fone,
                address: data.endereco,
                company: userRecoil.company
            });
            setIsLoading(false);
            setStep(3);
        })
    }

    const onSubmitSelect: SubmitHandler<{ client: string }> = (data) => {
        const selected_client = loadedClients.filter((client: any) => client.id === data.client)[0];
        setClientToProject(selected_client);
        setStep(3);
    }

    const onSubmitProject: SubmitHandler<IProjectForm> = (data) => {
        setIsLoading(true);
        createProject({
            name: data.nome,
            stage: data.fase,
            situation: data.situacao,
            delivery_date: data.data_entrega,
            client: clientToProject?.id!,
            company: userRecoil.company
        }).then((res: any) => {
            setIsLoading(false);
            onCreate();
        })
    }

    useEffect(() => {
        loadClients();
        loadStages();
    }, []);

    return(
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Criar novo projeto</ModalHeader>
                    <ModalBody>
                        {step === 0 ?
                        // Selecionar se será um novo cliente ou um cliente existente
                        <>
                            <h1 className="text-sm font-light">Este projeto será para um cliente já cadastrado no Briefeen, ou para um novo cliente?</h1>
                            <div className="flex mx-auto gap-2">
                                <Button color="primary" variant="light" onClick={() => setStep(1)}>Cliente existente</Button>
                                <Button color="success" variant="light" onClick={() => setStep(2)}>Novo cliente</Button>
                            </div>
                        </>
                        :
                        step === 1 ?
                        // Selecionar o cliente existente
                        <>
                            <h1 className="text-sm font-light">Selecione o cliente no campo abaixo</h1>
                            <form onSubmit={handleSubmitSelect(onSubmitSelect)}>
                                <Select
                                    items={loadedClients}
                                    label="Cliente"
                                    placeholder="Selecione o seu cliente"
                                    className="w-full"
                                    isInvalid={!!errorsSelect.client}
                                    errorMessage={errorsSelect.client && errorsSelect.client.message}
                                    {...registerSelect('client')}
                                >
                                    {(loadedClients: any) => <SelectItem key={loadedClients.id}>{loadedClients.name}</SelectItem>}
                                </Select>
                                <Button 
                                    color="primary"
                                    type="submit"
                                    disabled={isLoading}
                                    className="mt-4"
                                >
                                    {isLoading ? <CircularProgress size="sm" aria-label="Loading..."/> : 'Selecionar'}
                                </Button> 
                            </form>
                        </>
                        :
                        step === 2 ?
                        // Cadastrar o novo cliente
                        <>
                            <h1>Novo cliente</h1>
                            <div className="flex">
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
                                    <Input 
                                        type="text" 
                                        label="Nome" 
                                        placeholder="Coloque o nome do cliente" 
                                        {...register('nome')}
                                        isInvalid={!!errors.nome}
                                        errorMessage={errors.nome && errors.nome.message}
                                    />
                                    <Input 
                                        type="email" 
                                        label="Email" 
                                        placeholder="Coloque o email do cliente"
                                        {...register('email')}
                                        isInvalid={!!errors.email}
                                        errorMessage={errors.email && errors.email.message}
                                    />
                                    <Input 
                                        type="text" 
                                        label="CPF" 
                                        placeholder="Coloque o CPF do cliente"
                                        onInput={formatCpfInput} 
                                        {...register('cpf')}
                                        isInvalid={!!errors.fone}
                                        errorMessage={errors.fone && errors.fone.message}
                                    />
                                    <Input 
                                        type="text" 
                                        label="Fone" 
                                        placeholder="Coloque o telefone do cliente"
                                        onInput={formatPhoneInput}
                                        {...register('fone')}
                                        isInvalid={!!errors.fone}
                                        errorMessage={errors.fone && errors.fone.message}
                                    />
                                    <Input 
                                        type="text" 
                                        label="Endereço" 
                                        placeholder="Coloque o endereço do cliente"
                                        {...register('endereco')}
                                        isInvalid={!!errors.endereco}
                                        errorMessage={errors.endereco && errors.endereco.message}
                                    />
                                    <Button 
                                        color="primary" 
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <CircularProgress size="sm" aria-label="Loading..."/> : 'Criar'}
                                    </Button> 
                                </form>
                            </div>
                        </>
                        : 
                        step === 3 ? 
                        // Cadastrar dados do Projeto
                        <>
                            <h1>Dados do Projeto</h1>
                            <form onSubmit={handleSubmitProject(onSubmitProject)} className="flex flex-col gap-3 w-full">
                                <Input 
                                    type="text" 
                                    label="Nome" 
                                    placeholder="Coloque o nome do projeto" 
                                    {...registerProject('nome')}
                                    isInvalid={!!errorsProject.nome}
                                    errorMessage={errorsProject.nome && errorsProject.nome.message}
                                />
                                <Input 
                                    type="text" 
                                    label="Situação" 
                                    placeholder="Descreva brevemente a situação do projeto" 
                                    {...registerProject('situacao')}
                                    isInvalid={!!errorsProject.situacao}
                                    errorMessage={errorsProject.situacao && errorsProject.situacao.message}
                                />
                                <Select
                                    items={loadedStages}
                                    label="Fase"
                                    placeholder="Selecione em que fase está o projeto"
                                    className="w-full"
                                    {...registerProject('fase')}
                                    isInvalid={!!errorsProject.fase}
                                    errorMessage={errorsProject.fase && errorsProject.fase.message}
                                >
                                    {(loadedStages: any) => <SelectItem key={loadedStages.id}>{loadedStages.name}</SelectItem>}
                                </Select>
                                {/* <input type="date" {...registerProject('data_entrega')} /> */}
                                <Input 
                                    type="date" 
                                    label="Data de Entrega" 
                                    placeholder="Qual a data de entrega final?"
                                    isInvalid={!!errorsProject.data_entrega}
                                    errorMessage={errorsProject.data_entrega && errorsProject.data_entrega.message}
                                    {...registerProject('data_entrega')} 
                                />
                                <Button 
                                    color="primary" 
                                    type="submit"
                                    disabled={isLoading}
                                    className="mt-4"
                                >
                                    {isLoading ? <CircularProgress size="sm" aria-label="Loading..."/> : 'Criar'}
                                </Button> 
                            </form>
                        </>
                        : null
                        }
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="danger" 
                            variant="light" 
                            onPress={() => onCloseHandle(onClose)}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size="sm" aria-label="Loading..."/> : 'Cancelar'}
                        </Button>                        
                    </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}