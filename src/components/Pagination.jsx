import Button from './Button'

function getVisiblePages(currentPage, totalPages) {
    const pages = []

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i)
        return pages
    }

    pages.push(1)

    if (currentPage > 3) {
        pages.push('...')
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    if (currentPage < totalPages - 2) {
        pages.push('...')
    }

    pages.push(totalPages)

    return pages
}

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null

    const visiblePages = getVisiblePages(currentPage, totalPages)

    return (
        <div className="flex items-center justify-center gap-2">
            <Button
                variant="secondary"
                className="min-w-[fit-content]"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ← Previous
            </Button>

            {visiblePages.map((page, index) =>
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-1 text-text-secondary">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium ${page === currentPage
                                ? 'bg-accent text-accent-text'
                                : 'border border-border bg-white text-text-primary hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            <Button
                variant="secondary"
                className="min-w-[fit-content]"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next →
            </Button>
        </div>
    )
}

export default Pagination