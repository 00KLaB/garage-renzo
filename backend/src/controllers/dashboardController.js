const db = require("../config/db");

exports.getStats = async (req, res) => {
  try {
    const [total] = await db.query(
      "SELECT COUNT(*) as total FROM bookings"
    );

    const [pending] = await db.query(
      "SELECT COUNT(*) as total FROM bookings WHERE status='pending'"
    );

    const [confirmed] = await db.query(
      "SELECT COUNT(*) as total FROM bookings WHERE status='confirmed'"
    );

    const [completed] = await db.query(
      "SELECT COUNT(*) as total FROM bookings WHERE status='completed'"
    );

    res.json({
      totalBookings: total[0].total,
      pendingBookings: pending[0].total,
      confirmedBookings: confirmed[0].total,
      completedBookings: completed[0].total,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};