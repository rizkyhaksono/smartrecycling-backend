"use strict";

import mysql from "mysql2/promise";

const dbPool = mysql.createPool({
  // host: "46.250.227.1",
  // user: "root",
  // password: "root123",
  // port: 31130,
  // database: "recycling",
  host: "localhost",
  user: "root",
  password: "root",
  port: 3307,
  database: "new-recycling",
});

export default dbPool;
