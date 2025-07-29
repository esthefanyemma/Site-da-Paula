'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

interface DayAvailability {
  date: string;
  hasAvailableSlots: boolean;
  totalSlots: number;
  bookedSlots: number;
}

export default function AgendamentoPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [loading, setLoading] = useState(true);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  useEffect(() => {
    fetchAvailability();
  }, [currentDate]);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/calendar/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: monthStart.toISOString(),
          endDate: monthEnd.toISOString(),
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setAvailability(data.availability);
      }
    } catch (error) {
      console.error('Erro ao buscar disponibilidade:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDayAvailability = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availability.find(day => day.date === dateStr);
  };

  const getDayClass = (date: Date) => {
    const dayAvailability = getDayAvailability(date);
    const isPast = isBefore(date, new Date()) && !isToday(date);
    const isCurrentMonth = isSameMonth(date, currentDate);

    let baseClass = "w-full aspect-square sm:h-12 lg:h-16 sm:aspect-auto rounded-lg sm:rounded-xl flex flex-col items-center justify-center text-xs sm:text-sm lg:text-base font-bold font-krub cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2";
    
    if (!isCurrentMonth) {
      return `${baseClass} text-gray-300 border-gray-100 bg-gray-50/50`;
    }
    
    if (isPast) {
      return `${baseClass} text-gray-400 cursor-not-allowed border-gray-200 bg-gray-100 opacity-50`;
    }
    
    if (isToday(date)) {
      baseClass += " ring-2 ring-blue-400 ring-offset-2";
    }
    
    if (dayAvailability) {
      if (dayAvailability.hasAvailableSlots) {
        return `${baseClass} bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-green-300 hover:from-green-200 hover:to-green-300 hover:border-green-400 shadow-green-100`;
      } else {
        // Dias lotados agora ficam indisponíveis (cinza) em vez de vermelhos
        return `${baseClass} bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 border-gray-200 cursor-not-allowed opacity-75`;
      }
    }
    
    return `${baseClass} bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 border-gray-200 hover:from-gray-100 hover:to-gray-200 hover:border-gray-300`;
  };

  const handleDayClick = (date: Date) => {
    const dayAvailability = getDayAvailability(date);
    const isPast = isBefore(date, new Date()) && !isToday(date);
    const isCurrentMonth = isSameMonth(date, currentDate);
    
    if (!isCurrentMonth || isPast || !dayAvailability?.hasAvailableSlots) {
      return;
    }
    
    const dateStr = format(date, 'yyyy-MM-dd');
    window.location.href = `/agendamento/horarios?date=${dateStr}`;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="min-h-screen w-full bg-verde-claro pt-20 sm:pt-24 pb-0">
    
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-h-[calc(100vh-6rem)]">
        <div className="max-w-3xl mx-auto">
          {/* Header moderno */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-krub text-gray-900 mb-3 sm:mb-4 px-4">
              Agende sua <span className="text-verde-escuro">Aula de Nivelamento</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-dm-sans max-w-2xl mx-auto px-4">
              Escolha o melhor dia para sua primeira aula. Dias em verde têm horários disponíveis.
            </p>
            <div className="w-12 sm:w-16 lg:w-20 h-1 bg-gradient-to-r from-verde-escuro to-verde-claro mx-auto rounded-full mt-3 sm:mt-4"></div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8">
            {/* Cabeçalho do calendário */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <button
                onClick={() => navigateMonth('prev')}
                className="group p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-verde-claro to-verde-escuro hover:from-verde-escuro hover:to-verde-claro transition-all duration-300 text-white shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 sm:w-6 h-5 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="text-center flex-1 mx-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-krub text-gray-900 capitalize">
                  {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                </h2>
                <div className="text-xs sm:text-sm text-gray-500 font-dm-sans mt-1">
                  Selecione uma data disponível
                </div>
              </div>
              
              <button
                onClick={() => navigateMonth('next')}
                className="group p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-verde-claro to-verde-escuro hover:from-verde-escuro hover:to-verde-claro transition-all duration-300 text-white shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 sm:w-6 h-5 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 sm:mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="h-6 sm:h-8 lg:h-10 flex items-center justify-center text-xs sm:text-sm font-bold font-krub text-gray-700 bg-gray-50 rounded-md sm:rounded-lg">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendário */}
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 sm:h-64 bg-gray-50/50 rounded-xl">
                <div className="relative">
                  <div className="animate-spin rounded-full h-10 sm:h-12 w-10 sm:w-12 border-4 border-verde-claro border-t-verde-escuro"></div>
                  <div className="absolute inset-0 rounded-full h-10 sm:h-12 w-10 sm:w-12 border-4 border-transparent border-t-verde-claro animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
                <p className="text-gray-600 font-dm-sans mt-4 text-sm sm:text-base">Carregando disponibilidade...</p>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-6">
                {daysInMonth.map((date, index) => {
                  const dayOfWeek = date.getDay();
                  const dayAvailability = getDayAvailability(date);
                  
                  return (
                    <div key={date.toISOString()} style={{ gridColumnStart: index === 0 ? dayOfWeek + 1 : undefined }}>
                      <div
                        className={getDayClass(date)}
                        onClick={() => handleDayClick(date)}
                      >
                        <span className="text-sm sm:text-base lg:text-lg font-bold">
                          {format(date, 'd')}
                        </span>
                        {dayAvailability && dayAvailability.hasAvailableSlots && (
                          <span className="text-xs text-green-600 font-dm-sans mt-1 hidden sm:block">
                            {dayAvailability.totalSlots - dayAvailability.bookedSlots} vagas
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Legenda moderna */}
            <div className="bg-gray-50/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-100">
              <h3 className="text-sm sm:text-base font-bold font-krub text-gray-900 mb-2 sm:mb-3 text-center">
                Legenda
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-center justify-center gap-2 p-2 sm:p-3 bg-white rounded-md sm:rounded-lg shadow-sm border border-green-100">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-green-100 to-green-200 rounded-sm border-2 border-green-300 flex-shrink-0"></div>
                  <span className="font-dm-sans font-medium text-gray-700 text-xs sm:text-sm">
                    <span className="sm:hidden">Livre</span>
                    <span className="hidden sm:inline">Disponível</span>
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 p-2 sm:p-3 bg-white rounded-md sm:rounded-lg shadow-sm border border-gray-100">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm border-2 border-gray-200 flex-shrink-0"></div>
                  <span className="font-dm-sans font-medium text-gray-700 text-xs sm:text-sm">
                    <span className="sm:hidden">Ocupado</span>
                    <span className="hidden sm:inline">Indisponível</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
