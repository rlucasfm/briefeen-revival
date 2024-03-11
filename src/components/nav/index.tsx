"use client";

import { IoIosLogIn } from "react-icons/io";
import BriefeenImage from "../../../public/logo2.png"
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link,
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem
} from "@nextui-org/react";
import Image from 'next/image'
import { useState } from "react";

const BriefeenLogo = () => (
  <Image src={BriefeenImage} alt="Briefeen" />
);

export default function Nav({ onLoginClick }: { onLoginClick: () => any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Recursos",
      link: "/"
    },
    {
      label: "Usuários",
      link: "/"
    },
    {
      label: "Planos",
      link: "/"
    },
    {
      label: "Suporte",
      link: "/"
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="max-w-[160px]">
          <BriefeenLogo />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link color="foreground" href={item.link}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex flex-row gap-1 items-center hover:bg-green-100 p-2 rounded-lg">
          <IoIosLogIn />
          <Link onClick={onLoginClick} className="cursor-pointer">Login</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={item.link}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}