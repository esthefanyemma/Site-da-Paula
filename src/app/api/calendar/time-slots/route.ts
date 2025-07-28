import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/google-calendar';
import { format, parseISO, addDays } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const { date } = await request.json();

    if (!date) {
      return NextResponse.json(
        { error: 'Data é obrigatória' },
        { status: 400 }
      );
    }

    // Verificar se as credenciais do Google estão configuradas
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.log('Google Calendar não configurado, usando dados fictícios');
      
      // Gerar horários fictícios para demonstração
      const timeSlots = [];
      for (let hour = 9; hour < 18; hour++) {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        const isBooked = Math.random() < 0.3; // 30% de chance de estar ocupado
        timeSlots.push({
          time: timeString,
          available: !isBooked
        });
      }

      return NextResponse.json({ timeSlots });
    }

    const calendarService = new GoogleCalendarService();
    
    // Definir o período do dia (00:00 até 23:59)
    const selectedDate = parseISO(date);
    const startOfDay = format(selectedDate, 'yyyy-MM-dd') + 'T00:00:00-03:00';
    const endOfDay = format(addDays(selectedDate, 1), 'yyyy-MM-dd') + 'T00:00:00-03:00';
    
    // Buscar eventos do dia
    const events = await calendarService.getEvents(startOfDay, endOfDay);
    
    // Gerar horários disponíveis
    const timeSlots = calendarService.generateTimeSlots(date);
    
    const slotsWithAvailability = timeSlots.map(time => ({
      time,
      available: !calendarService.isSlotBooked(events, date, time)
    }));

    return NextResponse.json({ timeSlots: slotsWithAvailability });
  } catch (error) {
    console.error('Erro na API de horários:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
