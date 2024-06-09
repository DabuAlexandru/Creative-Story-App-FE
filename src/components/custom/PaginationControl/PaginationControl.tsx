import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from '@/components/ui/pagination'
import { useMemo } from 'react'

const LEFT_ELLIPSIS = -1
const RIGHT_ELLISPSIS = -2

const getPagesConfig = ({
  pageCount,
  currentPage,
}: {
  pageCount: number
  currentPage: number
}) => {
  let pages = []
  if (pageCount <= 5) {
    pages = Array.from(Array(pageCount).keys())
  } else {
    if (currentPage <= 2) {
      pages = [0, 1, 2, 3, RIGHT_ELLISPSIS, pageCount - 1]
    } else if (currentPage >= pageCount - 3) {
      pages = [0, LEFT_ELLIPSIS, pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1]
    } else {
      pages = [0, LEFT_ELLIPSIS, currentPage - 1, currentPage, currentPage + 1, RIGHT_ELLISPSIS, pageCount - 1]
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
        <PaginationItem onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}>
          <PaginationPrevious />
        </PaginationItem>

        {pageConfig.map((page: number) => {
          if (page === LEFT_ELLIPSIS || page === RIGHT_ELLISPSIS) {
            return (
              <PaginationItem key={`ellipsis-${page === LEFT_ELLIPSIS ? 'left' : 'right'}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={`page-${page}`} onClick={() => setCurrentPage(page)}>
              <PaginationLink isActive={currentPage === page}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 1))}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationControl