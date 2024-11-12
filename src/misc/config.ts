import { LoginForm } from "./types";
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
