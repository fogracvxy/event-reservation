"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EventForm from "./EventForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Hourglass } from "react-loader-spinner";
type Event = {
  id: number;
  name: string;
  date: string;
  time: string;
  level: string;
  reservations: {
    id: number;
    user_id: number;
    user: {
      first_name: string;
      last_name: string;
    };
  }[];
  limit: number;
  description: string;
  location: string;
};

export default function ReservationContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    type: string;
    id: number | null;
  }>({ show: false, type: "", id: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchEvents();
    }
  }, [session]);
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      toast.error("Failed to load events. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      filter === "all" || event.level.toLowerCase() === filter.toLowerCase()
  );

  const handleAddEvent = async (eventData: any) => {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (res.ok) {
      fetchEvents();
      setShowModal(false);
      toast.success("Event created successfully!");
    } else {
      console.error("Failed to add event");
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    setConfirmModal({ show: true, type: "deleteEvent", id: eventId });
  };

  const confirmDeleteEvent = async (eventId: number) => {
    const res = await fetch(`/api/events?id=${eventId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchEvents();
      toast.success("Event deleted successfully!");
    } else {
      console.error("Failed to delete event");
    }
    setConfirmModal({ show: false, type: "", id: null });
  };

  const handleReservation = async (eventId: number) => {
    await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId }),
    });
    fetchEvents();
  };

  const handleCancelReservation = async (reservationId: number) => {
    setConfirmModal({
      show: true,
      type: "cancelReservation",
      id: reservationId,
    });
  };

  const confirmCancelReservation = async (reservationId: number) => {
    await fetch(`/api/reservations?id=${reservationId}`, {
      method: "DELETE",
    });
    fetchEvents();
    setConfirmModal({ show: false, type: "", id: null });
  };

  const isUserReserved = (event: Event) => {
    return event.reservations.some(
      (res) => res.user_id === parseInt(session?.user?.id as string)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Rezervirajte termin</h1>

      {session?.user?.role === "admin" && (
        <div className="mb-8">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Kreiraj novi event
          </button>
        </div>
      )}

      {showModal && (
        <EventForm
          onSubmit={handleAddEvent}
          onClose={() => setShowModal(false)}
        />
      )}

      {confirmModal.show && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Potvrda</h2>
            <p className="mb-4 text-black">
              {confirmModal.type === "deleteEvent"
                ? "Jeste li sigurni da želite obrisati ovaj event?"
                : "Jeste li sigurni da želite otkazati rezervaciju?"}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md text-black"
                onClick={() =>
                  setConfirmModal({ show: false, type: "", id: null })
                }
              >
                Ne
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => {
                  if (confirmModal.type === "deleteEvent") {
                    confirmDeleteEvent(confirmModal.id!);
                  } else {
                    confirmCancelReservation(confirmModal.id!);
                  }
                }}
              >
                Da
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="filter" className="block mb-2 text-black">
          Filter by level:
        </label>
        <select
          id="filter"
          className="w-full md:w-auto px-4 py-2 border rounded-md text-black"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Sve</option>
          <option value="Napredni">Napredni</option>
          <option value="Rekreativci">Rekreativci</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Hourglass
            visible={true}
            height="40"
            width="40"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["rgb(220 38 38)", "rgb(239 68 68)"]}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white text-black shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString("hr-HR")}
                </p>
                <p className="mb-1">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="mb-1">
                  <strong>Level:</strong> {event.level}
                </p>
                <p className="mb-1">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="mb-1">
                  <strong>Description:</strong> {event.description}
                </p>
                <p className="mb-4">
                  <strong>Reservations:</strong> {event.reservations.length}/
                  {event.limit}
                </p>

                {session?.user?.role === "admin" && (
                  <div className="mb-4">
                    <h3 className="font-semibold">Reservations:</h3>
                    <ul>
                      {event.reservations.map((res) => (
                        <li
                          key={res.id}
                          className="flex justify-between items-center"
                        >
                          <span>
                            {res.user.first_name + " " + res.user.last_name}{" "}
                          </span>
                          <button
                            onClick={() => handleCancelReservation(res.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            Otkaži
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {session?.user?.role === "admin" ? (
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="w-full py-2 px-4 rounded-md text-white font-semibold bg-red-500 hover:bg-red-600"
                    >
                      Obriši event
                    </button>
                  </div>
                ) : isUserReserved(event) ? (
                  <button
                    className="w-full py-2 px-4 rounded-md text-white font-semibold bg-red-500 hover:bg-red-600"
                    onClick={() => {
                      const reservation = event.reservations.find(
                        (res) =>
                          res.user_id === parseInt(session?.user?.id as string)
                      );
                      if (reservation) {
                        handleCancelReservation(reservation.id);
                      }
                    }}
                  >
                    Otkaži rezervaciju
                  </button>
                ) : (
                  <button
                    className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                      event.reservations.length < event.limit
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={event.reservations.length >= event.limit}
                    onClick={() => handleReservation(event.id)}
                  >
                    {event.reservations.length < event.limit
                      ? "Rezerviraj"
                      : "Popunjeno"}
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="text-red-700 pt-5 font-bold">
            *molim da rezervirate termine ovisno o vašem iskustvu
          </div>
        </>
      )}
    </div>
  );
}
