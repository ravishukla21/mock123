const { connection } = require("./db");

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { auth123 } = require("./Router/auth.router");

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("homepage");
});
 app.use("/auth", auth123);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
  console.log(`server is running at ${process.env.PORT}`);
});
