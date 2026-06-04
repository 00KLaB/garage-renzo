import api from "../api/axios";
import { useState } from "react";
import Button from "./Button";

export default function BookingCard({
  booking,
  onDelete,
}) {

  const saveBooking = async () => {

  try {

    await api.put(
      `/bookings/${booking.id}`,
      formData
    );

    alert(
      "Reserva atualizada com sucesso"
    );

    window.location.reload();

  } catch (err) {

    console.error(err);

    alert(
      "Erro ao atualizar reserva"
    );

  }

};

  const [editing, setEditing] =
  useState(false);

  const [formData, setFormData] =
  useState({
    booking_date:
      booking.booking_date
        ?.split("T")[0],

    booking_time:
      booking.booking_time,

    service:
      booking.service || "",

    notes:
      booking.notes || "",

    service_price:
      booking.service_price || 0,
  });

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
      {editing ? (

  <div className="space-y-4">

    <input
      type="date"
      value={
  formData.booking_date
}

onChange={(e) =>
  setFormData({
    ...formData,
    booking_date:
      e.target.value,
  })
}
      className="
        w-full
        bg-zinc-800
        border
        border-zinc-700
        rounded-xl
        p-3
        text-white
      "
    />

    <input
      type="time"
      value={
  formData.booking_time
}

onChange={(e) =>
  setFormData({
    ...formData,
    booking_time:
      e.target.value,
  })
}
      className="
        w-full
        bg-zinc-800
        border
        border-zinc-700
        rounded-xl
        p-3
        text-white
      "
    />

  </div>

) : (

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

)}

      {/* SERVIÇO */}
      <div>

  <p className="text-zinc-500">
    Serviço
  </p>

  {editing ? (

    <input
      value={formData.service}
      onChange={(e) =>
        setFormData({
          ...formData,
          service:
            e.target.value,
        })
      }
      className="
        w-full
        bg-zinc-800
        border
        border-zinc-700
        rounded-xl
        p-3
        text-white
      "
    />

  ) : (

    <h3 className="text-white">
      {booking.service}
    </h3>

  )}

</div>

      {/* NOTAS */}
      <div>

  <p className="text-zinc-500">
    Notas
  </p>

  {editing ? (

    <textarea
      rows="4"
      value={formData.notes}
      onChange={(e) =>
        setFormData({
          ...formData,
          notes:
            e.target.value,
        })
      }
      className="
        w-full
        bg-zinc-800
        border
        border-zinc-700
        rounded-xl
        p-3
        text-white
      "
    />

  ) : (

    <p className="text-zinc-300">
      {booking.notes || "-"}
    </p>

  )}

</div>

      {/* PREÇO */}
      <div>

  <p className="text-zinc-500">
    Valor
  </p>

  {editing ? (

    <input
      type="number"
      value={
        formData.service_price
      }
      onChange={(e) =>
        setFormData({
          ...formData,
          service_price:
            e.target.value,
        })
      }
      className="
        w-full
        bg-zinc-800
        border
        border-zinc-700
        rounded-xl
        p-3
        text-white
      "
    />

  ) : (

    <h3
      className="
        text-green-500
        text-xl
        font-bold
      "
    >
      {booking.service_price}€
    </h3>

  )}

</div>

      {/* AÇÕES */}
      <div
        className="
          flex
          gap-3
          mt-2
        "
      >

        {editing ? (

  <>
    <Button
      onClick={saveBooking}
    >
      Guardar
    </Button>

    <Button
      variant="secondary"
      onClick={() =>
        setEditing(false)
      }
    >
      Cancelar
    </Button>
  </>

) : (

  <Button
    onClick={() =>
      setEditing(true)
    }
  >
    Editar
  </Button>

)}

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