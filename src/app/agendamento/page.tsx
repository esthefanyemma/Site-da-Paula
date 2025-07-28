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

    let baseClass = "w-full h-16 border border-dashed flex items-center justify-center text-sm font-medium cursor-pointer transition-colors";
    
    if (!isCurrentMonth) {
      return `${baseClass} text-gray-300 border-gray-100`;
    }
    
    if (isPast) {
      return `${baseClass} text-gray-400 cursor-not-allowed border-gray-400`;
    }
    
    if (isToday(date)) {
      baseClass += " border-blue-500";
    }
    
    if (dayAvailability) {
      if (dayAvailability.hasAvailableSlots) {
        return `${baseClass} bg-green-100 text-green-800 hover:bg-green-200`;
      } else {
        return `${baseClass} bg-red-100 text-red-800 cursor-not-allowed`;
      }
    }
    
    return `${baseClass} bg-gray-100 text-gray-800 hover:bg-gray-200`;
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
    <div className="min-h-screen w-full bg-gray-50 pt-[7.8rem]">
    
      <div className="w-full px-4 py-8 bg-[url(/assets/fundo.png)]">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold font-krub text-gray-900 mb-8 text-center">
            Agende Aula Diagnóstico
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Cabeçalho do calendário */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <h2 className="text-xl font-semibold text-gray-900">
                {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
              </h2>
              
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-0 mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="h-12 flex items-center justify-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendário */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-0">
                {daysInMonth.map((date, index) => {
                  const dayOfWeek = date.getDay();
                  const startOffset = index === 0 ? dayOfWeek : 0;
                  
                  return (
                    <div key={date.toISOString()} style={{ gridColumnStart: index === 0 ? dayOfWeek + 1 : undefined }}>
                      <div
                        className={getDayClass(date)}
                        onClick={() => handleDayClick(date)}
                      >
                        {format(date, 'd')}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Legenda */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 rounded"></div>
                <span>Disponível</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 rounded"></div>
                <span>Lotado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span>Indisponível</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
