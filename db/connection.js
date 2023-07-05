// This file is necessary to establish a connection to the mysql database.
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // User's Username
  user: "root",
  // User's Password
  password: "Password1",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
