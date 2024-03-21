import { IClientForm } from "@/lib/common_interfaces";
import { formatCpfInput, formatPhoneInput } from "@/lib/utils";
import { updateClient } from "@/services/clients";
import { IClient } from "@/services/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardBody, CircularProgress, Divider, Input } from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup"

const validationSchema = yup.object({
    nome: yup.string().required('Preencha o campo acima'),
    email: yup.string().required('Preencha o campo acima'),
    fone: yup.string().required('Preencha o campo acima'),
    cpf: yup.string().required('Preencha o campo acima'),
    endereco: yup.string().required('Preencha o campo acima'),
})

export default function CardClient(
    {
        clientData, 
        onUpdate, 
        isLoading
    }: {
        clientData: IClient, 
        onUpdate: () => any, 
        isLoading: boolean
    }) {

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors } 
    } = useForm<IClientForm>({ resolver: yupResolver(validationSchema) })

    const onSubmit: SubmitHandler<IClientForm> = (data) => {
        updateClient({
            id: clientData.id,
            name: data.nome,
            email: data.email,
            phone: data.fone,
            document_number: data.cpf,
            address: data.endereco,
            company: clientData.company
        }).then(() => {
            onUpdate();
        })
    }

    return(
        <Card className="mt-10">
            <CardBody>
                <div className="flex justify-between items-center">
                    <h1 className="font-medium text-xl mb-3">Cliente</h1>
                </div>
                <Divider />
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
                    <div className="flex py-3 items-center">
                        <Input 
                            type="text" 
                            label="Nome"
                            {...register('nome')}
                            defaultValue={clientData.name}
                            isInvalid={!!errors.nome}
                            errorMessage={errors.nome && errors.nome.message}
                        />
                    </div>
                    <div className="flex py-3 items-center">
                        <Input 
                            type="email" 
                            label="Email" 
                            placeholder="Coloque o email do cliente"
                            {...register('email')}
                            defaultValue={clientData.email}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email && errors.email.message}
                        />
                    </div>
                    <div className="flex py-3 items-center">
                        <Input 
                            type="text" 
                            label="CPF" 
                            placeholder="Coloque o CPF do cliente"
                            onInput={formatCpfInput} 
                            {...register('cpf')}
                            defaultValue={clientData.document_number}
                            isInvalid={!!errors.cpf}
                            errorMessage={errors.cpf && errors.cpf.message}
                        />
                    </div>
                    <div className="flex py-3 items-center">
                        <Input 
                            type="text" 
                            label="Fone" 
                            placeholder="Coloque o telefone do cliente"
                            onInput={formatPhoneInput}
                            {...register('fone')}
                            defaultValue={clientData.phone}
                            isInvalid={!!errors.fone}
                            errorMessage={errors.fone && errors.fone.message}
                        />
                    </div>
                    <div className="flex py-3 items-center">
                        <Input 
                            type="text" 
                            label="Endereço" 
                            placeholder="Coloque o endereço do cliente"
                            {...register('endereco')}
                            defaultValue={clientData.address}
                            isInvalid={!!errors.endereco}
                            errorMessage={errors.endereco && errors.endereco.message}
                        />
                    </div>
                    <Divider />
                    <Button 
                        color="primary" 
                        type="submit"
                        size="lg"
                        className="mt-4 ml-auto mr-auto"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size="sm" aria-label="Loading..."/> : 'Salvar alterações'}
                    </Button> 
                </form>
            </CardBody>
        </Card>
    )
}