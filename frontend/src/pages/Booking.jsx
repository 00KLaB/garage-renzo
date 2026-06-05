import { useEffect, useState } from "react";

import api from "../api/axios";

import Button from "../components/Button";
import Select from "../components/Select";
import Input from "../components/Input";
import PageHeader from "../components/PageHeader";

export default function Booking() {

  const [customers, setCustomers] = useState([]);

  const [vehicles, setVehicles] = useState([]);

  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    vehicle_id: "",
    service: "",
    booking_date: "",
    booking_time: "",
    notes: "",
    service_price: "",
  });

  useEffect(() => {
    loadCustomers();
    loadVehicles();
  }, []);

  const loadCustomers = async () => {
    const res = await api.get("/customers");
    setCustomers(res.data);
  };

  const loadVehicles = async () => {
    const res = await api.get("/vehicles");
    setVehicles(res.data);
  };

  const handleChange = (e) => {

  const updatedForm = {
    ...form,
    [e.target.name]: e.target.value,
  };

  setForm(updatedForm);

  // Filtrar veículos do cliente
  if (e.target.name === "customer_id") {

    const filtered = vehicles.filter(
      (vehicle) =>
        vehicle.customer_id ==
        e.target.value
    );

    setFilteredVehicles(filtered);

    // limpar veículo selecionado
    setForm({
      ...updatedForm,
      vehicle_id: "",
    });
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/bookings", form);

    alert("Reserva criada 🚗");

    setForm({
      customer_id: "",
      vehicle_id: "",
      service: "",
      booking_date: "",
      booking_time: "",
      notes: "",
      service_price: "",
    });
  };

  return (
    <div>

      <PageHeader title="Nova Reserva" />

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "500px",
        }}
      >

        <select
          name="customer_id"
          value={form.customer_id}
          onChange={handleChange}
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
          required
        >
          <option value="">
            Selecionar Cliente
          </option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.name}
            </option>
          ))}
        </select>

        <select
          name="vehicle_id"
          value={form.vehicle_id}
          onChange={handleChange}
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
          required
        >
          <option value="">
            Selecionar Veículo
          </option>

          {filteredVehicles.map((vehicle) => (
            <option
              key={vehicle.id}
              value={vehicle.id}
            >
              {vehicle.brand} {vehicle.model} - {vehicle.plate}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="service"
          placeholder="Serviço"
          value={form.service}
          onChange={handleChange}
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
          required
        />

        <input
          type="date"
          name="booking_date"
          value={form.booking_date}
          onChange={handleChange}
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
          required
        />

        <input
          type="time"
          name="booking_time"
          value={form.booking_time}
          onChange={handleChange}
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
          required
        />

        <textarea
          name="notes"
          placeholder="Notas"
          value={form.notes}
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
          onChange={handleChange}
        />

        <Input
          type="number"
          name="service_price"
          placeholder="Valor (€)"
          value={form.service_price}
          onChange={handleChange}
        />

        <Button type="submit">
          Criar Reserva
        </Button>

      </form>

    </div>
  );
}