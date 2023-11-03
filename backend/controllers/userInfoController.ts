import { Request, Response } from "express"
import { tUserInfo, tParams } from "../types/types.js"
import dbQuery from "../models/db/db.js"

const updateUserInfo = async function(req:Request, res:Response) {

  const data = req.body as tUserInfo

  let queryInitStringNumber = 1
  const queryStrings = []
  const queryValues = []  

  for(const key in data) {
    //Omit u_id adding it at the end of query since it is for WHERE
    if(key === "u_id") continue
    queryStrings.push(`${key} = $${queryInitStringNumber}`)
    queryValues.push(data[key as keyof tUserInfo])
    queryInitStringNumber++
  }
  queryValues.push(data.u_id)

  try {
    const updateUserInfo = await dbQuery(`UPDATE ecom.user_info SET ${queryStrings.join(", ")} WHERE u_id = $${queryInitStringNumber} RETURNING *`, queryValues as tParams)

    if(data.username) {
      await dbQuery(`UPDATE ecom.all_users SET username = $1 WHERE u_id = $2`,[data.username, data.u_id])
      await dbQuery(`UPDATE ecom.product_reviews SET username = $1 WHERE u_id = $2`, [data.username, data.u_id])
    }
    
    return res.status(200).json(updateUserInfo.rows[0])

  } catch(error) {
    console.error(error)
  }

  return res.status(500)
}

const userPurchases = async function(req:Request, res:Response) {
  const {u_id} = req.body

  try {
    console.log("u_id", u_id)
    return res.status(200).json("Whoo")

  } catch(error) {
    console.log("Error getting user purchases.")
  }
  
  res.status(500)
}

const userInfoController = {
  updateUserInfo,
  userPurchases
}

export default userInfoController