// import { EditPassword, EditPhoneNumber, Login } from "./misc/types";

import { LoginForm } from "./misc/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const validateToken = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error check verification");

  return response.json();
};

export const login = async (formData: LoginForm) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};
