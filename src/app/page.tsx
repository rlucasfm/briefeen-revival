"use client";

import LoginModal from "@/components/modal/login";
import Nav from "@/components/nav";
import { useDisclosure } from "@nextui-org/react";

export default function Home() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    <>
      <Nav onLoginClick={onOpen} />
      <LoginModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
    </>
  );
}
