import * as userRepo from "../model/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const AUTH_ERROR = { msg: "인증 에러" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepo.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.token = token;
    req.userId = user.id;
    next();
  });
};
