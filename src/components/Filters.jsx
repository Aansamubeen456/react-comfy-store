import { Form, useLoaderData, Link } from 'react-router-dom'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormRange from './FormRange'
import FormCheckBox from './FormCheckBox'

const Filters = () => {
  const { meta, params } = useLoaderData()
  const { search, company, category, order, price, shipping } = params
  return (
    <Form className="bg-base-200 -md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />
      {/* CATEGORIES */}
      <FormSelect
        name="category"
        label="select category"
        size="select-sm"
        list={meta.categories}
        defaultValue={category}
      />

      {/* COMAPNIES */}
      <FormSelect
        name="comapny"
        label="select company"
        size="select-sm"
        list={meta.companies}
        defaultValue={company}
      />
      {/* ORDER */}
      <FormSelect
        name="order"
        label="sort by"
        size="select-sm"
        list={['a-z', 'z-a', 'high', 'low']}
        defaultValue={order}
      />
      {/* PRICE */}
      <FormRange
        name="price"
        size="range-sm"
        label="select price"
        price={price}
      />
      {/* SHIPPING */}
      <FormCheckBox
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />

      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm uppercase">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm uppercase">
        reset
      </Link>
    </Form>
  )
}

export default Filters
