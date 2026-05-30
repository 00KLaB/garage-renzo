import { Link } from "react-router-dom";

export default function Sidebar() {

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Reservas",
      path: "/bookings",
    },
    {
      name: "Nova Reserva",
      path: "/booking",
    },
    {
      name: "Clientes",
      path: "/customers",
    },
    {
      name: "Veículos",
      path: "/vehicles",
    },
  ];

  return (
    <div
      className="
        w-64
        bg-zinc-900
        border-r
        border-zinc-800
        min-h-screen
        p-5
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          mb-10
          text-blue-500
        "
      >
        Garage System 🚗
      </h1>

      <div className="flex flex-col gap-3">

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="
              bg-zinc-800
              hover:bg-blue-600
              transition
              p-3
              rounded-lg
            "
          >
            {item.name}
          </Link>
        ))}

      </div>
    </div>
  );
}