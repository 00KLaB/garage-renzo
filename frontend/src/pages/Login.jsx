import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import Button from "../components/Button";
import Input from "../components/Input";

import { useAuth } from "../contexts/AuthContext";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await api.post(
            "/auth/login",
            form
          );

        login(
          res.data.admin,
          res.data.token
        );

        navigate("/dashboard");

      } catch (err) {

        alert(
          "Login inválido"
        );

      }

    };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
          bg-zinc-900
          border
          border-zinc-800
          p-8
          rounded-2xl
          flex
          flex-col
          gap-4
          w-[400px]
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-center
          "
        >
          Login Admin
        </h1>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <Button type="submit">
          Entrar
        </Button>

      </form>

    </div>
  );
}