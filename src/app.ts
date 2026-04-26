import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { userRoute } from "./app/user/user.route";
import { registerRoute } from "./app/auth/register/auth.register.route";
import { loginRoute } from "./app/auth/login/login.route";
import { noteRouter } from "./app/note/note.route";
import { fileRouter } from "./app/file/file.route";
import { uploadRouter } from "./app/upload/upload.route";
import { favoriteRouter } from "./app/favorite/favorite.route";
import { logUserRouter } from "./app/log_user/log_user.route";
import { activityRouter } from "./app/activity/activity.route";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(globalErrorHandler);

app.use("/api/users", userRoute);
app.use("/api/auth", registerRoute);
app.use("/api/auth", loginRoute);
app.use("/api/auth", loginRoute);
app.use("/api/note", noteRouter);
app.use("/api/file", fileRouter);
app.use("/api/upload-file", uploadRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/log-user", logUserRouter);
app.use("/api/activity", activityRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
