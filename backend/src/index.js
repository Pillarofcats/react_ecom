//Libraries & Modules
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { v4 as uuidv4 } from "uuid";
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
//App
const expressPORT = process.env.PORT || 5000;
const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
console.log("uuid", uuidv4());
//Routes
app.use("/api/users", usersRouter);
app.use("/api/userinfo", userInfoRouter);
app.use("/api/products", productsRouter);
app.get("/", (req, res) => {
    res.status(200).json("got it");
});
app.use("*", (req, res) => {
    res.send("404");
});
app.post("/", (req, res) => {
    const body = req.body;
    console.log("body", body);
    res.status(200).json(body);
});
app.listen(expressPORT, () => {
    console.log(`Server started on PORT ${expressPORT}`);
});
