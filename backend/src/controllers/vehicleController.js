const db = require("../config/db");

// Listar
exports.getVehicles = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
      vehicles.*,
      customers.name AS customer_name
      FROM vehicles
      LEFT JOIN customers
      ON customers.id = vehicles.customer_id
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Criar
exports.createVehicle = async (req, res) => {
  try {
    const {
      customer_id,
      brand,
      model,
      plate,
      year,
      mileage,
      fuel
    } = req.body;

    const [result] = await db.query(
      `
      INSERT INTO vehicles
      (
        customer_id,
        brand,
        model,
        plate,
        year,
        mileage,
        fuel
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        customer_id,
        brand,
        model,
        plate,
        year,
        mileage,
        fuel
      ]
    );

    res.status(201).json({
      id: result.insertId
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Apagar
exports.deleteVehicle = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM vehicles WHERE id = ?",
      [req.params.id]
    );

    res.json({
      message: "Veículo removido"
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};