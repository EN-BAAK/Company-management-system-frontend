import { createContext, ReactNode, useState, useContext } from 'react';
import {
  AppContext as AppContextType,
  ToastMessage,
  User as UserType,
  Warning as WarningType,
} from '../misc/types';
import Loading from '../layouts/Loading';
import { validateToken } from '../api-client';
import { Toast } from '../components/Toast';
import Layout from "../layouts/Layout"
import Warning from '../components/Warning';
import { useQuery } from 'react-query';

interface Props {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: Props): React.JSX.Element => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [warning, setWarning] = useState<WarningType | undefined>(undefined);
  const [layout, setLayout] = useState<boolean>(false)
  const [user, setUser] = useState<UserType>({ id: -1, fullName: "", role: "worker" })

  const { isError, isLoading } = useQuery("validateToken", validateToken, {
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (fetchedData: { user: UserType }) => {
      const user = fetchedData.user
      setUser(user)
    }
  });


  const showToast = (toastMessage: ToastMessage) => {
    setToast(toastMessage);
  };

  const showWarning = (warning: WarningType) => {
    setWarning(warning);
  };

  if (isLoading) return <div className='h-100vh'><Loading /></div>;

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        showToast,
        showWarning,
        setLayout,
        user
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
          variantBtn1={warning.variantBtn1}
          variantBtn2={warning.variantBtn2}
          onClose={() => setWarning(undefined)}
          handleBtn2={warning.handleBtn2}
        />
      )}

      {layout && (
        <Layout />
      )}

      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppProvider;