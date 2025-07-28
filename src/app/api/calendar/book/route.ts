import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/google-calendar';
import { format, parseISO } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const { date, time, client } = await request.json();

    if (!date || !time || !client) {
      return NextResponse.json(
        { error: 'Data, horário e dados do cliente são obrigatórios' },
        { status: 400 }
      );
    }

    // Validar dados do cliente
    if (!client.name || !client.email || !client.phone || !client.service) {
      return NextResponse.json(
        { error: 'Nome, email, telefone e tipo de serviço são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se as credenciais do Google estão configuradas
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.log('Google Calendar não configurado, simulando agendamento');
      
      // Simular agendamento bem-sucedido
      return NextResponse.json({ 
        success: true, 
        eventId: 'demo-' + Date.now(),
        message: 'Agendamento simulado com sucesso! (Configure o Google Calendar para funcionalidade completa)' 
      });
    }

    const calendarService = new GoogleCalendarService();
    
    // Verificar se o horário ainda está disponível
    const selectedDate = parseISO(date);
    const startOfDay = format(selectedDate, 'yyyy-MM-dd') + 'T00:00:00-03:00';
    const endOfDay = format(selectedDate, 'yyyy-MM-dd') + 'T23:59:59-03:00';
    
    const events = await calendarService.getEvents(startOfDay, endOfDay);
    const isBooked = calendarService.isSlotBooked(events, date, time);
    
    if (isBooked) {
      return NextResponse.json(
        { error: 'Este horário não está mais disponível' },
        { status: 409 }
      );
    }

    // Criar evento no Google Calendar
    const startDateTime = `${date}T${time}:00-03:00`;
    
    // Calcular horário de fim (1 hora depois)
    const [hours, minutes] = time.split(':').map(Number);
    const endHour = hours + 1;
    const endTime = `${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const endDateTime = `${date}T${endTime}:00-03:00`;
    
    const eventData = {
      summary: `${client.service} - ${client.name}`,
      description: `
Agendamento confirmado:

Cliente: ${client.name}
Email: ${client.email}
Telefone: ${client.phone}
Serviço: ${client.service}

${client.notes ? `Observações: ${client.notes}` : ''}

Agendado através do site.
      `.trim(),
      startDateTime,
      endDateTime,
      attendeeEmail: client.email,
    };

    const createdEvent = await calendarService.createEvent(eventData);

    return NextResponse.json({ 
      success: true, 
      eventId: createdEvent.id,
      message: 'Agendamento realizado com sucesso!' 
    });
  } catch (error) {
    console.error('Erro na API de agendamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
