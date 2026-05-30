import Button from "./Button";

import {
  useAuth,
} from "../contexts/AuthContext";

export default function Navbar() {

  const { admin, logout } =
    useAuth();

  return (
    <div
      className="
        h-16
        bg-zinc-900
        border-b
        border-zinc-800
        flex
        items-center
        justify-between
        px-6
      "
    >

      <h2
        className="
          text-xl
          font-semibold
        "
      >
        Oficina Dashboard
      </h2>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <span>
          {admin?.name}
        </span>

        <Button
          variant="danger"
          onClick={logout}
        >
          Logout
        </Button>

      </div>

    </div>
  );
}