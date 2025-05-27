import { createContext, useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { generateRecurringEvents } from '../utils/recurrence';

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('events');
    if (saved) {
      const parsed = JSON.parse(saved).map(e => ({
        ...e,
        date: parseISO(e.date),
      }));
      setEvents(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    const fullEvent = { ...event, id: uuid() };
    const recurred = generateRecurringEvents(fullEvent);
    setEvents(prev => [...prev, ...recurred]);
  };

  const updateEvent = (updated) => {
    setEvents(prev =>
      prev.map(e => (e.id === updated.id ? { ...e, ...updated } : e))
    );
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(e => !e.id.startsWith(id)));
  };

  const openForm = (date, event = null) => {
    setSelectedDate({ date, event });
  };

  const closeForm = () => setSelectedDate(null);

  return (
    <CalendarContext.Provider value={{
      currentDate,
      setCurrentDate,
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      selectedDate,
      openForm,
      closeForm
    }}>
      {children}
    </CalendarContext.Provider>
  );
};
