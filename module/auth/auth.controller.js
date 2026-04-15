import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  const user = await authService.registerUser(name, email, password);
  ApiResponse.created(res, "Registration successful", user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { refreshToken, accessToken, user } = await authService.loginUser(
    email,
    password,
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  ApiResponse.ok(res, "Login successful", { accessToken, user });
};

export { register, login };
