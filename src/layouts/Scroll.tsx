import React from 'react'

interface Props {
  children: React.ReactNode
}

const Scroll = ({ children }: Props): React.JSX.Element => {
  return (
    <div className='flex-1 overflow-x-hidden overflow-y-auto p-2 w-100'>
      {children}
    </div>
  )
}

export default Scroll
