const express = require("express");

const router = express.Router();

const {
  generatePDF,
} = require(
  "../controllers/reportController"
);

router.get(
  "/booking/:id",
  generatePDF
);

module.exports = router;