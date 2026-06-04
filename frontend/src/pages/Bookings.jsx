import { useEffect, useState } from "react";

import api from "../api/axios";

import PageHeader from "../components/PageHeader";
import BookingCard from "../components/BookingCard";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  const handleUpdate = (
  id,
  updatedData
) => {

  setBookings((prev) =>
    prev.map((booking) =>
      booking.id === id
        ? {
            ...booking,
            ...updatedData,
          }
        : booking
    )
  );

};

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res =
        await api.get("/bookings");

      const sorted =
        res.data.sort(
          (a, b) =>
            new Date(
              b.booking_date
            ) -
            new Date(
              a.booking_date
            )
        );

      setBookings(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBooking = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Tem a certeza que deseja apagar esta reserva?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/bookings/${id}`
      );

      loadBookings();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus =
    async (id, status) => {
      try {
        await api.put(
          `/bookings/${id}/status`,
          { status }
        );

        loadBookings();
      } catch (error) {
        console.error(error);
      }
    };

  const filteredBookings =
    bookings.filter((booking) => {
      const term =
        search.toLowerCase();

      const matchesSearch =
        booking.customer_name
          ?.toLowerCase()
          .includes(term) ||
        booking.brand
          ?.toLowerCase()
          .includes(term) ||
        booking.model
          ?.toLowerCase()
          .includes(term) ||
        booking.plate
          ?.toLowerCase()
          .includes(term) ||
        booking.service
          ?.toLowerCase()
          .includes(term);

      const matchesStatus =
        statusFilter === "all" ||
        booking.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <div>
      <PageHeader
        title="Reservas"
      />

      {/* Pesquisa + Filtros */}
      <div
        className="
          flex
          flex-col
          md:flex-row
          gap-4
          mb-6
        "
      >
        <input
          type="text"
          placeholder="Pesquisar cliente, matrícula ou veículo..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            flex-1
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            text-white
          "
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            text-white
          "
        >
          <option value="all">
            Todos
          </option>

          <option value="pending">
            Pendentes
          </option>

          <option value="confirmed">
            Confirmados
          </option>

          <option value="completed">
            Concluídos
          </option>
        </select>
      </div>

      {/* Contador */}
      <p
        className="
          text-zinc-400
          mb-6
        "
      >
        {
          filteredBookings.length
        }{" "}
        reservas encontradas
      </p>

      {/* Grid */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {filteredBookings.map(
          (booking) => (
            <BookingCard
              key={booking.id}
              booking={{
                ...booking,
                onStatusChange:
                  updateStatus,
              }}
              onDelete={
                deleteBooking
              }
              onUpdate={handleUpdate}
            />
          )
        )}
      </div>
    </div>
  );
}