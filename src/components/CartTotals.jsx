import { useSelector } from 'react-redux'
import { formatPrice } from '../utlis'

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  )
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <p className="flex justify-between text-xs pb-2 border-base-300 border-b">
          <span>SubTotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>

        <p className="flex justify-between text-xs pb-2 border-base-300 border-b">
          <span>Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>

        <p className="flex justify-between text-xs pb-2 border-base-300 border-b">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>

        <p className="mt-4 flex justify-between text-xs pb-2">
          <span className="font-bold">Order Total</span>
          <span className="font-bold">{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  )
}

export default CartTotals
