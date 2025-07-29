'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Footer() {
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
        <footer className="bg-verde-escuro text-white">
            {/* Seção principal do footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo e descrição */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <Image 
                                src="/assets/logonome.svg" 
                                alt="Logo da Paula" 
                                width={200} 
                                height={80} 
                                className="w-48 h-auto"
                            />
                        </Link>
                        <p className="text-verde-claro mb-4 text-sm leading-relaxed">
                            Ensino de inglês personalizado há mais de 15 anos. 
                            Transformando vidas através do aprendizado de idiomas com metodologia única e atenção individual.
                        </p>
                        <div className="flex space-x-4">
                            {/* Redes sociais */}
                            <a 
                                href="https://www.instagram.com/paulacalmon.elt?igsh=aHZnZWw0eHU0b3M2" 
                                className="w-10 h-10 bg-verde-claro rounded-full flex items-center justify-center hover:bg-white hover:text-verde-escuro transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <Image 
                                    src="/assets/instagram.png"
                                    alt="Instagram"
                                    width={24}
                                    height={24}
                                    className="w-5 h-5"
                                />
                            </a>
                            <a 
                                href="https://api.whatsapp.com/send?phone=5521984372721&text=Ol%C3%A1%20Paula,%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20as%20aulas%20de%20ingl%C3%AAs."
                                className="w-10 h-10 bg-verde-claro rounded-full flex items-center justify-center hover:bg-white hover:text-verde-escuro transition-colors duration-300"
                                aria-label="WhatsApp"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <button 
                                    onClick={() => handleNavigation('home')}
                                    className="text-verde-claro hover:text-white transition-colors duration-300 text-left"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleNavigation('sobre')}
                                    className="text-verde-claro hover:text-white transition-colors duration-300 text-left"
                                >
                                    Sobre Mim
                                </button>
                            </li>
                            <li>
                                <Link href="/agendamento" className="text-verde-claro hover:text-white transition-colors duration-300">
                                    Agendamento
                                </Link>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleNavigation('contato')}
                                    className="text-verde-claro hover:text-white transition-colors duration-300 text-left"
                                >
                                    Contato
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Informações de contato */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contato</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-verde-claro mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-verde-claro">+55 (21) 98437-2721</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-verde-claro mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-verde-claro">contato@paula.com</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-verde-claro mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-verde-claro">
                                    <div>Seg - Sex: 8h às 18h</div>
                                    <div>Sáb: 8h às 12h</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Linha divisória */}
            <div className="border-t border-verde-botao-trans">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-verde-claro">
                        <div className="mb-4 md:mb-0">
                            <p>&copy; 2025 Paula - Ensino de Inglês. Todos os direitos reservados.</p>
                        </div>
                        <div className="flex space-x-6">
                            <Link href="/privacidade" className="hover:text-white transition-colors duration-300">
                                Política de Privacidade
                            </Link>
                            <Link href="/termos" className="hover:text-white transition-colors duration-300">
                                Termos de Uso
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
