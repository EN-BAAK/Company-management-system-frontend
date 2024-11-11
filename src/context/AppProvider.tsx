import React, { createContext, ReactNode, useContext, useState } from 'react'
import { AppContext as AppContextType, CustomerViewData, Media, ToastMessage, Warning as WarningType } from '../misc/types'
import { useQuery } from 'react-query'
import Loading from '../components/Loading'
import { getCustomers, getMedias, validateAdmin } from '../api-client'
import { Toast } from '../components/Toast'
import Warning from '../components/Warning'

interface Props {
  children: ReactNode
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: Props): React.JSX.Element => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined)
  const [warning, setWarning] = useState<WarningType | undefined>(undefined);
  const [medias, setMedias] = useState<Media[]>([])
  const [customers, setCustomers] = useState<CustomerViewData[]>([])

  const { isError, isLoading } = useQuery("validateToken", validateAdmin, {
    retry: false,
    refetchOnWindowFocus: false
  })

  const fetchSocialMediasData = async () => {
    try {
      const data = await getMedias()
      setMedias(data.medias)
    } catch {
      setMedias([])
    }
  }

  const fetchCustomersData = async () => {
    try {
      const data = await getCustomers()
      setCustomers(data.customers)
    } catch {
      setCustomers([])
    }
  }

  if (isLoading)
    return <Loading />

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        showToast: (toastMessage) => setToast(toastMessage),
        medias,
        fetchMedias: fetchSocialMediasData,
        showWarning: (warning) => setWarning(warning),
        customers,
        fetchCustomers: fetchCustomersData
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {warning && (
        <Warning
          message={warning.message}
          btn1={warning.btn1}
          btn2={warning.btn2}
          styleBtn1={warning.styleBtn1}
          styleBtn2={warning.styleBtn2}
          onClose={() => setWarning(undefined)}
          handleBtn2={warning.handleBtn2}
        />
      )}
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const CONTEXT = useContext(AppContext)
  return CONTEXT as AppContextType
}


export default AppProvider
