const db = require("../config/db");

// Listar
exports.getCustomers = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM customers ORDER BY id DESC"
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar
exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const [result] = await db.query(
      "INSERT INTO customers(name, phone, email) VALUES (?, ?, ?)",
      [name, phone, email]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Cliente criado"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Apagar
exports.deleteCustomer = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM customers WHERE id = ?",
      [req.params.id]
    );

    res.json({
      message: "Cliente removido"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};