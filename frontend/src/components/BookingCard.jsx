import Button from "./Button";

export default function BookingCard({
  booking,
  onDelete,
}) {

  const statusColors = {
  pending:
    "bg-yellow-500/20 text-yellow-300",

  confirmed:
    "bg-blue-500/20 text-blue-300",

  completed:
    "bg-green-500/20 text-green-300",
};

  return (
    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
        shadow-lg
        flex
        flex-col
        gap-4
      "
    >

      {/* TOP */}
      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            {booking.brand} {booking.model}
          </h2>

          <p className="text-zinc-400 font-bold">
            {booking.plate}
          </p>
          <p className="text-zinc-400">
            ⛽︎ - {booking.fuel}
          </p>

        </div>

        <select
  value={booking.status}
  onChange={(e) =>
    booking.onStatusChange(
      booking.id,
      e.target.value
    )
  }
  className={`
    px-3
    py-2
    rounded-xl
    text-sm
    font-medium
    outline-none
    border
    border-zinc-700
    ${statusColors[
      booking.status
    ]}
  `}
>

  <option value="pending">
    Pendente
  </option>

  <option value="confirmed">
    Confirmado
  </option>

  <option value="completed">
    Concluído
  </option>

</select>

      </div>

      {/* CLIENTE */}
      <div>

        <p className="text-zinc-500">
          Cliente
        </p>

        <h3
          className="
            text-lg
            text-white
            font-medium
          "
        >
          {booking.customer_name}
        </h3>

      </div>

      {/* DATA */}
      <div
        className="
          flex
          gap-6
        "
      >

        <div>

          <p className="text-zinc-500">
            Data
          </p>

          <h3 className="text-white">
            {new Date(
              booking.booking_date
            ).toLocaleDateString()}
          </h3>

        </div>

        <div>

          <p className="text-zinc-500">
            Hora
          </p>

          <h3 className="text-white">
            {booking.booking_time}
          </h3>

        </div>

      </div>

      {/* SERVIÇO */}
      <div>

        <p className="text-zinc-500">
          Serviço
        </p>

        <h3 className="text-white">
          {booking.service}
        </h3>

      </div>

      {/* NOTAS */}
      <div>

        <p className="text-zinc-500">
          Notas
        </p>

        <p className="text-zinc-300">
          {booking.notes || "-"}
        </p>

      </div>

      {/* PREÇO */}
      <div>

        <p className="text-zinc-500">
          Valor
        </p>

        <h3
          className="
              text-green-700
              text-xl
              font-bold
              "
        >
          {booking.service_price}€
        </h3>

      </div>

      {/* AÇÕES */}
      <div
        className="
          flex
          gap-3
          mt-2
        "
      >

        <Button
          onClick={() =>
            window.open(
              `https://garage-renzo.onrender.com/api/reports/booking/${booking.id}`
            )
          }
        >
          PDF
        </Button>

        <Button
          variant="danger"
          onClick={() =>
            onDelete(booking.id)
          }
        >
          Apagar
        </Button>

      </div>

    </div>
  );
}