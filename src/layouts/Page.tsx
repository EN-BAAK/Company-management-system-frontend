import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string,
  children: React.ReactNode
}

const Page = ({ className, children, ...reset }: Props): React.JSX.Element => {
  return (
    <div className={`flex-1 bg-white ${className}`} {...reset}>
      {children}
    </div>
  )
}

export default Page
