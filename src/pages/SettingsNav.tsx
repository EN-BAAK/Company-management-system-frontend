import React from 'react'
import { NavLink } from 'react-router-dom'
import { SettingsNavArray } from '../misc/config'
import { MdOutlineLogout } from "react-icons/md";
import Page from '../layouts/Page';

const SettingsNav = (): React.JSX.Element => {
  return (
    <Page id='setting' className='pt-5'>
      <nav className='d-flex flex-column px-2 gap-5 fs-4'>
        {SettingsNavArray.map(nav => (
          <NavLink className="text-black" key={`settings-nav-${nav.id}`} to={nav.path}>
            <nav.Icon className='ms-2' />
            {nav.name}
          </NavLink>
        ))}

        <button className='border-0 bg-transparent d-block text-end p-0'>
          <MdOutlineLogout className='ms-2' />
          Logout
        </button>
      </nav>
    </Page>
  )
}

export default SettingsNav
