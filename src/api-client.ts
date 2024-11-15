import {
  Company,
  editPasswordAdmin,
  editPhoneAdmin,
  Filter as FilterType,
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

export const fetchWorkers = async (page: number = 1, limit: number = 25) => {
  const response = await fetch(
    `${API_BASE_URL}/api/user?page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const fetchCompanies = async (page: number = 1, limit: number = 25) => {
  const response = await fetch(
    `${API_BASE_URL}/api/company?page=${page}&limit=${limit}`,
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

export const fetchShifts = async (filters: FilterType, page: number) => {
  const queryParams = new URLSearchParams();
  if (filters.workerName) queryParams.append("workerName", filters.workerName);
  if (filters.companyName)
    queryParams.append("companyName", filters.companyName);
  if (filters.date1) queryParams.append("date1", filters.date1);
  if (filters.date2) queryParams.append("date2", filters.date2);
  queryParams.append("page", page.toString());
  if (filters.searcher) queryParams.append("searcher", filters.searcher);
  if (filters.limit) queryParams.append("limit", filters.limit.toString());

  const url = `${API_BASE_URL}/api/shift?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteShift = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/shift/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const fetchCompaniesIdentity = async () => {
  const response = await fetch(`${API_BASE_URL}/api/company/identity`, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const fetchWorkersIdentity = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/identity`, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const createShift = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/shift`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editShift = async (data: { formData: FormData; id: number }) => {
  const response = await fetch(`${API_BASE_URL}/api/shift/${data.id}`, {
    method: "PUT",
    credentials: "include",
    body: data.formData,
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const downloadShiftsReport = async (workerName: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/report?workerName=${encodeURIComponent(workerName)}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to download the PDF report");
    }

    const blob = await response.blob();
    const pdfUrl = URL.createObjectURL(blob);

    window.open(pdfUrl, "_blank");

    setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
