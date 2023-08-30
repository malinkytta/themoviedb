import React from 'react'
import Button from 'react-bootstrap/Button'

interface IPaginationProps {
    page: number
    totalPages: number
    hasPreviousPage: boolean
    hasNextPage: boolean
    onPreviousPage: () => void
    onNextPage: () => void
}

const Pagination: React.FC<IPaginationProps> = ({
    page,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    onPreviousPage,
    onNextPage,
}) => {



    return (
        <div className="d-flex justify-content-between align-items-center py-3">
            <div className="prev">
                <Button
                    disabled={!hasPreviousPage}
                    onClick={onPreviousPage}
                    variant="secondary"
                >Previous Page</Button>
            </div>

            <div className="page">Page {page}/{totalPages > 500 ? '500' : totalPages}</div>

            <div className="next">
                <Button
                    disabled={!hasNextPage}
                    onClick={onNextPage}
                    variant="secondary"
                >Next Page</Button>
            </div>
        </div>
    )
}

export default Pagination