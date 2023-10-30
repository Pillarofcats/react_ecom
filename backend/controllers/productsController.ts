import { Request, Response } from "express"
import dbQuery from "../models/db/db.js"

const byType = async function(req: Request, res: Response) {
  const { type } = req.body
  const productType = type.charAt(0).toUpperCase() + type.slice(1)

  const queryAll:[string, []] = [ "SELECT * FROM ecom.all_products", [] ]
  const queryType:[string, string[]] = [ "SELECT * FROM ecom.all_products WHERE product_type = $1", [productType] ]

  const query = productType === "All" ? queryAll : queryType

  try {
    const products = await dbQuery(query[0], query[1])
    return res.status(200).json(products.rows)
  } catch(error) {
    console.error(error)
  }
  res.status(500)
}

const singleProduct = async function(req: Request, res: Response) {

  const { pid } = req.body

  try {
    const products = await dbQuery("SELECT * FROM ecom.all_products WHERE p_id = $1", [pid])
    return res.status(200).json(products.rows[0])
  } catch(error) {
    console.error(error)
  }
  res.status(500)
}

const purchase = async function(req:Request, res:Response) {
  const { cart }= req.body

  console.log("purchase", cart[0])
  
  res.status(200).json(cart[0])
}

const productsController = {
  byType,
  singleProduct,
  purchase
}

export default productsController