import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
// Load environment variables from .env file
dotenv.config();
/**
 * Client connection handles single db connection
 * First have to create the connection for use
 * Have to manage the open, close by manually
 */
const clientDbConfig = new Client({
  user: process.env.DB_USERNAME,
  database: "traffic_signal",
  password: process.env.DB_PASSWORD,
  port: 5432,
  host: process.env.DB_HOST
});

export default clientDbConfig;
