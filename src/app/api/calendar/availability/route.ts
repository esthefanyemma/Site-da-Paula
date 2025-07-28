import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/google-calendar';
import { format, eachDayOfInterval, parseISO } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const { startDate, endDate } = await request.json();

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate e endDate são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se as credenciais do Google estão configuradas
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.log('Google Calendar não configurado, usando dados fictícios');
      
      // Retornar dados fictícios para demonstração
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      const daysInPeriod = eachDayOfInterval({ start, end });
      
      const availability = daysInPeriod.map(date => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const dayOfWeek = date.getDay();
        
        // Simular disponibilidade: fins de semana indisponíveis, alguns dias da semana lotados
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isRandomBusy = Math.random() < 0.3; // 30% de chance de estar lotado
        
        return {
          date: dateStr,
          hasAvailableSlots: !isWeekend && !isRandomBusy,
          totalSlots: isWeekend ? 0 : 9, // 9 slots de 9h às 18h
          bookedSlots: isWeekend ? 0 : isRandomBusy ? 9 : Math.floor(Math.random() * 3),
        };
      });

      return NextResponse.json({ availability });
    }

    const calendarService = new GoogleCalendarService();
    
    // Buscar eventos do período
    const events = await calendarService.getEvents(startDate, endDate);
    
    // Gerar lista de dias no período
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const daysInPeriod = eachDayOfInterval({ start, end });
    
    const availability = daysInPeriod.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      
      // Gerar horários de trabalho para este dia
      const timeSlots = calendarService.generateTimeSlots(dateStr);
      
      // Verificar quantos horários estão disponíveis
      const availableSlots = timeSlots.filter(time => 
        !calendarService.isSlotBooked(events, dateStr, time)
      );
      
      return {
        date: dateStr,
        hasAvailableSlots: availableSlots.length > 0,
        totalSlots: timeSlots.length,
        bookedSlots: timeSlots.length - availableSlots.length,
      };
    });

    return NextResponse.json({ availability });
  } catch (error) {
    console.error('Erro na API de disponibilidade:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
