const db = require("../config/db");

const {
  generateBookingPDF,
} = require(
  "../services/pdfService"
);

exports.generatePDF =
  async (req, res) => {

    try {

      const { id } = req.params;

      const [bookings] =
        await db.query(
          `
          SELECT
            bookings.*,

            customers.name
              AS customer_name,

            vehicles.brand,
            vehicles.model,
            vehicles.plate

          FROM bookings

          LEFT JOIN customers
            ON bookings.customer_id =
            customers.id

          LEFT JOIN vehicles
            ON bookings.vehicle_id =
            vehicles.id

          WHERE bookings.id = ?
          `,
          [id]
        );

      if (
        bookings.length === 0
      ) {
        return res
          .status(404)
          .json({
            message:
              "Reserva não encontrada",
          });
      }

      generateBookingPDF(
        bookings[0],
        res
      );

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }

  };