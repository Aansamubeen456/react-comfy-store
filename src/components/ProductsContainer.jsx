import { useLoaderData } from 'react-router-dom'
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import { useState } from 'react'
import { BsFillGridFill, BsList } from 'react-icons/bs'

const ProductsContainer = () => {
  const { meta } = useLoaderData()
  const totalProducts = meta.pagination.total

  const [layout, setLayout] = useState('grid')

  const buttonStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? 'btn-primary text-primary-content'
        : 'btn-ghost text-base-content'
    }`
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalProducts} Product{totalProducts > 1 && 's'}
        </h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            className={buttonStyles('grid')}
            onClick={() => {
              setLayout('grid')
            }}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            className={buttonStyles('list')}
            onClick={() => {
              setLayout('list')
            }}
          >
            <BsList />
          </button>
        </div>
      </div>

      {/* view products */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16 capitalize">
            Sorry, no product matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  )
}

export default ProductsContainer
