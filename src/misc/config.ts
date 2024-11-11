import { LoginForm } from "./types";
import * as Yup from "yup";

export const initialLoginValues: LoginForm = {
  phone: "",
  password: "",
};

export const loginValidationSchema = (phone: string, password: string) =>
  Yup.object({
    phone: Yup.string().required(phone),
    password: Yup.string().required(password),
  });
