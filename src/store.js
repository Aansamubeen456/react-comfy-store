import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import userReducer from './features/user/UserSlice'

const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
  },
})

export default store
