require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
//middleware
app.use(express.json());
//rootes
app.get("/", (req, res) => {
  res.send('<h1>Store Api </h1> <a href="/api/v1/products">Product route </a>');
});
app.use("/api/v1/products", productRouter);
//product route
app.use(notFoundMiddleware);
app.use(errorMiddleware);
// app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.URL);
    await app.listen(port, () => {
      console.log(`Express server listening in ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
