const pg = require("pg");

const Pool = pg.Pool;

const pool = new Pool({
  database: "jazzy_sql",
  host: "localhost",
  port: 5432,
});

pool.on("connect", () => {
  console.log("PG CONNECTED");
});

pool.on("error", (error) => {
  console.log(error);
});

module.exports = pool;
