require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/user.Routes");
const productRouter = require("./routes/product.Routes");

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();



app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));