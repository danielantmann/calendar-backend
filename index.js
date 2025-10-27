const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();

const app = express();

app.use(express.static("public"));

dbConnection();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("servidor en puerto corriendo");
});
