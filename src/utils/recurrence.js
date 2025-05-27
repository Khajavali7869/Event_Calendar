import { addDays, addWeeks, addMonths } from 'date-fns';

export function generateRecurringEvents(event) {
  const recurrence = event.recurrence || 'none';
  const instances = [event];

  const repeatCount = 30; // Generate next 30 recurrences
  let baseDate = new Date(event.date);

  for (let i = 1; i < repeatCount; i++) {
    let nextDate;
    switch (recurrence) {
      case 'daily':
        nextDate = addDays(baseDate, i);
        break;
      case 'weekly':
        nextDate = addWeeks(baseDate, i);
        break;
      case 'monthly':
        nextDate = addMonths(baseDate, i);
        break;
      case 'custom':
        nextDate = addDays(baseDate, i * (event.customInterval || 2));
        break;
      default:
        return instances;
    }

    instances.push({
      ...event,
      id: `${event.id}-${i}`,
      date: nextDate,
      isRecurringInstance: true,
    });
  }

  return instances;
}
