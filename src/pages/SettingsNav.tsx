import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { SettingsNavArray } from '../misc/config'
import { MdOutlineLogout } from "react-icons/md";
import Page from '../layouts/Page';
import { useMutation, useQueryClient } from 'react-query';
import { logout } from '../api-client';
import { useAppContext } from '../context/AppProvider';
import { useTranslation } from 'react-i18next';

const SettingsNav = (): React.JSX.Element => {
  const { t: translating } = useTranslation("global")
  const { showToast } = useAppContext();
  const queryClient = useQueryClient()
  const navigateTo = useNavigate();
  const mutation = useMutation(logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      showToast({ message: translating("settings-nav.logout.success"), type: "SUCCESS" });
      navigateTo("/");
    },
    onError: () => {
      showToast({ message: translating("settings-nav.logout.error"), type: "ERROR" });
    },
  })

  return (
    <Page id='setting' >
      <nav className='d-flex flex-column px-2 gap-5 fs-4 mt-5'>
        {SettingsNavArray.map(nav => (
          <NavLink className="text-black" key={`settings-nav-${nav.id}`} to={nav.path}>
            <nav.Icon className='ms-2' />
            {nav.name}
          </NavLink>
        ))}

        <button
          onClick={() => mutation.mutate()}
          className='border-0 bg-transparent d-block text-end p-0'>
          <MdOutlineLogout className='ms-2' />
          {translating("settings-nav.logout.name")}
        </button>
      </nav>
    </Page>
  )
}

export default SettingsNav
