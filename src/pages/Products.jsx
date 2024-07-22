import { Filters, PaginationContainer, ProductsContainer } from '../components'
import { customFetch } from '../utlis'

const url = '/products'

const allProductsQuery = (params) => {
  const { company, search, price, sort, shipping, category, page } = params
  return {
    queryKey: [
      'products',
      company ?? 'all',
      search ?? '',
      shipping ?? false,
      price ?? 100000,
      sort ?? 'a-z',
      category ?? 'all',
      page ?? 1,
    ],
    queryFn: () => customFetch(url, { params }),
  }
}

export const loader =
  (queryClient) =>
  async ({ request }) => {
    // manual approach to get params 1 by 1
    // const params = new URL(request.url).searchParams
    // const search = params.get('search')
    // console.log(search)

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    // console.log(params)
    const response = await queryClient.ensureQueryData(allProductsQuery(params))
    const products = response.data.data
    const meta = response.data.meta
    return { products, meta, params }
  }

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}

export default Products
