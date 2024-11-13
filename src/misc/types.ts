import { Dispatch, SetStateAction } from "react";

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type variant = "info" | "danger" | "warning" | "secondary";
export type inputField = "input" | "textarea" | "select" | "date" | "time";
export type inputType = "text" | "number" | "password";
export type role = "admin" | "worker";

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
  user: User;
};

export type FormikControl = {
  control: inputField;
  label?: string;
  name: string;
  type?: inputType;
  placeholder?: string;
  formGroupClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  Icon?: React.ReactNode;
  options?: { id: number | string; value: string; key: number | string }[];
};

export type LoginForm = {
  phone: string;
  password: string;
};

export type editPasswordAdmin = {
  password: string;
  newPassword: string;
};

export type editPhoneAdmin = {
  password: string;
  newPhone: string;
};

export type Worker = {
  id: number;
  fullName: string;
  phone: string;
  personal_id: string;
  password?: string;
  notes?: string;
};

export type Company = {
  id: number;
  name: string;
  phone: string;
  notes?: string;
};

export type User = {
  id: number;
  fullName: string;
  role: role;
};

export type Record = {
  id: number;
  name: string;
  phone: string;
};

export type Shift = {
  id: number;
  startHour: string | null;
  endHour: string | null;
  date: string;
  location: string;
  workType?: string;
  worker?: {
    phone: string;
    id: number;
    fullName: string;
  };
  company: {
    id: number;
    name: string;
  };
  notes?: string;
};

export type ShiftControl = {
  id: number;
  startHour: string | null;
  endHour: string | null;
  date: string;
  location: string;
  workType?: string;
  workerId: number;
  companyId: number;
  notes?: string;
};

export type CompanyIdentity = {
  id: number;
  name: string;
};

export type WorkerIdentity = {
  id: number;
  fullName: string;
};

export type Filter = {
  workerName: string;
  companyName: string;
  date1: string;
  date2: string;
  limit: number;
};

export interface Identifiable {
  id: number;
}
