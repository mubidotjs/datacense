import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import jwt from "jsonwebtoken";
import createError from "http-errors";

export const verifyAccessToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized());
  }

  const authHeader = req.headers.authorization;

  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  // console.log("token: ", token);

  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return next(createError.Unauthorized());
    } else {
      req.payload = payload;
      next();
    }
  });
};
