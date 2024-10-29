import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export function query(text, params) { return pool.query(text, params); }