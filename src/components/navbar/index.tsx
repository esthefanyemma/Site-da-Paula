'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (section: string) => {
        // Se estamos na página inicial, apenas faz scroll
        if (pathname === '/') {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Se estamos em outra página, navega para a home com a seção
            router.push(`/#${section}`);
        }
    };

    return (
        <header className="bg-verde-escuro flex flex-row px-12 py-6 justify-between fixed top-0 left-0 right-0 z-50 shadow-lg">
            <Link className="mx-auto md:mx-0" href="/">
                <Image src="/assets/logonome.svg" alt = "Logo da Paula" width = {300} height = {120} className="w-48"/>
            </Link>
            <nav className="flex flex-row gap-12 text-white text-xl font-krub font-semibold items-center">
                <button 
                    className="transition ease-in-out duration-300 hover:scale-110" 
                    onClick={() => handleNavigation('home')}
                >
                    Home
                </button>
                <button 
                    className="transition ease-in-out duration-300 hover:scale-110" 
                    onClick={() => handleNavigation('sobre')}
                >
                    Sobre Mim
                </button>
                <Link className="transition ease-in-out duration-300 hover:scale-110" href="/agendamento">Agendamento</Link>
                <button 
                    className="transition ease-in-out duration-300 hover:scale-110" 
                    onClick={() => handleNavigation('contato')}
                >
                    Contato
                </button>
            </nav>
        </header>
    )
}