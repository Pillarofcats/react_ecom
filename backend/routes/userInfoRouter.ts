import express from "express"
import userInfoController from "../controllers/userInfoController.js"

const router = express.Router()

router.put("/updateuser", userInfoController.updateUserInfo)

router.all("*", (req:express.Request, res:express.Response) => {
  res.send("404")
})

export default router