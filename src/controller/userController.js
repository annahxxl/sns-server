import * as userRepo from "../data/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresInDays = process.env.JWT_EXPIRES_IN_DAYS;
const bcryptSaltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export async function join(req, res) {
  const { username, password, name, email, url } = req.body;
  const foundUser = await userRepo.findByUsername(username);
  if (foundUser) {
    return res
      .status(409)
      .json({ msg: `${username}은 이미 존재하는 아이디입니다.` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const user = await userRepo.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(user);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepo.findByUsername(username);
  if (!user) {
    return res.status(401).json({ msg: "아이디와 비밀번호를 확인해 주세요." });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ msg: "아이디와 비밀번호를 확인해 주세요." });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}
