import { Dispatch, SetStateAction } from "react";
import { Company, Worker } from "./types";

export const searchText = (search: string, text: string): boolean => {
  const re = new RegExp("\\w*" + search + "\\w*", "ig");
  return re.test(text);
};

export const handleWorkerDelete = (
  id: number,
  workers: Worker[],
  setWorkers: Dispatch<SetStateAction<Worker[]>>
) => {
  const newWorkers = workers.filter((worker) => worker.id !== id);
  setWorkers(newWorkers);
};

export const handleCompanyDelete = (
  id: number,
  company: Company[],
  setCompany: Dispatch<SetStateAction<Company[]>>
) => {
  const newWorkers = company.filter((com) => com.id !== id);
  setCompany(newWorkers);
};

export const handleWorkerCreate = (
  newWorker: Worker,
  setWorkers: Dispatch<SetStateAction<Worker[]>>
) => {
  setWorkers((prevWorkers) => [newWorker, ...prevWorkers]);
};

export const handleCompanyCreate = (
  newCompany: Company,
  setCompanies: Dispatch<SetStateAction<Company[]>>
) => {
  setCompanies((prevCompanies) => [newCompany, ...prevCompanies]);
};

export const handleWorkerEdit = (
  newWorker: Worker,
  setWorkers: Dispatch<SetStateAction<Worker[]>>
) => {
  setWorkers((prevWorkers) => {
    const index = prevWorkers.findIndex((worker) => worker.id === newWorker.id);
    const newWorkers = prevWorkers;
    newWorkers[index] = newWorker;
    return [...newWorkers];
  });
};

export const handleCompanyEdit = (
  newCompany: Company,
  setCompanies: Dispatch<SetStateAction<Company[]>>
) => {
  setCompanies((prevCompanies) => {
    const index = prevCompanies.findIndex(
      (company) => company.id === newCompany.id
    );
    const newCompanies = prevCompanies;
    newCompanies[index] = newCompany;
    return [...newCompanies];
  });
};
