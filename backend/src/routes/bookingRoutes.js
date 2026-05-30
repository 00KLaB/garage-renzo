const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

// CREATE
router.post("/", bookingController.createBooking);

// READ ALL
router.get("/", bookingController.getBookings);

// READ ONE
router.get("/:id", bookingController.getBookingById);

// UPDATE STATUS
router.put("/:id", bookingController.updateBookingStatus);

// DELETE
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;

router.put(
  "/:id/status",
  bookingController.updateStatus
);