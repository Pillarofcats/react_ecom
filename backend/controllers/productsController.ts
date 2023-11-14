import { Request, Response } from "express"
import dbQuery from "../models/db/db.js"
import { tCartSlice } from "../types/types.js"

const byType = async function(req: Request, res: Response) {
  const { type } = req.body
  const productType = type.charAt(0).toUpperCase() + type.slice(1)

  const queryAll:[string, []] = [ "SELECT * FROM ecom.all_products ORDER BY p_id", [] ]
  const queryType:[string, string[]] = [ "SELECT * FROM ecom.all_products WHERE product_type = $1 ORDER BY p_id", [productType] ]

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
  const {cart, u_id}:tCartSlice = req.body

  let queryValues = [] 

  if(u_id) {

    for(const index in cart) {
      queryValues.push([u_id, cart[index].item.p_id, cart[index].item.stars, cart[index].item.title, cart[index].item.price_cent, cart[index].qty])
    }

    try {
      for(const index in queryValues) {
        await dbQuery("INSERT INTO ecom.user_purchases (u_id, p_id, stars, title, price_cent, qty_purchased) VALUES($1, $2, $3, $4, $5, $6)", queryValues[index])
      }
    } catch(error) {
      console.log("Error inserting user product purchases")
    }
  }

  //Update quantity of purchased products
  queryValues = [] 
  let updatedProductQuantity:number

  for(const index in cart) {
    updatedProductQuantity = cart[index].item.quantity - cart[index].qty
    queryValues.push([updatedProductQuantity, cart[index].item.p_id])
  }

  try {
    for(const index in queryValues) {
      await dbQuery(`UPDATE ecom.all_products SET quantity = $1 WHERE p_id = $2`, queryValues[index])
    }

    return res.status(200).end()
  } catch(error) {
    console.log("Error updating product quantity")
  }

  return res.status(500).end()
}

const productsController = {
  byType,
  singleProduct,
  purchase
}

export default productsController