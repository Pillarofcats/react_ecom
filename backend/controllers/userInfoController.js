import dbQuery from "../models/db/db.js";
const updateUserInfo = async function (req, res) {
    const data = req.body;
    let queryInitStringNumber = 1;
    const queryStrings = [];
    const queryValues = [];
    for (const key in data) {
        //Omit u_id adding it at the end of query since it is for WHERE
        if (key === "u_id")
            continue;
        queryStrings.push(`${key} = $${queryInitStringNumber}`);
        queryValues.push(data[key]);
        queryInitStringNumber++;
    }
    queryValues.push(data.u_id);
    try {
        const updateUserInfo = await dbQuery(`UPDATE ecom.user_info SET ${queryStrings.join(", ")} WHERE u_id = $${queryInitStringNumber} RETURNING *`, queryValues);
        if (data.username) {
            await dbQuery(`UPDATE ecom.all_users SET username = $1 WHERE u_id = $2`, [data.username, data.u_id]);
            await dbQuery(`UPDATE ecom.product_reviews SET username = $1 WHERE u_id = $2`, [data.username, data.u_id]);
        }
        return res.status(200).json(updateUserInfo.rows[0]);
    }
    catch (error) {
        console.error(error);
    }
    return res.status(500);
};
const userInfoController = {
    updateUserInfo
};
export default userInfoController;
