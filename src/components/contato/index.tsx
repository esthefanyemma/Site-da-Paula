'use client';

import { useState } from 'react';

export default function Contato () {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            // Formatando a mensagem para WhatsApp
            const whatsappMessage = `*Nova mensagem do site!*

*Nome:* ${formData.nome}
*Email:* ${formData.email}
*Telefone:* ${formData.telefone || 'Não informado'}
*Assunto:* ${formData.assunto}

*Mensagem:*
${formData.mensagem}`;

            // Número do WhatsApp da Paula (substitua pelo número real)
            const phoneNumber = '5521984372721'; // Formato: código do país + DDD + número
            
            // Codificando a mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // URL do WhatsApp
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Abrindo WhatsApp
            window.open(whatsappURL, '_blank');
            
            setSubmitMessage('Redirecionando para WhatsApp... Sua mensagem está pronta para envio!');
            
            // Limpando o formulário após 2 segundos
            setTimeout(() => {
                setFormData({
                    nome: '',
                    email: '',
                    telefone: '',
                    assunto: '',
                    mensagem: ''
                });
                setSubmitMessage('');
            }, 2000);
            
        } catch (error) {
            setSubmitMessage('Erro ao processar mensagem. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contato" className="bg-[url(/assets/fundo.png)] bg-cover flex flex-col items-center justify-center px-4 md:px-36 py-20 gap-20">
            <h1 className="text-3xl md:text-5xl font-krub font-bold text-preto text-center">
                Entre em Contato
            </h1>
            
            <div className="w-full max-w-6xl">
                <div className="bg-white rounded-lg shadow-xl p-6 md:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                        {/* Primeira linha - Nome e Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome Completo *
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-escuro focus:border-transparent transition-colors"
                                    placeholder="Seu nome completo"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    E-mail *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-escuro focus:border-transparent transition-colors"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        {/* Segunda linha - Telefone e Assunto */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    id="telefone"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-escuro focus:border-transparent transition-colors"
                                    placeholder="(11) 99999-9999"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                                    Assunto *
                                </label>
                                <input
                                    type="text"
                                    id="assunto"
                                    name="assunto"
                                    value={formData.assunto}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-escuro focus:border-transparent transition-colors"
                                    placeholder="Digite o assunto"
                                />
                            </div>
                        </div>

                        {/* Mensagem */}
                        <div>
                            <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                                Mensagem *
                            </label>
                            <textarea
                                id="mensagem"
                                name="mensagem"
                                value={formData.mensagem}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-escuro focus:border-transparent transition-colors resize-vertical"
                                placeholder="Descreva sua mensagem, dúvida ou solicitação..."
                            />
                        </div>

                        {/* Mensagem de feedback */}
                        {submitMessage && (
                            <div className={`p-4 rounded-lg text-center ${
                                submitMessage.includes('sucesso') 
                                    ? 'bg-green-100 text-green-800 border border-green-200' 
                                    : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                                {submitMessage}
                            </div>
                        )}

                        {/* Botão de envio */}
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-8 py-4 bg-verde-escuro text-white font-semibold rounded-lg hover:bg-verde-botao-trans disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 sm:min-w-[200px] flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Processando...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                                        </svg>
                                        Enviar via WhatsApp
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Informações de contato adicionais */}
                    <div className="lg:pl-8 lg:border-l border-gray-200 pt-8 lg:pt-0 border-t lg:border-t-0 flex justify-center lg:w-80">
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-8 text-center w-full">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-verde-escuro rounded-full flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">E-mail</h3>
                                <p className="text-gray-600 text-sm lg:text-base">contato@paula.com</p>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-verde-escuro rounded-full flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">WhatsApp</h3>
                                <p className="text-gray-600 text-sm lg:text-base">+55 (21) 98437-2721</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-verde-escuro rounded-full flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Modalidade</h3>
                                <p className="text-gray-600 text-sm lg:text-base">Aulas Online</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}