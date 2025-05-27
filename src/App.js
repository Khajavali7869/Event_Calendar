import Calendar from './components/Calendar';
import { CalendarProvider } from './context/CalendarContext';

export default function App() {
  return (
    <CalendarProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Custom Event Calendar</h1>
        <Calendar />
      </div>
    </CalendarProvider>
  );
}