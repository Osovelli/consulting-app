import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const TimeSelect = () => {
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const times = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setIsOpen(false);
    
    // Example validation: Appointments must be at least 24 hours in advance
    const now = new Date();
    const selected = new Date(now.toDateString() + ' ' + time);
    if (selected.getTime() - now.getTime() < 24 * 60 * 60 * 1000) {
      setError('Appointments must be scheduled at least 24 hours in advance. Please select a different time.');
    } else {
      setError('');
    }
  };

  return (
    <div className="relative w-64">
      <div 
        className="flex items-center justify-between p-2 border border-gray-300 rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedTime}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
          {times.map((time) => (
            <div 
              key={time}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleTimeChange(time)}
            >
              {time}
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default TimeSelect;