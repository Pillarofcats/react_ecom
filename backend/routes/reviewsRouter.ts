import express from "express"
import reviewsController from "../controllers/reviewsController.js"
const router = express.Router()

router.post("/productreview", reviewsController.productReview)
router.post("/addreview", reviewsController.addReview)
router.post("/userreviews", reviewsController.userReviews)

router.all("*", (req:express.Request, res:express.Response) => {
  res.send("404")
})

export default router