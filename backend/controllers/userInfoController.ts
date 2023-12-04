import { Request, Response } from "express";
import { tUserInfo, tParams } from "../types/types.js";
import dbQuery from "../models/db/db.js";

const updateUserInfo = async function (req: Request, res: Response) {
  const data = req.body as tUserInfo;

  if (!data?.u_id) return res.status(401).end();

  if (data.firstname && data.firstname.length < 1)
    return res.status(200).json({ message: "Firstname must be > 0 char" });
  if (data.lastname && data.lastname.length < 1)
    return res.status(200).json({ message: "Lastname must be > 0 char" });
  if (data.username && data.username.length < 1)
    return res.status(200).json({ message: "Username must be > 0 char" });
  if (data.address && data.address.length < 1)
    return res.status(200).json({ message: "Address must be > 0 char" });
  if (data.phone && data.phone.length < 12)
    return res
      .status(200)
      .json({ message: "Phone format must be: ###-###-####" });

  let queryInitStringNumber = 1;
  const queryStrings = [];
  const queryValues = [];

  for (const key in data) {
    //Omit u_id adding it at the end of query since it is for WHERE
    if (key === "u_id") continue;
    queryStrings.push(`${key} = $${queryInitStringNumber}`);
    queryValues.push(data[key as keyof tUserInfo]);
    queryInitStringNumber++;
  }
  queryValues.push(data.u_id);

  try {
    const updateUserInfo = await dbQuery(
      `UPDATE ecom.user_info SET ${queryStrings.join(
        ", "
      )} WHERE u_id = $${queryInitStringNumber} RETURNING *`,
      queryValues as tParams
    );

    if (data.username) {
      await dbQuery(`UPDATE ecom.all_users SET username = $1 WHERE u_id = $2`, [
        data.username,
        data.u_id,
      ]);
      await dbQuery(
        `UPDATE ecom.product_reviews SET username = $1 WHERE u_id = $2`,
        [data.username, data.u_id]
      );
    }

    return res.status(200).json({
      message: "Update successful",
      data: updateUserInfo.rows[0],
      status: "ok",
    });
  } catch (error) {
    console.error(error);
  }

  return res.status(500);
};

const userPurchases = async function (req: Request, res: Response) {
  const { u_id } = req.body;

  //Get User Purchases
  try {
    const getPurchases = await dbQuery(
      "SELECT purchase_date, p_id, stars, title, price_cent, qty_purchased FROM ecom.user_purchases WHERE u_id = $1",
      [u_id]
    );
    const purchaseData = getPurchases.rows;

    return res.status(200).json(purchaseData);
  } catch (error) {
    console.log("Error getting user purchases.");
  }

  res.status(500);
};

const userInfoController = {
  updateUserInfo,
  userPurchases,
};

export default userInfoController;
