import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import path from 'path'

const {parsed} = dotenv.config({
  path: process.env.NODE_ENV === 'development' ?  path.resolve(__dirname, '..', '.env.development') : path.resolve(__dirname, '..', '.env.production')
})

const dataSource = new DataSource({
  type: "mongodb",
  url: parsed.mongo_connection_url,
  database: parsed.mongo_database,
  migrations: [path.resolve(__dirname, '..', 'seed', '*.{ts,js}')],
})

export default dataSource