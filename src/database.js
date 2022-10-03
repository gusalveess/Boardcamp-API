import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;
const db = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "123456",
    database: "boardcamp"
});

export default db;
