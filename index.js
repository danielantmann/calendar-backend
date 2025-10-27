const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

const app = express();

dbConnection();

app.use(express.static("public"));

app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("servidor en puerto corriendo");
});
