import dbQuery from "../models/db/db.js";
const productReview = async function (req, res) {
    const { pid } = req.body;
    console.log("pid", pid);
    try {
        const reviews = await dbQuery("SELECT * FROM ecom.product_reviews WHERE p_id = $1", [pid]);
        console.log("reviews", reviews.rows);
        res.status(200).json(reviews.rows);
    }
    catch (error) {
        console.error("Failed to get reviews", error);
    }
    res.status(500);
};
const addReview = async function (req, res) {
    const { p_id, u_id, title, username, review, stars } = req.body;
    console.log("username", username, "title", title);
    try {
        //Update review with new review
        const addedReview = await dbQuery("INSERT INTO ecom.product_reviews (p_id, u_id, title, username, review, stars) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [p_id, u_id, title, username, review, stars]);
        //Get product review for single product
        const reviews = await dbQuery("SELECT * FROM ecom.product_reviews WHERE p_id = $1", [p_id]);
        const TOTAL_USER_REVIEW_STARS = reviews.rows.reduce((acc, curr) => {
            return acc += curr.stars;
        }, 0);
        console.log("total user stars:", TOTAL_USER_REVIEW_STARS);
        const NUM_REVIEWS = reviews.rows.length;
        const MAX_PRODUCT_STARS = 5;
        const calcProductStars = (TOTAL_USER_REVIEW_STARS) / (NUM_REVIEWS * MAX_PRODUCT_STARS) * 100;
        console.log("calcStars", calcProductStars);
        let updatedProductStars;
        if (calcProductStars <= 20)
            updatedProductStars = 1;
        else if (calcProductStars > 20 && calcProductStars <= 40)
            updatedProductStars = 2;
        else if (calcProductStars > 40 && calcProductStars <= 60)
            updatedProductStars = 3;
        else if (calcProductStars > 60 && calcProductStars <= 80)
            updatedProductStars = 4;
        else if (calcProductStars > 80)
            updatedProductStars = 5;
        console.log("updated product stars", updatedProductStars);
        await dbQuery("UPDATE ecom.all_products SET stars = $1 WHERE p_id = $2", [updatedProductStars, p_id]);
        res.status(200).json(addedReview.rows[0]);
    }
    catch (error) {
        console.error("Failed to get reviews", error);
    }
    res.status(500);
};
const userReviews = async function (req, res) {
    const { u_id } = req.body;
    const getUserReviews = await dbQuery("SELECT * FROM ecom.product_reviews WHERE u_id = $1", [u_id]);
    return res.status(200).json(getUserReviews.rows);
};
const reviewsController = {
    productReview,
    addReview,
    userReviews
};
export default reviewsController;
