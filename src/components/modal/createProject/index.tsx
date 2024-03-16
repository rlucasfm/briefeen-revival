import { userAtom } from "@/atoms/user";
import { getClientsByCompany } from "@/services/clients";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function CreateProjectModal(
    {
        isOpen, 
        onOpen, 
        onOpenChange
    }: 
    {
        isOpen: boolean, 
        onOpen: () => any, 
        onOpenChange: () => any
    }
) {
    const userRecoil = useRecoilValue(userAtom);
    const [step, setStep] = useState(0);
    const [loadedClients, setLoadedClients] = useState([]);

    const onCloseHandle = (onClose: () => any) => {
        setStep(0);
        onClose();
    }

    const loadClients = () => {
        getClientsByCompany(userRecoil.company).then((res: any) => {
            setLoadedClients(res);
            console.log(res);
        })
    }

    useEffect(() => {
        loadClients();
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
                            <Select
                                items={loadedClients}
                                label="Cliente"
                                placeholder="Selecione o seu cliente"
                                className="max-w-xs"
                            >
                                {(loadedClients: any) => <SelectItem key={loadedClients.id}>{loadedClients.name}</SelectItem>}
                            </Select>
                        </>
                        :
                        step === 2 ?
                        // Cadastrar o novo cliente
                        <>
                            <h1>Novo cliente</h1>
                        </>
                        : null
                        }
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onCloseHandle(onClose)}>
                        Cancelar
                        </Button>
                        <Button color="primary" onPress={() => onCloseHandle(onClose)}>
                        Criar
                        </Button>
                    </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}