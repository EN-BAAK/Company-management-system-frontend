import React from 'react'
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

interface Props {
  name: string
}

const Header = ({ name }: Props): React.ReactNode => {
  const navigate = useNavigate()

  return (
    <header className='rounded-bottom-4 bg-main text-main w-100 position-relative flex-center mb-1'>
      <IoReturnUpBackOutline
        onClick={() => navigate(-1)}
        className='fs-1 position-absolute' />
      <h1>{name}</h1>
    </header>
  )
}

export default Header
