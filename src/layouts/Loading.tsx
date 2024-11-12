import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = (): React.JSX.Element => {
  return (
    <div className='h-100 flex-center bg-white'>
      <Spinner variant='info' />
    </div>
  )
}

export default Loading
