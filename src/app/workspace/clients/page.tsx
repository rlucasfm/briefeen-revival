"use client";

import { CiCirclePlus } from "react-icons/ci";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, Card, CardBody, Divider } from "@nextui-org/react";
import { userAtom } from "@/atoms/user";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getClientsByCompany } from "@/services/client";

const ClientItem = ({name, stage}: {name: string, stage: string}) => {
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
    const [userRecoil, setUserRecoil] = useRecoilState(userAtom);
    const [loadedClients, setLoadedClients] = useState<any[]>([]);

    useEffect(() => {
        getClientsByCompany(userRecoil.company).then((res: any) =>{
            setLoadedClients(res);
        })
    }, [])

    console.log(loadedClients);

    return(
        <div className="container mx-auto mt-20">
            <Card>
                <CardBody style={{ height: '80vh' }}>
                    <div className="flex justify-between items-center">
                        <h1 className="font-medium">Clientes</h1>
                        <CiCirclePlus size={25} className="cursor-pointer" />
                    </div>
                    <Divider className="my-3" />
                    <ScrollArea className="h-full">
                        <div className="flex flex-col gap-4">
                            {loadedClients.map((client, index) => 
                                <ClientItem name={client.name} stage={(client.stage)} key={index} />
                            )}
                        </div>
                    </ScrollArea>
                </CardBody>
            </Card>
            
        </div>
    )
}