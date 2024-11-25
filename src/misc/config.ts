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
  password: string
) =>
  Yup.object({
    phone: Yup.number().required(phoneRequired),
    password: Yup.string().required(password),
  });

export const SettingsNavArray = [
  {
    id: 1,
    path: "workers",
    name: "Workers",
    Icon: PiUsersThreeBold,
  },
  {
    id: 2,
    path: "companies",
    name: "Companies",
    Icon: FaRegBuilding,
  },
  {
    id: 3,
    path: "admin",
    name: "Admin Password Update",
    Icon: RiAdminLine,
  },
];

export const createWorkerValidationSchema = (
  fullNameRequired: string,
  phoneRequired: string,
  passwordRequired: string
) =>
  Yup.object({
    fullName: Yup.string().required(fullNameRequired),
    phone: Yup.number().required(phoneRequired),
    password: Yup.string().required(passwordRequired),
    personal_id: Yup.number(),
  });

export const editWorkerValidationSchema = () =>
  Yup.object({
    fullName: Yup.string(),
    phone: Yup.number(),
  });

export const createCompanyValidationSchema = (
  nameRequired: string,
  phoneRequired: string
) =>
  Yup.object({
    name: Yup.string().required(nameRequired),
    phone: Yup.number().required(phoneRequired),
  });

export const editCompanyValidationSchema = () =>
  Yup.object({
    name: Yup.string(),
    phone: Yup.number(),
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
    newPassword: Yup.number().required(newPasswordRequired),
  });
};

export const initialValueEditAdminPhone: editPhoneAdmin = {
  password: "",
  newPhone: "",
};

export const editAdminPhoneSchema = (
  passwordRequired: string,
  phoneRequired: string
) => {
  Yup.object({
    password: Yup.string().required(passwordRequired),
    newPhone: Yup.number().required(phoneRequired),
  });
};
