require("dotenv").config();
const { connectDB } = require("./config/db"); // Updated import
const app = require("./app");

const PORT = process.env.BACK_PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); 
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`Connected to port 443`);
      });
    }
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

startServer();

module.exports = app; // <-- Exportar app para supertest