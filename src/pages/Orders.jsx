import React from 'react'
import { redirect, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { customFetch } from '../utlis'
import {
  ComplexPaginationContainer,
  OrderList,
  SectionTitle,
} from '../components'

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      'orders',
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  }
}

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user
    if (!user) {
      toast.warn('Logged in to check your orders')
      return redirect('/login')
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      )
      return { orders: response.data.data, meta: response.data.meta }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error?.message ||
        'there was an error for accessing your orders'
      toast.error(errorMsg)

      if (error?.response?.status === 401 || 403) return redirect('/login')
      return null
    }
  }

const Orders = () => {
  const { meta } = useLoaderData()
  const { total } = meta.pagination
  if (total < 1) {
    return <SectionTitle text="Please make an order" />
  }
  return (
    <>
      <SectionTitle text="Your orders" />
      <OrderList />
      <ComplexPaginationContainer />
    </>
  )
}

export default Orders
