import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
// Load environment variables from .env file
dotenv.config();
/**
 * Pool connection handles multiple connections symultaniously
 * And Manages the automatic connection, open and close more efficiently
 */
const poolDbConfig = new Pool({
  user: process.env.DB_USERNAME,
  database: "traffic_signal",
  password: process.env.DB_PASSWORD,
  port: 5432,
  host: process.env.DB_HOST
});

export default poolDbConfig;
