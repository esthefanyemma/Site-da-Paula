import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export class GoogleCalendarService {
  private calendar: any;
  private calendarId: string;
  private initialized: boolean = false;

  constructor() {
    this.calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  }

  private async initializeAuth() {
    if (this.initialized) return;
    
    try {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}');
      
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
      });

      this.calendar = google.calendar({ version: 'v3', auth });
      this.initialized = true;
    } catch (error) {
      console.error('Erro ao inicializar autenticação Google:', error);
      throw error;
    }
  }

  async getEvents(startDate: string, endDate: string) {
    try {
      await this.initializeAuth();
      
      const response = await this.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: startDate,
        timeMax: endDate,
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      throw error;
    }
  }

  async createEvent(eventData: {
    summary: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    attendeeEmail?: string;
  }) {
    try {
      await this.initializeAuth();
      
      const event = {
        summary: eventData.summary,
        description: eventData.description,
        start: {
          dateTime: eventData.startDateTime,
          timeZone: 'America/Sao_Paulo',
        },
        end: {
          dateTime: eventData.endDateTime,
          timeZone: 'America/Sao_Paulo',
        },
        // Remover attendees para evitar erro de permissão
        // attendees: eventData.attendeeEmail ? [{ email: eventData.attendeeEmail }] : [],
      };

      const response = await this.calendar.events.insert({
        calendarId: this.calendarId,
        resource: event,
        // Remover sendUpdates para evitar erro de permissão
        // sendUpdates: 'all',
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  }

  generateTimeSlots(date: string, workingHours = { start: 9, end: 18 }, slotDuration = 60) {
    const slots = [];
    const startHour = workingHours.start;
    const endHour = workingHours.end;

    for (let hour = startHour; hour < endHour; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      slots.push(timeString);
    }

    return slots;
  }

  isSlotBooked(events: any[], date: string, time: string) {
    const slotStart = new Date(`${date}T${time}:00`);
    const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000); // 1 hora depois

    return events.some(event => {
      if (!event.start?.dateTime || !event.end?.dateTime) return false;
      
      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);

      // Verifica se há sobreposição
      return (
        (slotStart >= eventStart && slotStart < eventEnd) ||
        (slotEnd > eventStart && slotEnd <= eventEnd) ||
        (slotStart <= eventStart && slotEnd >= eventEnd)
      );
    });
  }
}
