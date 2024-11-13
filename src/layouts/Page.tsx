import React, { HTMLAttributes } from 'react'
import { useAppContext } from '../context/AppProvider'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string,
  children: React.ReactNode
}

const Page = ({ children, ...reset }: Props): React.JSX.Element => {
  const { user } = useAppContext()

  return (
    <div className={`page flex-1 bg-white d-flex flex-column align-items-start overflow-hidden ${user.role === "admin" && "admin"}`} {...reset}>
      {children}
    </div>
  )
}

export default Page
