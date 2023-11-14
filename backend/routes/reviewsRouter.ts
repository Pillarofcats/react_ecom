import express from "express"
import reviewsController from "../controllers/reviewsController.js"
import isAuth from "../middleware/isAuth.js"

const router = express.Router()

router.post("/productreview", reviewsController.productReview)
router.post("/addreview", isAuth, reviewsController.addReview)
router.post("/userreviews", isAuth, reviewsController.userReviews)

router.all("*", (req:express.Request, res:express.Response) => {
  res.send("404")
})

export default router