import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middlewares/errorHandler.js";
import userRouter from "./src/routes/userRouter.js";
import profileRouter from "./src/routes/profileRouter.js";
import postRouter from "./src/routes/postRouter.js";
import authAccess from "./src/middlewares/authAccess.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", userRouter);
app.use("/users", profileRouter);
app.use("/posts", authAccess, postRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.use(errorHandler);

export default app;
