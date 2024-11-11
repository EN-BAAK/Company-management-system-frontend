// import { EditPassword, EditPhoneNumber, Login } from "./misc/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const validateAdmin = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error check verification");

  return response.json();
};
