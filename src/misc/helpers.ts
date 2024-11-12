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