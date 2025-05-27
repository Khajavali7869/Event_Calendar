import { useContext, useEffect, useState } from 'react';
import { CalendarContext } from '../context/CalendarContext';
import { format } from 'date-fns';

export default function EventForm() {
  const { selectedDate, closeForm, addEvent, updateEvent, deleteEvent } = useContext(CalendarContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('12:00');
  const [recurrence, setRecurrence] = useState('none');
  const [color, setColor] = useState('blue');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (selectedDate?.event) {
      const { title, description, date, recurrence, color } = selectedDate.event;
      setTitle(title);
      setDescription(description);
      setTime(format(new Date(date), 'HH:mm'));
      setRecurrence(recurrence || 'none');
      setColor(color || 'blue');
      setEditMode(true);
    }
  }, [selectedDate]);

  const handleSubmit = () => {
    const fullDate = new Date(
      `${format(selectedDate.date, 'yyyy-MM-dd')}T${time}`
    );

    const event = {
      title,
      description,
      date: fullDate,
      recurrence,
      color,
    };
    

    if (editMode) {
      updateEvent({ ...selectedDate.event, ...event });
    } else {
      addEvent(event);
    }
    closeForm();
  };

  const handleDelete = () => {
    deleteEvent(selectedDate.event.id);
    closeForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Event' : 'Add Event'}</h2>

        <input className="w-full mb-2 p-2 border rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="w-full mb-2 p-2 border rounded" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="time" className="w-full mb-2 p-2 border rounded" value={time} onChange={e => setTime(e.target.value)} />

        <select className="w-full mb-2 p-2 border rounded" value={recurrence} onChange={e => setRecurrence(e.target.value)}>
          <option value="none">No Repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="custom">Custom</option>
        </select>

        <select className="w-full mb-4 p-2 border rounded" value={color} onChange={e => setColor(e.target.value)}>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
        </select>

        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            {editMode ? 'Update' : 'Add'}
          </button>
          {editMode && (
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
              Delete
            </button>
          )}
          <button className="text-gray-600" onClick={closeForm}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
