import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from '@/components/ui/pagination'
import { useMemo } from 'react'

const getPagesConfig = ({
  pageCount,
  currentPage,
}: {
  pageCount: number
  currentPage: number
}) => {
  let pages = []
  if (pageCount <= 5) {
    pages = Array.from(Array(pageCount + 1).keys()).slice(1)
  } else {
    if (currentPage <= 3) {
      pages = [1, 2, 3, 4, 0, pageCount]
    } else if (currentPage >= pageCount - 2) {
      pages = [1, 0, pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
    } else {
      pages = [1, 0, currentPage - 1, currentPage, currentPage + 1, 0, pageCount]
    }
  }

  return pages
}

const PaginationControl = ({
  pageCount,
  currentPage,
  setCurrentPage,
  className
}: {
  pageCount: number
  currentPage: number
  setCurrentPage: Function
  className?: string | undefined
}) => {
  const pageConfig = useMemo(() => getPagesConfig({ pageCount, currentPage }), [pageCount, currentPage])

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
          <PaginationPrevious />
        </PaginationItem>

        {pageConfig.map((page: number) => {
          if (page <= 0) {
            return (
              <PaginationItem key={`ellipsis-${page === 0 ? 'left' : 'right'}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={`page-${page}`} onClick={() => setCurrentPage(page)}>
              <PaginationLink isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationControl