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
        <div className="d-flex justify-content-between align-items-center py-5">
            <div className="prev">
                <Button
                    className="btn-prev"
                    disabled={!hasPreviousPage}
                    onClick={onPreviousPage}
                >Previous Page</Button>
            </div>

            <div className="page">Page {page}/{totalPages > 500 ? '500' : totalPages}</div>

            <div className="next">
                <Button
                    className="btn-next"
                    disabled={!hasNextPage}
                    onClick={onNextPage}
                >Next Page</Button>
            </div>
        </div>
    )
}

export default Pagination