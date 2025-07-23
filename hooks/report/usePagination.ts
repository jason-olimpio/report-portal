import {useState} from 'react'

const usePagination = <T>(items: T[], itemsPerPage: number = 5) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return
    }

    setCurrentPage(page)
  }

  const reset = () => setCurrentPage(1)

  return {
    currentPage,
    setCurrentPage: goToPage,
    totalPages,
    currentItems,
    reset,
  }
}

export default usePagination
