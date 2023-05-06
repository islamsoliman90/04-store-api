require("dotenv").config();

const connectDB = require("./db/connect");
const product = require("./models/product");

const jasonProduct = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.URL);
    await product.deleteMany();
    await product.create(jasonProduct);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
