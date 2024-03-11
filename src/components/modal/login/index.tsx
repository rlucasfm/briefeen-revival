"use client";

import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { MdOutlinePassword } from "react-icons/md";
import BriefeenImage from "../../../../public/logo2.png";
import PeopleBrief from "../../../../public/login-unsplash.png";
import {
    Modal, 
    ModalContent, 
    ModalBody, 
    Divider,
    Input,
    Button
} from "@nextui-org/react";
import { useState } from "react";
  
export default function LoginModal(
    {isOpen, onOpen, onOpenChange}: 
    {isOpen: boolean, onOpen: () => any, onOpenChange: () => any}
) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return(
        <>
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                placement="top-center"
                size="3xl"
            >
                <ModalContent>
                {(onClose) => (
                    <ModalBody className="flex flex-col items-center">
                        <div className="max-w-52">
                            <Image src={BriefeenImage} alt="Briefeen" />
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="hidden md:flex" style={{ maxWidth: '50%' }}>
                                <div>
                                    <Image src={PeopleBrief} alt="happy people on briefeen" />
                                </div>
                            </div>
                            <Divider orientation="vertical" />
                            <div className="flex flex-col items-center justify-center w-full">
                                <h1 className="text-2xl">Bem-vindo!</h1>
                                <p className="leading-7 mb-6">Acesse sua conta abaixo</p>
                                <Input
                                    value={username}
                                    onChange={(ev) => setUsername(ev.target.value)}
                                    className="mb-5"
                                    type="email" 
                                    label="Email"
                                    labelPlacement="outside"
                                    startContent={
                                        <CiUser />
                                    }
                                />
                                <Input
                                    value={password}
                                    onChange={(ev) => setPassword(ev.target.value)}
                                    type="password" 
                                    label="Password"
                                    labelPlacement="outside"
                                    startContent={
                                        <MdOutlinePassword />
                                    }
                                />
                                <p className="ml-auto text-xs mt-1">Esqueceu sua senha? <span className="text-blue-700 cursor-pointer hover:underline">Clique aqui</span></p>
                                <Button color="success" size="lg" className="text-white mt-4">Entrar</Button>
                            </div>
                        </div>
                    </ModalBody>
                )}
                </ModalContent>
            </Modal>
        </>
    )
    
}