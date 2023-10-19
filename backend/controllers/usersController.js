import dbQuery from "../models/db/db.js";
import bcrypt from "bcrypt";
const userSignUp = async function (req, res) {
    const { username, email, password } = req.body;
    // console.log("username:", username, "email:", email, "password:", password)
    try {
        const selectUser = await dbQuery("SELECT email FROM ecom.all_users WHERE email = $1", [email]);
        // console.log("user exist", selectUser.rows)
        if (selectUser.rows.length !== 0)
            return res.status(200).json("User already exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        const signedUp = await dbQuery("INSERT INTO ecom.all_users (username, email, password) VALUES($1, $2, $3) RETURNING u_id", [username, email, hashedPassword]);
        const { u_id } = signedUp.rows[0];
        // console.log("user registered", u_id)
        await dbQuery("INSERT INTO ecom.user_info(u_id, username, email) VALUES($1, $2, $3)", [u_id, username, email]);
        // console.log("insert user info", insertUserInfo.rows[0])
        return res.status(200);
    }
    catch (error) {
        console.error(error);
    }
    return res.status(500);
};
const userSignIn = async function (req, res) {
    const { email, password } = req.body;
    // console.log("email:", email, "password:", password)
    try {
        const signin = await dbQuery("SELECT * FROM ecom.all_users WHERE email = $1", [email]);
        // console.log("login", login.rows)
        const hashedPassword = signin.rows[0]?.password;
        const u_id = signin.rows[0]?.u_id;
        // console.log("HashedPass", hashedPassword)
        if (signin.rows.length === 0)
            return res.status(200).json("Login failed");
        const validPassword = await bcrypt.compare(password, hashedPassword);
        if (!validPassword)
            return res.status(200).json("Bad password");
        const selectUserInfo = await dbQuery("SELECT * FROM ecom.user_info WHERE u_id = $1", [u_id]);
        return res.status(200).json(selectUserInfo.rows[0]);
    }
    catch (error) {
        console.error(error);
    }
    return res.status(500);
};
const usersController = {
    userSignUp,
    userSignIn
};
export default usersController;
