import express from "express";
import cors from "cors";
import sequelize from "./config/sequelize";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();
const PORT = process.env.PORT || 7070;

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Register API routes
app.use("/api", productRoutes); 
app.use("/api", orderRoutes);

// Root endpoint to check if the server is running
app.get("/", (req, res) => {
  res.send("Welcome to Grocery Booking API!");
});

// Health check endpoint to verify database connection
app.get("/health", async (req, res) => {
    try {
      await sequelize.authenticate();
      res.status(200).json({ message: "Database connection is working!" });
    } catch (error) {
      res.status(500).json({ message: "Database connection failed!", error });
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

