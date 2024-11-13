import React from 'react'

interface Props {
  children: React.ReactNode,
  disabled: boolean,
  onClick: () => void
}

const PaginationControlButton = ({ children, disabled, onClick }: Props): React.ReactNode => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='pagination-button border-0 fs-3 bg-transparent fw-bold text-decoration-underline'>
      {children}
    </button>
  )
}

export default PaginationControlButton
