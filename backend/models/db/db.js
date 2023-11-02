import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;
// const localDBOptions = {
//   user: process.env.PSQL_USER,
//   host: process.env.PSQL_HOST,
//   database: process.env.PSQL_DATABASE,
//   password: process.env.PSQL_PASSWORD,
//   port: Number(process.env.PSQL_PORT),
// }
console.log("ENV VARIABLE HOST", process.env.PGHOST);
const remoteDBOptions = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
};
const pool = new Pool(remoteDBOptions);
const dbQuery = (text, params) => {
    return pool.query(text, params);
};
export default dbQuery;
