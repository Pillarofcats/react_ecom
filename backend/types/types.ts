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
  stars: number
}

type tCartItem = {
  qty: number,
  item: tProduct
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
  username: string,
  review: string,
  stars: number
}

type tParams = (string | number)[]
type tType = "all" | "apparel" | "cookware" | "cosmetics" | "electronics" | "furniture" | "food" | " instruments" | "jewelry" | "tools" | "toys"

//Redux toolkit state slice types
type tUserSlice = {
  user: tUserInfo | null,
  status: "pending" | "fulfilled" | "rejected",
  error: string | null
}
type tProductsSlice = {
  products: tProduct[],
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
  tReviewsSlice
}