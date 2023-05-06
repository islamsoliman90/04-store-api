const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connect to db");
    });
};

module.exports = connectDB;
