import { Form, redirect } from 'react-router-dom'
import FormInput from './FormInput'
import SubmitButton from './SubmitButton'
import { customFetch, formatPrice } from '../utlis'
import { clearCart } from '../features/cart/cartSlice'
import { toast } from 'react-toastify'

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const { name, address } = Object.fromEntries(formData)

    const user = store.getState().userState.user
    const { cartItems, numItemsInCart, orderTotal } = store.getState().cartState

    const info = {
      address,
      cartItems,
      name,
      numItemsInCart,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
    }

    try {
      const response = await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      queryClient.removeQueries(['orders'])
      store.dispatch(clearCart())
      toast.success('order placed successfully')
      return redirect('/orders')
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error?.message ||
        'Thewre was an error placing your order!'
      toast.error(errorMsg)

      if (error?.response?.status === 401 || 403) return redirect('/login')
      return null
    }
  }

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize"> shipping information</h4>
      <FormInput type="text" name="name" label="first name" />
      <FormInput type="text" name="address" label="address" />
      <div className="mt-4">
        <SubmitButton text="place your order" />
      </div>
    </Form>
  )
}

export default CheckoutForm
