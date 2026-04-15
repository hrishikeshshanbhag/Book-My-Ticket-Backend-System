import { pool } from "../../index.mjs";
const createUsersTable = async () => {
  try {
    const query = `
    CREATE TABLE  IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,

    name VARCHAR(50) NOT NULL CHECK (char_length(name) >= 2),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL CHECK (char_length(password) >= 8),

    refresh_token TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `;

    await pool.query(query);
    console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

export default createUsersTable;
