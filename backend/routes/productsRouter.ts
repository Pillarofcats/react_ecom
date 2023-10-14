import express from "express"
import { productsController } from "../controllers/productsController.js"

const router = express.Router()

router.get("/allproducts", productsController.allProducts)

router.all("*", (req:express.Request, res:express.Response) => {
  res.send("404")
})

export default router