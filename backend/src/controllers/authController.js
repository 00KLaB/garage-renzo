const db = require("../config/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const [admins] = await db.query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    if (admins.length === 0) {
      return res.status(401).json({
        message: "Email inválido",
      });
    }

    const admin = admins[0];

    const validPassword =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!validPassword) {
      return res.status(401).json({
        message: "Password inválida",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

};