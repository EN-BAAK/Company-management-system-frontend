export const handleImageFormChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFunc: React.Dispatch<React.SetStateAction<File | null>>
) => {
  const file = e.target.files ? e.target.files[0] : null;
  setFunc(file);
};

export const searchText = (search: string, text: string): boolean => {
  const re = new RegExp("\\w*" + search + "\\w*", "ig");
  return re.test(text);
};

