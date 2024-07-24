// components/EventForm.tsx
"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type EventFormProps = {
  onSubmit: (eventData: any) => void;
  onClose: () => void;
};
type EventData = {
  name: string;
  date: Date; 
  time: string;
  level: string;
  limit: number;
  description: string;
  location: string;
};
export default function EventForm({ onSubmit, onClose }: EventFormProps) {
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    date: new Date(), 
    time: "",
    level: "",
    limit: 0,
    description: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: name === "limit" ? parseInt(value, 10) : value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setEventData((prev) => ({
        ...prev,
        date, // Assign the selected date
      }));
    } else {
      // Optionally handle the case where date is null
      setEventData((prev) => ({
        ...prev,
        date: new Date(), // Set to default date or handle as needed
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...eventData,
      date: eventData.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-sm shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={eventData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <DatePicker
              id="date"
              selected={eventData.date}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={eventData.time}
              onChange={handleChange}
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium text-gray-700"
            >
              Level
            </label>
            <select
              name="level"
              id="level"
              value={eventData.level}
              onChange={handleChange}
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Odaberite razinu</option>
              <option value="Napredni">Napredni</option>
              <option value="Rekreativci">Rekreativci</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="limit"
              className="block text-sm font-medium text-gray-700"
            >
              Participant Limit
            </label>
            <input
              type="number"
              name="limit"
              id="limit"
              value={eventData.limit}
              onChange={handleChange}
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={eventData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={eventData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
