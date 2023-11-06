import express from "express";
import userInfoController from "../controllers/userInfoController.js";
const router = express.Router();
router.put("/updateuser", userInfoController.updateUserInfo);
router.post("/userpurchases", userInfoController.userPurchases);
router.all("*", (req, res) => {
    res.send("404");
});
export default router;
