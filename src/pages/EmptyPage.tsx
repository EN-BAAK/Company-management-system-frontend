import React from 'react'
import NotFound from "../assets/images/notFound.svg"

const EmptyPage = (): React.JSX.Element => {
  return (
    <div id='empty' className='flex-center flex-column flex-1'>
      <img src={NotFound} alt="404-img" className='w-75' />
      <h1 className='fw-bold mt-3'>404 Not found</h1>
    </div>
  )
}

export default EmptyPage
