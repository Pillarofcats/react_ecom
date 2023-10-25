import express from "express"
import usersController from "../controllers/usersController.js"

const router = express.Router()

router.post("/signin", usersController.userSignIn)
router.post("/signup", usersController.userSignUp)
router.get("/auth", usersController.userAuth)

router.all("*", (req:express.Request, res:express.Response) => {
  res.send("404")
})

export default router