import { useEffect, useState } from "react";

import api from "../api/axios";

import Button from "../components/Button";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";

export default function Vehicles() {

  const [customers, setCustomers] = useState([]);

  const [vehicles, setVehicles] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    brand: "",
    model: "",
    plate: "",
    year: "",
    mileage: "",
    fuel: "",
  });

  useEffect(() => {
    loadVehicles();
    loadCustomers();
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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/vehicles", form);

    setForm({
      customer_id: "",
      brand: "",
      model: "",
      plate: "",
      year: "",
      mileage: "",
      fuel: "",
    });

    loadVehicles();
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm("Apagar veículo?")) {
      return;
    }

    await api.delete(`/vehicles/${id}`);

    loadVehicles();
  };

  const formattedData = vehicles.map(
    (vehicle) => ({
      id: vehicle.id,

      Cliente:
        vehicle.customer_name,

      Marca: vehicle.brand,

      Modelo: vehicle.model,

      Matrícula: vehicle.plate,

      Ano: vehicle.year,

      KM: vehicle.mileage,

      Combustível: vehicle.fuel,
    })
  );

  return (
    <div>

      <PageHeader title="Veículos" />

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >

        <select
          name="customer_id"
          value={form.customer_id}
          onChange={handleChange}
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            mx-8
            text-white
          "
          required
        >
          <option value="">
            Cliente
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

        <input
          type="text"
          name="brand"
          placeholder="Marca"
          value={form.brand}
          onChange={handleChange}
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            mx-8
            text-white
          "
          required
        />

        <input
          type="text"
          name="model"
          placeholder="Modelo"
          value={form.model}
          onChange={handleChange}
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            mx-8
            text-white
          "
          required
        />

        <input
          type="text"
          name="plate"
          placeholder="Matrícula"
          value={form.plate}
          onChange={handleChange}
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            mx-8
            text-white
          "
          required
        />

        <input
          type="number"
          name="year"
          placeholder="Ano"
          value={form.year}
          onChange={handleChange}
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            mx-8
            text-white
          "
        />

        <input
          type="number"
          name="mileage"
          placeholder="KM"
          value={form.mileage}
          onChange={handleChange}
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            mx-8
            text-white
          "
        />

        <input
          type="text"
          name="fuel"
          placeholder="Combustível"
          value={form.fuel}
          onChange={handleChange}
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            mx-8
            text-white
          "
        />

        <Button type="submit">
          Adicionar Veículo
        </Button>

      </form>

      <DataTable
        columns={[
          "Cliente",
          "Marca",
          "Modelo",
          "Matrícula",
          "Ano",
          "KM",
          "Combustível",
        ]}

        data={formattedData}

        renderActions={(row) => (
          <Button
            onClick={() =>
              deleteVehicle(row.id)
            }
          >
            Apagar
          </Button>
        )}
      />

    </div>
  );
}