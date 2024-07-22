import React from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData()
  const { page, pageCount } = meta.pagination

  if (pageCount < 2) {
    return null
  }

  const { search, pathname } = useLocation()
  const navigate = useNavigate()

  const handlePageNumber = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        type="button"
        onClick={() => handlePageNumber(pageNumber)}
        className={`btn btn-xs sm:btn-md join-item ${
          activeClass ? 'bg-base-300 border-base-300' : ''
        }`}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []

    // first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }))

    // dots button
    if (page > 2) {
      pageButtons.push(
        <button key="dots-1" className="btn btn-xs sm:btn-md join-item">
          ...
        </button>
      )
    }

    // active page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }))
    }
    // dots button
    if (page < pageCount - 1) {
      pageButtons.push(
        <button key="dots-2" className="btn btn-xs sm:btn-md join-item">
          ...
        </button>
      )
    }

    // last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    )
    return pageButtons
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
        {renderPageButtons()}
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

export default ComplexPaginationContainer
