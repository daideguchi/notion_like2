const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
// const PORT = 3001;
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api/v1", require("./src/v1/routes"));

//ユーザーログイン用API

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DB接続中");
} catch (error) {
  console.log(error);
}

app.listen(process.env.PORT || 3001, () => {
  console.log("ローカルサーバー起動中");
});
