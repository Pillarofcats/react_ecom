import express from "express";
import oauthController from "../controllers/oauthController.js";
const router = express.Router();
router.post("/google/request", oauthController.oauthGoogleRequest);
router.get("/google/session", oauthController.oauthGoogleSession);
router.all("*", (req, res) => {
    res.send("404");
});
export default router;
