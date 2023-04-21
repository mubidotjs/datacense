import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import jwt from "jsonwebtoken";

export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
