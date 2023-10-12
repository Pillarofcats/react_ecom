import dotenv from "dotenv"
dotenv.config()
import pg from "pg"
const { Pool } = pg

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: Number(process.env.PSQL_PORT),
})

type tParams = (string | number)[]

const dbQuery = (text: string, params: tParams) => {
  return pool.query(text, params)
}

export default dbQuery