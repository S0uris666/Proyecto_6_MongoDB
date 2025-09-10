require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// Rutas
const userRouter = require("./routes/user.Routes");
const productRouter = require("./routes/product.Routes");
const eventRouter = require("./routes/event.Routes");

// Swagger
const { swaggerUi, specs } = require("./swagger");

const PORT = process.env.PORT || 3000;
const app = express();

// Conexión DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Endpoints
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/events", eventRouter);

// Servidor
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);