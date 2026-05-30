import { useEffect, useState } from "react";

import api from "../api/axios";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings =
    async () => {
      try {
        const res =
          await api.get(
            "/bookings"
          );

        setBookings(res.data);
      } catch (error) {
        console.error(error);
      }
    };

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const bookingsToday =
    bookings.filter(
      (booking) =>
        booking.booking_date
          ?.split("T")[0] ===
        today
    ).length;

  const pending =
    bookings.filter(
      (booking) =>
        booking.status ===
        "pending"
    ).length;

  const completed =
    bookings.filter(
      (booking) =>
        booking.status ===
        "completed"
    ).length;

  const totalRevenue =
    bookings.reduce(
      (total, booking) =>
        total +
        Number(
          booking.service_price ||
            0
        ),
      0
    );

  return (
    <div>
      <PageHeader
        title="Dashboard"
      />

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        <StatCard
          title="Reservas Hoje"
          value={bookingsToday}
        />

        <StatCard
          title="Pendentes"
          value={pending}
        />

        <StatCard
          title="Concluídas"
          value={completed}
        />

        <StatCard
          title="Total Serviços (€)"
          value={totalRevenue.toFixed(
            2
          )}
        />
      </div>
    </div>
  );
}