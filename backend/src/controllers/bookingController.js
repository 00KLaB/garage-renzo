const db = require("../config/db");

// Criar reserva
exports.createBooking = async (req, res) => {
  try {
    const {
      customer_id,
      vehicle_id,
      service,
      booking_date,
      booking_time,
      notes,
      service_price,
    } = req.body;

    const [result] = await db.query(
      `
  INSERT INTO bookings (
    customer_id,
    vehicle_id,
    service,
    booking_date,
    booking_time,
    notes,
    service_price,
    status
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,
  [
    customer_id,
    vehicle_id,
    service,
    booking_date,
    booking_time,
    notes,
    service_price,
    "pending",
  ]
    );

    res.status(201).json({
      message: "Reserva criada 🚗",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Listar todas
exports.getBookings = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        bookings.*,

        customers.name AS customer_name,

        vehicles.brand,
        vehicles.model,
        vehicles.plate,
        vehicles.fuel

      FROM bookings

      LEFT JOIN customers
      ON customers.id = bookings.customer_id

      LEFT JOIN vehicles
      ON vehicles.id = bookings.vehicle_id

      ORDER BY bookings.id DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Buscar uma
exports.getBookingById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM bookings WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Reserva não encontrada",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar estado
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    await db.query(
      "UPDATE bookings SET status = ? WHERE id = ?",
      [status, req.params.id]
    );

    res.json({
      message: "Estado atualizado com sucesso",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Apagar reserva
exports.deleteBooking = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM bookings WHERE id = ?",
      [req.params.id]
    );

    res.json({
      message: "Reserva removida",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const { status } =
        req.body;

      await db.query(
        `
        UPDATE bookings
        SET status = ?
        WHERE id = ?
        `,
        [status, id]
      );

      res.json({
        message:
          "Status atualizado",
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }

  };

  exports.updateBooking =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        booking_date,
        booking_time,
        service,
        notes,
        service_price
      } = req.body;

      await db.query(
        `
        UPDATE bookings
        SET
          booking_date = ?,
          booking_time = ?,
          service = ?,
          notes = ?,
          service_price = ?
        WHERE id = ?
        `,
        [
          booking_date,
          booking_time,
          service,
          notes,
          service_price,
          id
        ]
      );

      res.json({
        message:
          "Reserva atualizada"
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  };