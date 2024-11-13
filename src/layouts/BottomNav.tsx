import React from 'react'
import { NavLink } from 'react-router-dom'
import { GoGear } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
// import { FaPen } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const BottomNav = (): React.ReactNode => {
  const { t: translating } = useTranslation("global")

  const isNavActive = ({ isActive }: { isActive: boolean }) => {
    return {
      fontWeight: isActive ? "600" : "normal",
      color: isActive ? "var(--c-main)" : "var(--c-black-main)"
    }
  }

  return (
    <div id='navbar' className='bg-body-secondary rounded-top-4 position-relative'>
      <nav className='h-100 w-100 flex-center-y justify-content-evenly'>
        <NavLink
          to="/"
          className="flex-center flex-column transition-3"
          style={isNavActive}>
          <IoNewspaperOutline />
          <span>{translating("bottom-nav.shifts")}</span>
        </NavLink>

        {/* <NavLink
          to="/add-shift"
          className="flex-center flex-column transition-3 bg-main rounded-circle pen text-white mb-2">
          <FaPen />
        </NavLink> */}

        <NavLink
          to="/settings"
          className="flex-center flex-column transition-3 "
          style={isNavActive}>
          <GoGear />
          <span>{translating("bottom-nav.settings")}</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default BottomNav
