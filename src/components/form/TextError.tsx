import React from 'react'

interface Props {
  msg: string
}

const TextError = ({ msg }: Props): React.JSX.Element => {
  return (
    <div className='text-danger fw-medium error'>
      {msg}
    </div>
  )
}

export default TextError
