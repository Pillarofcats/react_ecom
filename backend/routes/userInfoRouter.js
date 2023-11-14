import express from "express";
import userInfoController from "../controllers/userInfoController.js";
import isAuth from "../middleware/isAuth.js";
const router = express.Router();
router.put("/updateuser", isAuth, userInfoController.updateUserInfo);
router.post("/userpurchases", isAuth, userInfoController.userPurchases);
router.all("*", (req, res) => {
    res.send("404");
});
export default router;
