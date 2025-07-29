'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
}

export default function HorariosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dateParam = searchParams.get('date');
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (dateParam) {
      const date = parse(dateParam, 'yyyy-MM-dd', new Date());
      setSelectedDate(date);
      fetchTimeSlots(dateParam);
    }
  }, [dateParam]);

  const fetchTimeSlots = async (date: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/calendar/time-slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setTimeSlots(data.timeSlots);
      }
    } catch (error) {
      console.error('Erro ao buscar horários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTime) {
      alert('Por favor, selecione um horário.');
      return;
    }

    setSubmitting(true);
    
    try {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: dateParam,
          time: selectedTime,
          client: formData
        }),
      });

      if (response.ok) {
        alert('Agendamento realizado com sucesso!');
        router.push('/agendamento');
      } else {
        const error = await response.json();
        alert(`Erro ao realizar agendamento: ${error.message}`);
      }
    } catch (error) {
      console.error('Erro ao enviar agendamento:', error);
      alert('Erro ao realizar agendamento. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedDate) {
    return (
      <div className="min-h-screen w-full bg-gray-50 pt-24 pb-0">
        <div className="w-full px-4 py-8 bg-[url(/assets/fundo.png)] min-h-[calc(100vh-6rem)]">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold font-krub text-gray-900 mb-3">Data Inválida</h1>
              <p className="text-gray-600 font-dm-sans mb-8">A data selecionada não é válida. Por favor, retorne ao calendário e selecione uma data disponível.</p>
              <button
                onClick={() => router.push('/agendamento')}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-verde-escuro to-verde-botao-trans text-white font-bold font-dm-sans rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar ao Calendário
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 pt-20 pb-0">
      
      <div className="w-full px-4 py-8 bg-[url(/assets/fundo.png)] min-h-[calc(100vh-5rem)]">
        <div className="max-w-5xl mx-auto">
          <div className="mt-4">
            <button
              onClick={() => router.push('/agendamento')}
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-verde-escuro text-verde-escuro hover:bg-verde-escuro hover:text-white font-semibold font-dm-sans rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar ao Calendário
            </button>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-krub text-gray-900 mb-3">
              Selecionar Horário
            </h1>
            <p className="text-lg text-gray-700 font-dm-sans">
              {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Seleção de Horários */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-verde-escuro rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold font-krub text-gray-900">
                  Horários Disponíveis
                </h2>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-verde-claro border-t-verde-escuro"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-4 rounded-xl text-sm font-semibold font-dm-sans transition-all duration-200 transform hover:scale-105 ${
                        slot.available
                          ? selectedTime === slot.time
                            ? 'bg-verde-escuro text-white shadow-lg ring-2 ring-verde-claro'
                            : 'bg-verde-claro text-verde-botao-trans hover:bg-verde-escuro hover:text-white shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
              
              {!loading && timeSlots.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-dm-sans">Nenhum horário disponível para esta data</p>
                </div>
              )}
            </div>

            {/* Formulário */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-verde-escuro rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold font-krub text-gray-900">
                  Seus Dados
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold font-dm-sans text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-verde-claro focus:border-verde-escuro transition-colors font-dm-sans"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-dm-sans text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-verde-claro focus:border-verde-escuro transition-colors font-dm-sans"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-dm-sans text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-verde-claro focus:border-verde-escuro transition-colors font-dm-sans"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-dm-sans text-gray-700 mb-2">
                    Tipo de Aula *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-verde-claro focus:border-verde-escuro transition-colors font-dm-sans"
                  >
                    <option value="">Selecione o tipo de aula</option>
                    <option value="diagnostico">Aula Diagnóstico</option>
                    <option value="regular">Aula Regular</option>
                    <option value="intensivo">Aula Intensiva</option>
                    <option value="conversacao">Conversação</option>
                    <option value="preparatorio">Preparatório para Exames</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold font-dm-sans text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-verde-claro focus:border-verde-escuro transition-colors font-dm-sans resize-none"
                    placeholder="Conte-nos um pouco sobre seu nível de inglês, objetivos ou qualquer informação que considere importante..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedTime || submitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-verde-escuro to-verde-botao-trans text-white font-bold font-dm-sans text-lg rounded-xl hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Agendando...
                    </div>
                  ) : (
                    'Confirmar Agendamento'
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* Informações Adicionais */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-verde-escuro rounded-full mr-3"></div>
              <h3 className="text-xl font-bold font-krub text-gray-900">Informações Importantes</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-verde-claro rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-3 h-3 text-verde-botao-trans" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold font-dm-sans text-gray-900">Duração da Aula</h4>
                    <p className="text-gray-600 font-dm-sans text-sm">60 minutos de aula personalizada</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-verde-claro rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-3 h-3 text-verde-botao-trans" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold font-dm-sans text-gray-900">Modalidade</h4>
                    <p className="text-gray-600 font-dm-sans text-sm">Online via Google Meet ou presencial</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-verde-claro rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-3 h-3 text-verde-botao-trans" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold font-dm-sans text-gray-900">Material Incluso</h4>
                    <p className="text-gray-600 font-dm-sans text-sm">Material didático personalizado para seu nível</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-verde-claro rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-3 h-3 text-verde-botao-trans" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold font-dm-sans text-gray-900">Confirmação</h4>
                    <p className="text-gray-600 font-dm-sans text-sm">Você receberá uma confirmação por email e WhatsApp</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-verde-claro rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-3 h-3 text-verde-botao-trans" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold font-dm-sans text-gray-900">Cancelamento</h4>
                    <p className="text-gray-600 font-dm-sans text-sm">Cancele com até 24h de antecedência</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-verde-claro rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-3 h-3 text-verde-botao-trans" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold font-dm-sans text-gray-900">Suporte</h4>
                    <p className="text-gray-600 font-dm-sans text-sm">Atendimento personalizado durante todo o processo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
