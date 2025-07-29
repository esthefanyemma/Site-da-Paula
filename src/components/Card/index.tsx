import React from 'react';

interface CardProps {
    titulo: string;
    texto: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function Card({ titulo, texto, icon, className = "" }: CardProps) {
    return (
        <div className={`group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 ${className}`}>
            {icon && (
                <div className="w-16 h-16 bg-gradient-to-br from-verde-claro to-verde-escuro rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            )}
            <h3 className="text-2xl font-krub font-bold text-gray-900 mb-4">{titulo}</h3>
            <p className="text-gray-600 font-dm-sans leading-relaxed">{texto}</p>
        </div>
    );
}