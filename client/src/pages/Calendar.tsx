// src/pages/CalendarPage.tsx
import  { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Sidebar } from '../components/calendar/calendarSidebar/index';
import { EventModal } from '../components/calendar/modals/event/index';
import { useGetCalendarEventsQuery, useSyncAICalendarEventMutation } from '../redux/services/calendarApi';
import { getEventColorById } from '../utils/calendar/colorhandlers';

const CalendarPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const { data: eventsData, isLoading } = useGetCalendarEventsQuery();
  const [syncAICalendarEvent] = useSyncAICalendarEventMutation();

  const formattedEvents = eventsData?.data?.map(ev => ({
    id: ev.google_event_id,
    title: ev.summary,
    start: ev.start_time,
    end: ev.end_time,
    backgroundColor: getEventColorById(ev.google_event_id),
    extendedProps: { description: ev.description }
  })) || [];

  const handleSave = async (formData: any) => {
    const action = selectedEvent?.id ? 'update' : 'create';
    await syncAICalendarEvent({
      action,
      data: { 
        id: selectedEvent?.id || `manual_${Date.now()}`,
        summary: formData.title,
        start: {
            dateTime: new Date(formData.start).toISOString(),
            timeZone: ''
        },
        end: {
            dateTime: new Date(formData.end).toISOString(),
            timeZone: ''
        },
        description: formData.desc
      }
    }).unwrap();
    setModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={isSidebarOpen} onNewEvent={() => { setSelectedEvent(null); setModalOpen(true); }} />
      
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="h-20 flex items-center px-8 border-b border-slate-50 justify-between bg-white">
          <div className="flex items-center gap-6">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors text-slate-400">
              {isSidebarOpen ? '❮' : '❯'}
            </button>
            <h1 className="text-2xl font-black italic tracking-tighter text-slate-800 uppercase">Schedule</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
        </header>

        <div className="flex-1 overflow-hidden p-0"> {/* Google style: p-0 borderless */}
          {isLoading ? (
            <div className="h-full flex items-center justify-center font-bold italic text-slate-300">Syncing...</div>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={formattedEvents}
              eventClick={(info) => {
                setSelectedEvent({
                  id: info.event.id,
                  title: info.event.title,
                  start: info.event.startStr,
                  end: info.event.endStr,
                  extendedProps: info.event.extendedProps
                });
                setModalOpen(true);
              }}
              height="100%"
            />
          )}
        </div>
      </div>

      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        event={selectedEvent}
        onSave={handleSave}
        onDelete={async (id: any) => {
          await syncAICalendarEvent({ action: 'delete', data: { id } });
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default CalendarPage;