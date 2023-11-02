//Libraries & Modules
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
// import { v4 as uuidv4 } from "uuid"
//dotenv ESM
import dotenv from "dotenv";
dotenv.config();
//path ESM
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
//Routers
import usersRouter from "../routes/usersRouter.js";
import userInfoRouter from "../routes/userInfoRouter.js";
import productsRouter from "../routes/productsRouter.js";
import oauthRouter from "../routes/oauthRouter.js";
import reviewsRouter from "../routes/reviewsRouter.js";
//App
const expressPORT = process.env.PORT || 5000;
const app = express();
app.use(cors({
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    origin: ["http://localhost:5173", "https://frontend-production-2a82.up.railway.app", ""],
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
//Routes
//GOOGLE OAUTH URI: http://localhost:5000/api/oauth/google/session
app.use("/api/reviews", reviewsRouter);
app.use("/api/oauth", oauthRouter);
app.use("/api/users", usersRouter);
app.use("/api/userinfo", userInfoRouter);
app.use("/api/products", productsRouter);
app.use("*", (req, res) => {
    res.send("404");
});
app.listen(expressPORT, () => {
    console.log(`Server started on PORT ${expressPORT}`);
});
