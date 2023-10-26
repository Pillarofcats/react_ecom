import { Request, Response } from "express"
import dbQuery from "../models/db/db.js"
import { tReview } from "../types/types.js"

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

const addReview = async function(req:Request, res:Response) {
  const  { p_id, u_id, username, review, stars } = req.body as tReview
  console.log("review", review)
  try {

    const addedReview = await dbQuery("INSERT INTO ecom.product_reviews (p_id, u_id, username, review, stars) VALUES($1, $2, $3, $4, $5) RETURNING *", [p_id, u_id, username, review, stars])

    res.status(200).json(addedReview.rows[0])
  } catch(error) {
    console.error("Failed to get reviews", error)
  }

  res.status(500)
}

const reviewsController = {
  productReview,
  addReview
}

export default reviewsController