import { Request, Response } from "express"
import dbQuery from "../models/db/db.js"

const productReview = async function(req:Request, res:Response) {
  const {pid} = req.body
  console.log("pid", pid)

  try {
    const reviews = await dbQuery("SELECT * FROM ecom.product_reviews WHERE p_id = $1", [pid])

    console.log("reviews", reviews.rows)
    res.status(200).json(reviews.rows)
  } catch(error) {
    console.error("Failed to get reviews", error)
  }

  res.status(500)
}

const reviewsController = {
  productReview
}

export default reviewsController