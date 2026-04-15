import { pool } from "../../index.mjs";
const getUserByEmail = async (email) => {
  try {
    const query = `
      SELECT * FROM users
      WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
const getUserById = async (id) => {
  try {
    const query = `
      SELECT * FROM users
      WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
const createUser = async ({ name, email, password }) => {
  try {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [name, email, password];

    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
};
const saveRefreshToken = async (userId, hashedToken) => {
  try {
    const query = `
      UPDATE users
      SET refresh_token = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, email;
    `;

    const values = [hashedToken, userId];

    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error saving refresh token:", error);
    throw error;
  }
};
export { getUserByEmail, createUser, getUserById, saveRefreshToken };
