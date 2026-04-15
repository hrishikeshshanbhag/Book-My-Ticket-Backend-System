import ApiError from "../utils/api-error";
export function globalError(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
