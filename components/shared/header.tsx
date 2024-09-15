import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import Logo from "./../../app/img/logo.png";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart, UserRoundPlus } from "lucide-react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <div className="flex items-center gap-4 ">
          <Image
            src={Logo}
            alt="logo"
            width={35}
            height={35}
            className="mb-2"
          />
          <div>
            <h1 className="text-2xl uppercase font-black">Next pizza</h1>
            <p className="text-sm text-gray-400 leading">Вкуснее уже некуда</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant={"outline"} className="felx items-center gap-1">
            <UserRoundPlus size={16} /> Войти
          </Button>

          <div>
            <Button className="group relative">
              <b>520.00 тнг</b>
              <span className="h-full w-[1px] bg-white/60 mx-3"></span>
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0 ">
                <ShoppingCart className="h-4 w-4" strokeWidth={2} /> <b>3</b>
              </div>
              <ArrowRight className="w-5 absolute right-7 transition duration-400 translate-x-2   opacity-0 group-hover:opacity-100 group-hover:translate-x-4"></ArrowRight>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
