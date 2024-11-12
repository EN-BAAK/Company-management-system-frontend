import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string,
  children: React.ReactNode
}

const Page = ({ children, ...reset }: Props): React.JSX.Element => {
  return (
    <div className="page flex-1 bg-white d-flex flex-column align-items-start overflow-hidden" {...reset}>
      {children}
    </div>
  )
}

export default Page
