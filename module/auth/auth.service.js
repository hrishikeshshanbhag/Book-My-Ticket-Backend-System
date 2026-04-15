import bcrypt from "bcrypt";
import * as authRespoitory from "./auth.repository.js";
import ApiError from "../../common/utils/api-error.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/jwt.utils.js";
async function registerUser(name, email, password) {
  // finding existing user
  const existingUser = await authRespoitory.getUserByEmail(email);
  if (existingUser) throw ApiError.conflict("User already exists");

  //hasing password
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT || "12"),
  );

  // inserting
  const user = await authRespoitory.createUser({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

async function loginUser(email, password) {
  // Finding existing user
  const existingUser = await authRespoitory.getUserByEmail(email);
  if (!existingUser) {
    throw ApiError.unauthorized("Invalid email or password");
  }
  // finding if password is correct
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

  // generate token
  const accessToken = generateAccessToken({ id: existingUser.id, email });
  const refreshToken = generateRefreshToken({ id: existingUser.id, email });
  const hashedToken = await bcrypt.hash(
    refreshToken,
    parseInt(process.env.SALT || "12"),
  );
  await authRespoitory.saveRefreshToken(existingUser.id, hashedToken);
  const user = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
  };
  return { refreshToken, accessToken, user };
}

export { registerUser, loginUser };
