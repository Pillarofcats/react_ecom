import { Request, Response } from "express"
import dbQuery from "../models/db/db.js"

const allProducts = async function(req: Request, res: Response) {

  try {
    const products = await dbQuery("SELECT * FROM ecom.all_products", [])
    return res.status(200).json(products.rows)
  } catch(error) {
    console.error(error)
  }

  res.status(500)
}

const productsController = {
  allProducts
}

export { productsController }