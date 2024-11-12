import { Dispatch, SetStateAction } from "react";

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type variant = "info" | "danger" | "warning" | "secondary";
export type inputField = "input";
export type inputType = "text" | "number" | "password";

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
  setLayout: Dispatch<SetStateAction<boolean>>;
};

export type FormikControl = {
  control: inputField;
  label: string;
  name: string;
  type: inputType;
  placeholder?: string;
  formGroupClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  Icon?: React.ReactNode;
};

export type LoginForm = {
  phone: "";
  password: "";
};

export type Worker = {
  id: number;
  fullName: string;
  phone: string;
  personal_id: string;
};

export type Company = {
  id: number;
  name: string;
  phone: string;
};

export type Record = {
  id: number;
  name: string;
  phone: string;
};
