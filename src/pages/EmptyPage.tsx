import React from 'react'
import NotFound from "../assets/images/notFound.svg"
import { useTranslation } from 'react-i18next'

const EmptyPage = (): React.JSX.Element => {
  const { t: translating } = useTranslation("global")

  return (
    <div id='empty' className='flex-center flex-column flex-1'>
      <img src={NotFound} alt="404-img" className='w-75' />
      <h1 className='fw-bold mt-3 fs-special'>{translating("global.not-found")}</h1>
    </div>
  )
}

export default EmptyPage
