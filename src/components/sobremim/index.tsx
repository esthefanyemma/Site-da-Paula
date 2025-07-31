import Image from "next/image";
import Card from "../Card";

export default function SobreMim () {
    return (
        <section id="sobre" className="relative py-20 px-4 lg:px-8 bg-gradient-to-t from-[#5AC2C3] to-verde-claro overflow-hidden">
            {/* Elementos decorativos de fundo */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl">
                
                {/* Cabeçalho da seção */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-krub font-bold text-gray-900 mb-6">
                        Sobre <span className="text-verde-escuro">Mim</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-verde-escuro to-verde-claro mx-auto rounded-full"></div>
                </div>

                {/* Conteúdo principal */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    
                    {/* Lado esquerdo - Texto */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <p className="text-xl lg:text-2xl font-dm-sans text-gray-700 leading-relaxed">
                                Fundei minha instituição de inglês há mais de <span className="font-bold text-verde-escuro">9 anos</span>, 
                                e desde então venho desenvolvendo um trabalho <span className="font-bold text-verde-botao-trans">personalizado</span> 
                                para cada aluno que passa por aqui.
                            </p>
                            <p className="text-lg font-dm-sans text-gray-600 leading-relaxed">
                                Minha experiência no mercado me permite entender as necessidades específicas de cada estudante, 
                                criando um ambiente de aprendizado único que combina metodologia comprovada com abordagem individual.
                            </p>
                        </div>

                        {/* Estatísticas */}
                        <div className="grid grid-cols-2 gap-8 py-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold font-krub text-verde-escuro mb-2">100+</div>
                                <div className="text-sm font-dm-sans text-gray-600 uppercase tracking-wide">Alunos Formados</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold font-krub text-verde-escuro mb-2">17+</div>
                                <div className="text-sm font-dm-sans text-gray-600 uppercase tracking-wide">Anos de Experiência</div>
                            </div>
                        </div>

                        {/* Certificações/Qualificações */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-krub font-bold text-gray-900">Qualificações</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-verde-escuro rounded-full mr-4"></div>
                                    <span className="text-gray-700 font-dm-sans">Certificação Internacional em Ensino de Inglês</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-verde-escuro rounded-full mr-4"></div>
                                    <span className="text-gray-700 font-dm-sans">Especialização em Metodologias Ativas</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-verde-escuro rounded-full mr-4"></div>
                                    <span className="text-gray-700 font-dm-sans">Formação Continuada em Tecnologias Educacionais</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lado direito - Imagem */}
                    <div className="relative">
                        <div className="relative group">
                            {/* Background decorativo */}
                            <div className="absolute inset-0 bg-gradient-to-br from-verde-claro to-verde-escuro rounded-3xl transform rotate-6 group-hover:rotate-3 transition-transform duration-500"></div>
                            
                            {/* Container da imagem */}
                            <div className="relative bg-white p-6 rounded-3xl shadow-2xl">
                                <Image 
                                    src="/assets/fotopaula.png" 
                                    alt="Paula - Professora de Inglês" 
                                    width={400} 
                                    height={500} 
                                    className="w-full h-96 object-cover rounded-2xl"
                                />
                                
                                {/* Badge flutuante */}
                                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-6 py-4 shadow-xl border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold font-krub text-verde-escuro">98%</div>
                                            <div className="text-xs font-dm-sans text-gray-600">Satisfação</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards de Missão, Visão e Valores */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <div className="w-16 h-16 bg-gradient-to-br from-verde-claro to-verde-escuro rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-krub font-bold text-gray-900 mb-4">Missão</h3>
                        <p className="text-gray-600 font-dm-sans leading-relaxed">
                            Transformar vidas através do ensino personalizado de inglês, capacitando nossos alunos a alcançar seus objetivos pessoais e profissionais com confiança e fluência.
                        </p>
                    </div>

                    <div className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <div className="w-16 h-16 bg-gradient-to-br from-verde-claro to-verde-escuro rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-krub font-bold text-gray-900 mb-4">Visão</h3>
                        <p className="text-gray-600 font-dm-sans leading-relaxed">
                            Ser reconhecida como a principal referência em ensino personalizado de inglês, criando uma comunidade global de falantes confiantes e bem-sucedidos.
                        </p>
                    </div>

                    <div className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <div className="w-16 h-16 bg-gradient-to-br from-verde-claro to-verde-escuro rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-krub font-bold text-gray-900 mb-4">Valores</h3>
                        <p className="text-gray-600 font-dm-sans leading-relaxed">
                            Excelência no ensino, atenção individual, inovação pedagógica, respeito à diversidade e compromisso com o sucesso de cada aluno em sua jornada de aprendizado.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}