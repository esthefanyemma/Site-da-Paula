'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigation = (section: string) => {
        setIsOpen(false); // Fecha o menu mobile
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

    const navItems = [
        { label: 'Home', action: () => handleNavigation('home') },
        { label: 'Sobre Mim', action: () => handleNavigation('sobre') },
        { label: 'Agendamento', href: '/agendamento' },
        { label: 'Contato', action: () => handleNavigation('contato') }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-verde-escuro via-[#0EA5A4] to-verde-botao-trans backdrop-blur-md border-b border-verde-claro/20 shadow-2xl">
            {/* Efeito de brilho sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            
            <div className="relative container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    
                    {/* Logo */}
                    <Link className="group relative" href="/">
                        <div className="absolute -inset-2 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <div className="relative">
                            <Image 
                                src="/assets/logonome.svg" 
                                alt="Paula - Logo" 
                                width={200} 
                                height={80} 
                                className="w-40 lg:w-48 h-auto filter drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1 gap-2">
                        {navItems.map((item, index) => (
                            item.href ? (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="group relative px-6 py-3 text-white font-dm-sans font-semibold text-lg transition-all duration-300 hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-verde-claro/20 to-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative z-10 group-hover:text-verde-claro transition-colors duration-300">
                                        {item.label}
                                    </span>
                                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-verde-claro transform -translate-x-1/2 group-hover:w-3/4 transition-all duration-300"></div>
                                </Link>
                            ) : (
                                <button
                                    key={index}
                                    onClick={item.action}
                                    className="group relative px-6 py-3 text-white font-dm-sans font-semibold text-lg transition-all duration-300 hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-verde-claro/20 to-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative z-10 group-hover:text-verde-claro transition-colors duration-300">
                                        {item.label}
                                    </span>
                                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-verde-claro transform -translate-x-1/2 group-hover:w-3/4 transition-all duration-300"></div>
                                </button>
                            )
                        ))}
                        
                        {/* CTA Button */}
                        <div className="ml-4">
                            <button
                                onClick={() => handleNavigation('contato')}
                                className="group relative px-6 py-3 bg-white text-verde-escuro font-dm-sans font-bold rounded-xl hover:bg-verde-claro hover:text-verde-botao-trans transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-verde-claro to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                                <span className="relative z-10 flex items-center">
                                    Fale Conosco
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden relative p-3 text-white hover:bg-white/10 rounded-xl transition-colors duration-300"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                            <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                            <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                        </div>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-2 border border-white/20">
                        <nav className="space-y-2">
                            {navItems.map((item, index) => (
                                item.href ? (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 text-white font-dm-sans font-semibold hover:bg-white/10 rounded-xl transition-colors duration-300"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={item.action}
                                        className="block w-full text-left px-4 py-3 text-white font-dm-sans font-semibold hover:bg-white/10 rounded-xl transition-colors duration-300"
                                    >
                                        {item.label}
                                    </button>
                                )
                            ))}
                            <div className="pt-2">
                                <button
                                    onClick={() => handleNavigation('contato')}
                                    className="w-full px-4 py-3 bg-white text-verde-escuro font-dm-sans font-bold rounded-xl hover:bg-verde-claro transition-colors duration-300"
                                >
                                    Fale Conosco
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}