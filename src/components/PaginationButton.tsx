import React from 'react'

interface Props {
  title: string,
  disabled: boolean,
  onClick: () => void
}

const PaginationButton = ({ title, disabled, onClick }: Props): React.ReactNode => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='pagination-button border-0 fs-3 bg-transparent fw-bold text-decoration-underline'>
      {title}
    </button>
  )
}

export default PaginationButton
