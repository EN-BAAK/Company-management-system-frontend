import { Dispatch, SetStateAction } from "react";
import { Identifiable } from "./types";

export const searchText = (search: string, text: string): boolean => {
  const re = new RegExp("\\w*" + search + "\\w*", "ig");
  return re.test(text);
};

export const formatText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const handleDelete = <T extends Identifiable>(
  id: number,
  items: T[],
  setItems: Dispatch<SetStateAction<T[]>>
) => {
  const newItems = items.filter((item) => item.id !== id);
  setItems(newItems);
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
