import { editPasswordAdmin, editPhoneAdmin, LoginForm } from "./types";
import * as Yup from "yup";
import { PiUsersThreeBold } from "react-icons/pi";
import { FaRegBuilding } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";

export const initialLoginValues: LoginForm = {
  phone: "",
  password: "",
};

export const loginValidationSchema = (
  phoneRequired: string,
  phonePattern: string,
  password: string
) =>
  Yup.object({
    phone: Yup.string()
      .matches(/^[0-9]+$/, phonePattern)
      .required(phoneRequired),
    password: Yup.string().required(password),
  });

export const SettingsNavArray = [
  {
    id: 1,
    path: "workers",
    name: "עובדים",
    Icon: PiUsersThreeBold,
  },
  {
    id: 2,
    path: "companies",
    name: "חברות",
    Icon: FaRegBuilding,
  },
  {
    id: 3,
    path: "admin",
    name: "עדכון סיסמת מנהל",
    Icon: RiAdminLine,
  },
];

export const createWorkerValidationSchema = (
  fullNameRequired: string,
  phoneRequired: string,
  phonePattern: string,
  passwordRequired: string,
  personalIDPattern: string
) =>
  Yup.object({
    fullName: Yup.string().required(fullNameRequired),
    phone: Yup.string()
      .matches(/^[0-9]+$/, phonePattern)
      .required(phoneRequired),
    password: Yup.string().required(passwordRequired),
    personal_id: Yup.string().matches(/^[0-9]+$/, personalIDPattern),
  });

export const editWorkerValidationSchema = (
  phonePattern: string,
  personalIDPattern: string
) =>
  Yup.object({
    phone: Yup.string().matches(/^[0-9]+$/, phonePattern),
    personal_id: Yup.string().matches(/^[0-9]+$/, personalIDPattern),
  });

export const createCompanyValidationSchema = (
  nameRequired: string,
  phoneRequired: string,
  phonePattern: string
) =>
  Yup.object({
    name: Yup.string().required(nameRequired),
    phone: Yup.string()
      .matches(/^[0-9]+$/, phonePattern)
      .required(phoneRequired),
  });

export const editCompanyValidationSchema = (phonePattern: string) =>
  Yup.object({
    phone: Yup.string().matches(/^[0-9]+$/, phonePattern),
  });

export const editAdminFullNameSchema = (fullNameRequired: string) => {
  Yup.object({
    newFullName: Yup.string().required(fullNameRequired),
  });
};

export const initialValueEditAdminPassword: editPasswordAdmin = {
  password: "",
  newPassword: "",
};

export const editAdminPasswordSchema = (
  passwordRequired: string,
  newPasswordRequired: string
) => {
  Yup.object({
    password: Yup.string().required(passwordRequired),
    newPassword: Yup.string().required(newPasswordRequired),
  });
};

export const initialValueEditAdminPhone: editPhoneAdmin = {
  password: "",
  newPhone: "",
};

export const editAdminPhoneSchema = (
  passwordRequired: string,
  phoneRequired: string,
  phonePattern: string
) => {
  Yup.object({
    password: Yup.string().required(passwordRequired),
    phone: Yup.string()
      .matches(/^[0-9]+$/, phonePattern)
      .required(phoneRequired),
  });
};
