const express = require("express");
const { sequelize } = require("./models");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
const PORT = 3000;

app.set("json spaces", 2);

// Middleware
app.use(express.json());

// Routes
app.use("/employees", employeeRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my Express application!" });
});

app.use((req, res) => {
  res.status(404).json({ message: "404 - Page not found" });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Connection Failed:", error);
  }
}

startServer();
