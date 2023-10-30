import dbQuery from "../models/db/db.js";
const byType = async function (req, res) {
    const { type } = req.body;
    const productType = type.charAt(0).toUpperCase() + type.slice(1);
    const queryAll = ["SELECT * FROM ecom.all_products", []];
    const queryType = ["SELECT * FROM ecom.all_products WHERE product_type = $1", [productType]];
    const query = productType === "All" ? queryAll : queryType;
    try {
        const products = await dbQuery(query[0], query[1]);
        return res.status(200).json(products.rows);
    }
    catch (error) {
        console.error(error);
    }
    res.status(500);
};
const singleProduct = async function (req, res) {
    const { pid } = req.body;
    try {
        const products = await dbQuery("SELECT * FROM ecom.all_products WHERE p_id = $1", [pid]);
        return res.status(200).json(products.rows[0]);
    }
    catch (error) {
        console.error(error);
    }
    res.status(500);
};
const purchase = async function (req, res) {
    const { cart } = req.body;
    const queryValues = [];
    let updatedProductQuantity;
    for (const index in cart) {
        updatedProductQuantity = cart[index].item.quantity - cart[index].qty;
        queryValues.push([updatedProductQuantity, cart[index].item.p_id]);
    }
    //updatePurchasedProducts
    try {
        for (const index in queryValues) {
            console.log("updated Qty:", queryValues[index]);
            await dbQuery(`UPDATE ecom.all_products SET quantity = $1 WHERE p_id = $2`, queryValues[index]);
        }
    }
    catch (error) {
        console.log("Error updating product quantity");
    }
    return res.status(200).end();
};
const productsController = {
    byType,
    singleProduct,
    purchase
};
export default productsController;
