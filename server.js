const config = require("config");
const express = require("express");
const mysql = require("mysql");
const CounterController = require("./api/middleware/CounterController");
const users = require("./api/routes/users");
const products = require("./api/routes/products");
const orders = require("./api/routes/orders");
const reports = require("./api/routes/reports");
const auth = require("./api/routes/auth");
const app = express();
const path = require("path");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

app.use(express.static(path.join(__dirname, "client/build")));

const port = process.env.PORT || 5000;

let pool = mysql.createPool({
  connectionLimit: 10,
  host: "remotemysql.com",
  user: "fGtwb92AVU",
  password: "KMVg0zpFr0",
  database: "fGtwb92AVU"
}); //Creates logginsettup for mysql_database

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  if (connection) connection.release();
  return;
}); //Creates connection to mysql_database
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/orders", orders);
app.use("/api/reports", reports);
app.use("/api/auth", auth);

const CC = new CounterController(pool);
exports.CounterController = CC;
exports.pool = pool; //exports the connection so it can be required in the users.js module
exports.app = app;
