import { Dispatch, SetStateAction } from "react";
import { Filter as FilterType, Identifiable } from "./types";

export const formatText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const handleDelete = <T extends Identifiable>(
  id: number,
  items: T[],
  setItems: Dispatch<SetStateAction<T[]>>,
  currentPage: number = 1,
  setCurrentPage: Dispatch<SetStateAction<number>>
) => {
  const newItems = items.filter((item) => item.id !== id);
  setItems(newItems);
  if (newItems.length <= 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

export const handleDeleteShifts = <T extends Identifiable>(
  id: number,
  items: T[],
  setItems: Dispatch<SetStateAction<T[]>>,
  currentPage: number = 1,
  setFilter: Dispatch<SetStateAction<FilterType>>
) => {
  const newItems = items.filter((item) => item.id !== id);
  setItems(newItems);
  if (newItems.length <= 0 && currentPage > 1) {
    setFilter((prevFilter) => ({ ...prevFilter, page: prevFilter.page - 1 }));
  }
};

export const handleCreate = <T extends Identifiable>(
  newItem: T,
  setItems: Dispatch<SetStateAction<T[]>>
) => {
  setItems((prevItems) => [newItem, ...prevItems]);
};

export const handleEdit = <T extends Identifiable>(
  updatedItem: T,
  setItems: Dispatch<SetStateAction<T[]>>
) => {
  setItems((prevItems) => {
    const index = prevItems.findIndex((item) => item.id === updatedItem.id);
    if (index === -1) return prevItems;

    const newItems = [...prevItems];
    newItems[index] = updatedItem;
    return newItems;
  });
};

export const handleWhatsAppClick = (phone: string | number) => {
  let phoneStr = phone.toString();

  if (phoneStr.startsWith("0")) {
    phoneStr = phoneStr.slice(1);
  }

  const whatsappLink = `https://wa.me/972${phoneStr}`;

  const anchor = document.createElement("a");
  anchor.href = whatsappLink;
  anchor.target = "_self";

  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);
};

export const handlePhoneClick = (phone: string | number) => {
  let phoneStr = phone.toString();

  if (phoneStr.startsWith("0")) {
    phoneStr = phoneStr.slice(1);
  }

  const telLink = `tel:+972${phoneStr}`;

  const anchor = document.createElement("a");
  anchor.href = telLink;

  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);
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

export const debounce = (cb: (arg: string) => void, delay: number = 1000) => {
  let timeout: number;

  return (arg: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(arg);
    }, delay);
  };
};
