import { IProject } from "@/services/interfaces"
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useState } from "react"

export default function ModalDeleteProject(    {
    isOpen, 
    onOpen, 
    onOpenChange,
    onDelete,
    project
}: 
{
    isOpen: boolean, 
    onOpen: () => any, 
    onOpenChange: () => any,
    onDelete: () => any,
    project: IProject
}) {
    const [inputProject, setInputProject] = useState('');

    const handleDelete = () => {
        if(inputProject === project.name) {
            onDelete();
        }
    }

    return(
        <>
        {project ?
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="p-2">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Deletar projeto</ModalHeader>
                            <ModalBody>
                                <div className="text-light font-base flex flex-col gap-1">
                                    <p className="text-center mb-1">Você está prestes a apagar o projeto: <strong>{project.name}</strong>. </p>
                                    <p>Apagar o projeto implica em perder DEFINITIVAMENTE todos os dados do projeto.</p>  
                                    <Divider className="mt-5 mb-5" />
                                    <p>Caso você tenha certeza disto, coloque abaixo o nome do projeto e confirme</p>
                                </div>
                                <Input
                                    className="w-full"
                                    placeholder="Nome do projeto"
                                    value={inputProject}
                                    onChange={(ev: any) => setInputProject(ev.target.value)}
                                    isInvalid={inputProject !== project.name}
                                />
                                <div className="flex items-center gap-2 ml-auto mr-auto mt-2">
                                    <Button size="lg" color="primary" onClick={onClose}>Cancelar</Button>
                                    <Button size="lg" color="danger" onClick={handleDelete}>Deletar</Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        : null}
        </>
        
        
    )
}