import express from "express";
import { productsController } from "../controllers/productsController.js";
const router = express.Router();
router.get("/allproducts", productsController.allProducts);
router.all("*", (req, res) => {
    res.send("404");
});
export default router;
