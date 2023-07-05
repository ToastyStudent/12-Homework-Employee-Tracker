// This file is necessary to establish a connection to the mysql database.
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // User's Username
  user: "",
  // User's Password
  password: "",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
