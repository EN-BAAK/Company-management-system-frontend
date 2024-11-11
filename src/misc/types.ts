export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type variant = "info" | "danger" | "warning" | "secondary";

export type Warning = {
  message: string;
  btn1: string;
  btn2: string;
  variantBtn1?: variant;
  variantBtn2?: variant;
  handleBtn2: () => void;
};

export type AppContext = {
  isLoggedIn: boolean;
  showToast: (toastMessage: ToastMessage) => void;
  showWarning: (warning: Warning) => void;
};
