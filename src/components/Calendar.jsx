import { useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  isToday,
} from 'date-fns';
import DayCell from './DayCell';
import EventForm from './EventForm';

export default function Calendar() {
  const { currentDate, setCurrentDate, selectedDate } = useContext(CalendarContext);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const handlePrev = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNext = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto shadow-xl rounded-xl bg-white bg-opacity-90 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <button
            className="text-base md:text-lg font-semibold px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            onClick={handlePrev}
          >
            ← Prev
          </button>
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            className="text-base md:text-lg font-semibold px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            onClick={handleNext}
          >
            Next →
          </button>
        </div>

        {/* Weekdays Header */}
        <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700 mb-2 text-xs md:text-sm">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {days.map((day) => (
            <DayCell key={day} date={day} isToday={isToday(day)} />
          ))}
        </div>

        {/* Event Form */}
        {selectedDate && <EventForm />}
      </div>
    </div>
  );
}
