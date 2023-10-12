import express from "express";
const router = express.Router();
import { usersController } from "../controllers/usersController.js";
router.post("/signin", usersController.usersLogin);
router.post("/signup", usersController.usersRegister);
router.all("*", (req, res) => {
    res.send("404");
});
export default router;
