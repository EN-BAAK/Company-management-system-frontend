import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { SettingsNavArray } from '../misc/config'
import { MdOutlineLogout } from "react-icons/md";
import Page from '../layouts/Page';
import { useMutation, useQueryClient } from 'react-query';
import { logout } from '../api-client';
import { useAppContext } from '../context/AppProvider';
import { useTranslation } from 'react-i18next';
import Logo from "../assets/images/logo.png"

const SettingsNav = (): React.JSX.Element => {
  const { t: translating } = useTranslation("global")
  const { showToast, setLayout } = useAppContext();
  const queryClient = useQueryClient()
  const navigateTo = useNavigate();
  const mutation = useMutation(logout, {
    onMutate: () => {
      setLayout(true)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      showToast({ message: translating("settings-nav.logout.success"), type: "SUCCESS" });
      navigateTo("/");
    },
    onError: () => {
      showToast({ message: translating("settings-nav.logout.error"), type: "ERROR" });
    },
    onSettled: () => {
      setLayout(false)
    }
  })

  return (
    <Page id='setting' >
      <img src={Logo} alt='logo-settings' className='img-fluid mt-5' />

      <nav className='d-flex flex-column px-2 gap-5 fs-4'>
        {SettingsNavArray.map(nav => (
          <NavLink className="text-black flex-center-y gap-2" key={`settings-nav-${nav.id}`} to={nav.path}>
            <nav.Icon />
            {nav.name}
          </NavLink>
        ))}

        <button
          onClick={() => mutation.mutate()}
          className='border-0 bg-transparent d-block d-flex align-items-center gap-2 p-0 '>
          <MdOutlineLogout />
          {translating("settings-nav.logout.name")}
        </button>
      </nav>
    </Page>
  )
}

export default SettingsNav
