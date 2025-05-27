import { useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext';
import { format } from 'date-fns';

export default function EventList({ date }) {
  const { events, openForm } = useContext(CalendarContext);

  const dailyEvents = events.filter(
    e => format(new Date(e.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );

  return (
    <div className="mt-1 flex flex-col space-y-1">
      {dailyEvents.map(event => (
        <div
          key={event.id}
          className="bg-green-400 rounded-md p-2 text-white text-sm md:text-base font-semibold cursor-pointer
            hover:bg-green-500 transition-colors"
          onClick={() => openForm(new Date(event.date), event)}
        >
          {event.title}
        </div>
      ))}
    </div>
  );
}
