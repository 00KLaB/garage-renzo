import { useEffect, useState } from "react";

import api from "../api/axios";

import Button from "../components/Button";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";

export default function Customers() {

  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const res = await api.get("/customers");

    setCustomers(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/customers", form);

    setForm({
      name: "",
      phone: "",
      email: "",
    });

    loadCustomers();
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Apagar cliente?")) {
      return;
    }

    await api.delete(`/customers/${id}`);

    loadCustomers();
  };

  const formattedData = customers.map(
    (customer) => ({
      id: customer.id,

      Nome: customer.name,

      Telefone: customer.phone,

      Email: customer.email,
    })
  );

  return (
    <div>

      <PageHeader title="Clientes" />

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >

        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          className="
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
          type="text"
          name="phone"
          placeholder="Telefone"
          value={form.phone}
          onChange={handleChange}
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            text-white
          "
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            text-white
          "
        />

        <Button type="submit">
          Criar Cliente
        </Button>

      </form>

      <DataTable
        columns={[
          "Nome",
          "Telefone",
          "Email",
        ]}

        data={formattedData}

        renderActions={(row) => (
          <Button
            onClick={() =>
              deleteCustomer(row.id)
            }
          >
            Apagar
          </Button>
        )}
      />

    </div>
  );
}