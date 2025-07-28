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
            // Aqui você pode integrar com um serviço de email ou API
            // Por enquanto, vamos simular o envio
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            setFormData({
                nome: '',
                email: '',
                telefone: '',
                assunto: '',
                mensagem: ''
            });
        } catch (error) {
            setSubmitMessage('Erro ao enviar mensagem. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contato" className="bg-[url(/assets/fundo.png)] bg-cover flex flex-col items-center justify-center px-4 md:px-36 py-20 gap-20">
            <h1 className="text-3xl md:text-5xl font-krub font-bold text-preto text-center">
                Entre em Contato
            </h1>
            
            <div className="max-w-4xl">
                <div className="bg-white rounded-lg shadow-xl p-12 md:p-12 flex flex-row gap-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Primeira linha - Nome e Email */}
                        <div className="grid md:grid-cols-2 gap-6">
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
                        <div className="grid md:grid-cols-2 gap-6">
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
                                className="w-full md:w-auto px-8 py-4 bg-verde-escuro text-white font-semibold rounded-lg hover:bg-verde-botao-trans disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 min-w-[200px]"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Enviando...
                                    </div>
                                ) : (
                                    'Enviar Mensagem'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Informações de contato adicionais */}
                    <div className="pl-8 border-l border-gray-200 flex justify-center">
                        <div className="grid grid-rows-3 gap-8 text-center">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-verde-escuro rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">E-mail</h3>
                                <p className="text-gray-600">contato@paula.com</p>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-verde-escuro rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Telefone</h3>
                                <p className="text-gray-600">(11) 99999-9999</p>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-verde-escuro rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Localização</h3>
                                <p className="text-gray-600">São Paulo, SP</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}