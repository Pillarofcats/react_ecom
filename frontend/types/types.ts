type tSignUp = {
  username: string;
  email: string;
  password: string;
}

type tSignIn = {
  email: string;
  password: string;
}

type tSetToggleSignIn = {
  setToggleSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type tProduct = {
  p_id: string,
  title: string,
  description: string,
  price_cent: number,
  weight_lbs: number,
  product_type: string,
  quantity: number,
  quantity_sold?: number | null,
  stars: number,
  num_reviews?: number
}

type tCartItem = {
  qty: number,
  item: tProduct
}

type tPurchase = {
  purchase_date: string,
  p_id: string,
  stars: number,
  title: string,
  price_cent: number,
  qty_purchased: number
}

type tUserInfo = {
  u_id?: number,
  email?: string,
  username?: string,
  firstname?: string,
  lastname?: string,
  birthday?: string,
  address?: string,
  phone?: string,
  purchases?: tCartItem[],
  cart?: tCartItem[]
}

type tReview = {
  u_id: number,
  p_id: number,
  title: string,
  r_date?: Date,
  username: string,
  review: string,
  stars: number
}

type tParams = (string | number)[]
type tType = "all" | "apparel" | "cookware" | "cosmetics" | "electronics" | "furniture" | "food" | " instruments" | "jewelry" | "tools" | "toys"

//Redux toolkit state slice types
type tUserSlice = {
  user: tUserInfo | null,
  reviews?: tReview[],
  purchased?: tPurchase[] ,
  status: "pending" | "fulfilled" | "rejected",
  error: string | null
}
type tProductsSlice = {
  products: tProduct[],
  filtered: tProduct[],
  dynamicPageProduct: tProduct | null,
  status: "pending" | "fulfilled" | "rejected",
  error: string | null
}
type tReviewsSlice = {
  reviews: tReview[],
  status: "pending" | "fulfilled" | "rejected",
  error: string | null
}
type tCartSlice = { 
  u_id?: number | null,
  cart: tCartItem[]
}

export type {
  tSignUp,
  tSignIn,
  tSetToggleSignIn,
  tProduct,
  tProductsSlice,
  tType,
  tParams,
  tCartItem,
  tCartSlice,
  tUserInfo,
  tUserSlice,
  tReview,
  tReviewsSlice,
  tPurchase
}