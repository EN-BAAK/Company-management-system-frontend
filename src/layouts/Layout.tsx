import React from 'react'
import { Spinner } from 'react-bootstrap'

const layout = (): React.ReactNode => {
  return (
    <div id='layout' className='position-fixed h-100vh flex-center'>
      <Spinner variant='info' />
    </div>
  )
}

export default layout
