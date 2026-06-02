const app = require("./src/app");
const dotenv = require("dotenv");
const db = require("./db");

db.getConnection()
  .then(conn => {
    console.log("✅ DB connected");
    conn.release();
  })
  .catch(err => {
    console.error("❌ DB connection error:", err);
  });

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});