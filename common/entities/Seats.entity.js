import { pool } from "../../index.mjs";
export const createSeatsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS seats (
      id SERIAL PRIMARY KEY,
      isbooked INT DEFAULT 0,
      name VARCHAR(50),
      user_id INT REFERENCES users(id)
    );
  `);

  await pool.query(`
    INSERT INTO seats (isbooked)
    SELECT 0 FROM generate_series(1, 20)
    WHERE NOT EXISTS (SELECT 1 FROM seats);
  `);

  console.log("Created Seats");
};

export default createSeatsTable;
