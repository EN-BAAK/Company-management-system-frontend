import { EditPassword, EditPhoneNumber, Login } from "./misc/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const validateAdmin = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error check verification");

  return response.json();
};

export const login = async (formData: Login) => {
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

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editPassword = async (data: EditPassword) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/edit/password`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editPhone = async (data: EditPhoneNumber) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/edit/phone`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getMedias = async () => {
  const response = await fetch(`${API_BASE_URL}/api/medias`, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const createMedia = async (data: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/medias`, {
    method: "POST",
    credentials: "include",
    body: data,
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editMedia = async (form: { data: FormData; id: number }) => {
  const response = await fetch(`${API_BASE_URL}/api/medias/${form.id}`, {
    method: "PUT",
    credentials: "include",
    body: form.data,
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteMedia = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/medias/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getCustomers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/customers`, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteCustomer = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/customers/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const createCustomer = async (data: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/customers`, {
    method: "POST",
    credentials: "include",
    body: data,
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getCustomerById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/customers/customer/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getCustomerByDomain = async (domain: string) => {
  const response = await fetch(`${API_BASE_URL}/api/customers/${domain}`, {
    method: "GET",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editCustomer = async (data: { id: number; form: FormData }) => {
  const response = await fetch(`${API_BASE_URL}/api/customers/${data.id}`, {
    method: "PUT",
    credentials: "include",
    body: data.form,
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getCompanyDetails = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/company`, {
    method: "GET",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};
