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

type tUserAccount = object & {
  username?: string,
  email?: string,
  firstname?: string,
  lastname?: string,
  address?: string,
  phone?: string,
  birthday?: string,
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

type tProducts = tProduct[]
type tDynamicPageProduct = tProduct | null
type tType = "all" | "apparel" | "cookware" | "cosmetics" | "electronics" | "furniture" | "food" | " instruments" | "jewelry" | "tools" | "toys"
type tProductsStatus = "pending" | "fulfilled" | "rejected"
type tProductsError = string | null

type tProductsSlice = {
  products: tProducts,
  dynamicPageProduct: tDynamicPageProduct,
  status: tProductsStatus,
  error: tProductsError
}

export type {
  tSignUp,
  tSignIn,
  tSetToggleSignIn,
  tUserAccount,
  tProduct,
  tProducts,
  tProductsSlice,
  tType,
  tDynamicPageProduct
}