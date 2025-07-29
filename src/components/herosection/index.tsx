'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function HeroSection() {
    const router = useRouter();
    const pathname = usePathname();

    const handleContactClick = () => {
        if (pathname === '/') {
            const element = document.getElementById('contato');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push('/#contato');
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-verde-claro via-[#A8E6E3] to-[#7FD6D2] pt-20 sm:pt-24 lg:pt-28 overflow-hidden">
            {/* Elementos decorativos de fundo */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-verde-escuro rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-white rounded-full blur-2xl"></div>
            </div>

            {/* Padrão geométrico sutil */}
            <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-20">
                    
                    {/* Conteúdo textual */}
                    <div className="flex flex-col items-center lg:items-start justify-center lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left">
                        
                        {/* Badge de destaque */}
                        <div className="hidden lg:inline-flex items-center px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                            <div className="w-2 h-2 bg-verde-escuro rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                            <span className="text-verde-botao-trans font-dm-sans font-semibold text-xs sm:text-sm">
                                +15 anos de experiência
                            </span>
                        </div>

                        {/* Título principal */}
                        <div className="space-y-2 sm:space-y-4">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-krub font-bold text-gray-900 leading-tight">
                                Aulas de 
                                <span className="text-verde-escuro font-black">
                                    {" "}inglês{" "}
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-verde-escuro to-verde-botao-trans bg-clip-text text-transparent">
                                    personalizadas!
                                </span>
                            </h1>
                        </div>

                        {/* Descrição */}
                        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-dm-sans text-gray-700 leading-relaxed max-w-2xl">
                            Aprenda inglês do seu jeito, no seu tempo. Nossas aulas são feitas sob medida para você, com foco em 
                            <span className="font-semibold text-verde-botao-trans"> conversação, trabalho, viagens</span> ou objetivos pessoais.
                        </p>

                        {/* Estatísticas rápidas */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 py-4">
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold font-krub text-verde-escuro">500+</div>
                                <div className="text-xs sm:text-sm font-dm-sans text-gray-600">Alunos satisfeitos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold font-krub text-verde-escuro">15+</div>
                                <div className="text-xs sm:text-sm font-dm-sans text-gray-600">Anos de experiência</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold font-krub text-verde-escuro">98%</div>
                                <div className="text-xs sm:text-sm font-dm-sans text-gray-600">Taxa de aprovação</div>
                            </div>
                        </div>

                        {/* Botões de ação */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 w-full sm:w-auto">
                            <button 
                                onClick={handleContactClick}
                                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-verde-escuro to-verde-botao-trans text-white rounded-2xl font-dm-sans font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden animate-gradient"
                            >
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <span className="relative flex items-center justify-center">
                                    Entre em contato
                                    <svg className="w-4 sm:w-5 h-4 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </button>
                            
                            <Link 
                                href="/agendamento" 
                                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border-2 border-verde-escuro text-verde-escuro rounded-2xl font-dm-sans font-bold text-base sm:text-lg hover:bg-verde-escuro hover:text-white transition-all duration-300 transform hover:scale-105 text-center"
                            >
                                <span className="flex items-center justify-center">
                                    <span className="hidden sm:inline">Agendar aula gratuita</span>
                                    <span className="sm:hidden">Agendar aula</span>
                                    <svg className="w-4 sm:w-5 h-4 sm:h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Imagem da professora */}
                    <div className="lg:w-1/2 flex justify-center relative mt-8 lg:mt-0">
                        
                        {/* Elementos decorativos ao redor da imagem */}
                        <div className="absolute -top-3 sm:-top-6 -left-3 sm:-left-6 w-16 sm:w-24 h-16 sm:h-24 bg-white/30 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 w-20 sm:w-32 h-20 sm:h-32 bg-verde-escuro/20 rounded-full blur-xl"></div>
                        
                        {/* Container da imagem com efeitos */}
                        <div className="relative group">
                            
                            {/* Anel decorativo animado */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-verde-escuro via-verde-claro to-verde-escuro p-1 animate-spin" style={{animationDuration: '8s'}}>
                                <div className="w-full h-full rounded-full bg-verde-claro"></div>
                            </div>
                            
                            {/* Imagem principal */}
                            <div className="relative z-10 p-2 sm:p-4">
                                <Image 
                                    src="/assets/fotopaulacircular.png" 
                                    alt="Paula - Professora de Inglês" 
                                    width={400} 
                                    height={400} 
                                    className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            </div>

                            {/* Badges flutuantes */}
                            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-white rounded-xl sm:rounded-2xl px-2 sm:px-4 py-1 sm:py-2 shadow-lg animate-bounce">
                                <div className="flex items-center">
                                    <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full mr-1 sm:mr-2"></div>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-700">Online</span>
                                </div>
                            </div>

                            <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl px-2 sm:px-4 py-1 sm:py-2 shadow-lg" style={{animation: 'bounce 2s infinite 1s'}}>
                                <div className="flex items-center">
                                    <svg className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-700">5.0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Indicador de scroll */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
                <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-verde-escuro rounded-full flex justify-center">
                    <div className="w-1 h-2 sm:h-3 bg-verde-escuro rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    )
}