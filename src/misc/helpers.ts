import { Dispatch, SetStateAction } from "react";
import { Company, Shift as ShiftType, Worker } from "./types";

export const searchText = (search: string, text: string): boolean => {
  const re = new RegExp("\\w*" + search + "\\w*", "ig");
  return re.test(text);
};

export const formatText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
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

export const handleShiftDelete = (
  id: number,
  shifts: ShiftType[],
  setShifts: Dispatch<SetStateAction<ShiftType[]>>
) => {
  const newShifts = shifts.filter((shift) => shift.id !== id);
  setShifts(newShifts);
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

export const handleShiftCreate = (
  newShift: ShiftType,
  setShifts: Dispatch<SetStateAction<ShiftType[]>>
) => {
  setShifts((prevShift) => [newShift, ...prevShift]);
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

export const handleShiftEdit = (
  newShift: ShiftType,
  setShifts: Dispatch<SetStateAction<ShiftType[]>>
) => {
  setShifts((prevShifts) => {
    const index = prevShifts.findIndex((shift) => shift.id === newShift.id);
    const newShifts = prevShifts;
    newShifts[index] = newShift;
    return [...newShifts];
  });
};

export const handleWhatsAppClick = (phone: string | number) => {
  window.open(`https://wa.me/+972${phone}`, "_blank");
};

export const handlePhoneClick = (phone: string | number) => {
  window.open(`tel:+972${phone}`);
};

export const calculateTimeDifference = (
  startHour: string,
  endHour: string
): string => {
  const [startH, startM] = startHour.slice(0, 5).split(":").map(Number);
  const [endH, endM] = endHour.slice(0, 5).split(":").map(Number);

  const startTotalMinutes = startH * 60 + startM;
  const endTotalMinutes = endH * 60 + endM;

  let diffMinutes = endTotalMinutes - startTotalMinutes;

  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }

  const diffH = Math.floor(diffMinutes / 60);
  const diffM = diffMinutes % 60;

  return `${String(diffH).padStart(2, "0")}:${String(diffM).padStart(2, "0")}`;
};
