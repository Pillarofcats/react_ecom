import { configureStore } from "@reduxjs/toolkit"

import productsSlice from "../slices/productsSlice"
import cartSlice from "../slices/cartSlice"
import userSlice from "../slices/userSlice"
import reviewsSlice from "../slices/reviewsSlice"

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    user: userSlice,
    reviews: reviewsSlice,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch