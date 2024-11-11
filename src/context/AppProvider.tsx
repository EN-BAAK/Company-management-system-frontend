import { createContext, ReactNode, Component, useContext } from 'react';
import { AppContext as AppContextType, ToastMessage, Warning as WarningType } from '../misc/types';
import Loading from '../components/Loading';
import { validateAdmin } from '../api-client';
import { Toast } from '../components/Toast';
import Warning from '../components/Warning';

interface Props {
  children: ReactNode;
}

interface State {
  toast?: ToastMessage;
  warning?: WarningType;
  isError: boolean;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

class AppProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      toast: undefined,
      warning: undefined,
      isError: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      await validateAdmin();
      this.setState({ isError: false });
    } catch {
      this.setState({ isError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  showToast = (toastMessage: ToastMessage) => {
    this.setState({ toast: toastMessage });
  };

  showWarning = (warning: WarningType) => {
    this.setState({ warning });
  };

  render() {
    const { toast, warning, isError, isLoading } = this.state;

    if (isLoading) return <Loading />;

    return (
      <AppContext.Provider
        value={{
          isLoggedIn: !isError,
          showToast: this.showToast,
          showWarning: this.showWarning,
        }}
      >
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => this.setState({ toast: undefined })}
          />
        )}
        {warning && (
          <Warning
            message={warning.message}
            btn1={warning.btn1}
            btn2={warning.btn2}
            variantBtn1={warning.variantBtn1}
            variantBtn2={warning.variantBtn2}
            onClose={() => this.setState({ warning: undefined })}
            handleBtn2={warning.handleBtn2}
          />
        )}
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const useAppContext = () => {
  const CONTEXT = useContext(AppContext)
  return CONTEXT as AppContextType
}

export default AppProvider;
