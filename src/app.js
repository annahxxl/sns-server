import express from "express";
import "express-async-errors";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import postsRouter from "./router/postsRouter.js";
import dotenv from "dotenv";
dotenv.config();

// 앱 세팅
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// 라우터 세팅
app.use("/posts", postsRouter);

// 지원하지 않는 API로 접속할 경우 (Not found)
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 에러 처리
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// 서버 연결
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ ${PORT}포트에서 서버 가동 중!`);
});
