"use client"
import Logo from "@/assets/logoComFundo-removebg-preview.png"
import Image from "next/image"
import { ModalCreateTask } from "./ModalCreateTask"

export default function Tasks() {
    return (
        <main className="w-full h-screen bg-[#24427D] flex flex-col items-center justify-start relative">
            <Image
                src={Logo.src}
                width={500}
                height={128}
                alt="logo"
            />
            <ModalCreateTask/>
        </main>
    )
}