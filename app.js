import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middlewares/errorHandler.js";
import userRouter from "./src/routes/userRouter.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", userRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.use(errorHandler);

export default app;
