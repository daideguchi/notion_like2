const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const PORT = 3001;
const app = express();
require("dotenv").config();

app.use(express.json());
app.use("/api/v1", require("./src/v1/routes/auth"));

//ユーザーログイン用API

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DB接続中");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中");
});
