import React from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const PaginationContainer = () => {
  const { meta } = useLoaderData()
  const { page, pageCount } = meta.pagination

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1
  })

  if (pageCount < 2) {
    return null
  }

  const { search, pathname } = useLocation()
  const navigate = useNavigate()

  const handlePageNumber = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
    console.log(pageNumber)
  }

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          type="button"
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1
            if (prevPage < 1) {
              prevPage = pageCount
            }
            handlePageNumber(prevPage)
          }}
        >
          Prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => handlePageNumber(pageNumber)}
              className={`btn btn-xs sm:btn-md join-item ${
                pageNumber === page ? 'bg-base-300 border-base-300' : ''
              }`}
            >
              {pageNumber}
            </button>
          )
        })}
        <button
          type="button"
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1
            if (nextPage > pageCount) nextPage = 1
            handlePageNumber(nextPage)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PaginationContainer
