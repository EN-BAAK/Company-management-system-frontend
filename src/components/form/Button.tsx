import React, { ButtonHTMLAttributes } from 'react'

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>): React.ReactNode => {
  return (
    <button
      className="primary-button d-block mx-auto rounded-2 border-0 w-100 text-main bg-main hover-main
              transition-3 py-1"
      {...props}
    >
      {props.children}
    </button>
  )
}

export default Button
