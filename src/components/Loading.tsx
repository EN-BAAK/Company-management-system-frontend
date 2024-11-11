import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = (): React.JSX.Element => {
  return (
    <div className='flex-center h-screen'>
      <Spinner variant='info' />
    </div>
  )
}

export default Loading
