import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
}

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload

      // if product exist jsut increase the amount otherwise push product to cart
      const item = state.cartItems.find((i) => i.cartID === product.cartID)

      if (item) {
        item.amount += product.amount
      } else {
        state.cartItems.push(product)
      }

      // calculate values
      state.numItemsInCart += product.amount
      state.cartTotal += product.price * product.amount

      // call the reducer
      cartSlice.caseReducers.calculateTotals(state)
      toast.success('item added to cart')
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload
      const product = state.cartItems.find((i) => i.cartID === cartID)
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID)

      state.numItemsInCart -= product.amount
      state.cartTotal -= product.amount * product.price

      cartSlice.caseReducers.calculateTotals(state)
      toast.error('Item removed from cart')
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload
      const product = state.cartItems.find((i) => i.cartID === cartID)

      state.numItemsInCart += amount - product.amount
      state.cartTotal += product.price * (amount - product.amount)
      product.amount = amount

      cartSlice.caseReducers.calculateTotals(state)
      toast.success('Item updated')
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState))
      return defaultState
    },

    // this reducer is created to remove redundancy of code and it will be called in other reducers
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal
      state.orderTotal += state.shipping + state.cartTotal + state.tax
      // set local storage
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions

export default cartSlice.reducer
