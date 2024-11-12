import {
  Company,
  editPasswordAdmin,
  editPhoneAdmin,
  LoginForm,
  Worker,
} from "./misc/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const validateToken = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error("Error check verification");

  return responseBody;
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

export const fetchWorkers = async (page: number = 1) => {
  const response = await fetch(
    `${API_BASE_URL}/api/user?page=${page}&offset=10`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const fetchCompanies = async (page: number = 1) => {
  const response = await fetch(
    `${API_BASE_URL}/api/company?page=${page}&offset=20`,
    {
      method: "GET",
      credentials: "include",
    }
  );

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

export const deleteWorker = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/user/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteCompany = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/company/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const createWorker = async (formData: Worker) => {
  const response = await fetch(`${API_BASE_URL}/api/user`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editWorker = async (data: { formData: FormData; id: number }) => {
  const response = await fetch(`${API_BASE_URL}/api/user/${data.id}`, {
    method: "PUT",
    credentials: "include",
    body: data.formData,
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const createCompany = async (formData: Company) => {
  const response = await fetch(`${API_BASE_URL}/api/company`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editCompany = async (data: { formData: FormData; id: number }) => {
  const response = await fetch(`${API_BASE_URL}/api/company/${data.id}`, {
    method: "PUT",
    credentials: "include",
    body: data.formData,
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editFullName = async (data: { newFullName: string }) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/edit/fullName`, {
    method: "put",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editPassword = async (data: editPasswordAdmin) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/edit/password`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editPhone = async (data: editPhoneAdmin) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/edit/phone`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

// export const editFullName = async (data: { fullName: string }) => {
//   const response = await fetch(`${API_BASE_URL}/api/admin/edit/fullName`, {
//     method: "PATCH",
//     credentials: "include",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   const responseBody = await response.json();

//   if (!response.ok) throw new Error(responseBody.message);

//   return responseBody;
// };
