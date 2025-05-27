import { useContext } from 'react';
import { isSameDay, format } from 'date-fns';
import { CalendarContext } from '../context/CalendarContext';

export default function DayCell({ date, isToday }) {
  const { events, openForm } = useContext(CalendarContext);

  const dayEvents = events.filter(e => isSameDay(new Date(e.date), date));

  const colorMap = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
  };

  return (
    <div
      onDoubleClick={() => openForm(date)}
      className={`rounded-xl p-4 md:p-6 lg:p-8 min-h-[120px] text-center transition transform hover:scale-105 cursor-pointer border-2 shadow-md
        ${isToday ? 'bg-yellow-200 border-yellow-400' : 'bg-white hover:bg-blue-50 border-gray-200'}`}
    >
      <div className="text-lg md:text-xl font-bold text-gray-800 mb-3">
        {format(date, 'd')}
      </div>

      <div className="space-y-2 max-h-[100px] overflow-y-auto">
        {dayEvents.map((event) => (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              openForm(date, event);
            }}
            className={`text-sm md:text-base text-white px-2 py-1 rounded font-semibold ${
              colorMap[event.color] || 'bg-gray-400'
            }`}
            title={`${event.title}${event.description ? `: ${event.description}` : ''}`}
          >
            <div>{event.title}</div>
            {event.description && (
              <div className="text-xs mt-1 whitespace-normal">{event.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
