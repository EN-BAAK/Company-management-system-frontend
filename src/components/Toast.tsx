import { useEffect } from "react";
import { BsExclamationLg } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";

interface ToastProps {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "SUCCESS";

  return (
    <div className={`toast-container overflow-hidden rounded-3 shadow-lg position-fixed  ${isSuccess ? "border-success text-success" : "border-danger text-danger"}`}>
      <div className="d-flex align-items-center gap-2">
        <div className={`icon rounded-circle p-1 ${isSuccess ? "bg-success" : "bg-danger"} d-flex align-items-center justify-content-center text-white`}>
          {isSuccess ? <IoMdCheckmark size={"1.2rem"} /> : <BsExclamationLg size={"1.2rem"} />}
        </div>
        <p className="mb-0 flex-grow-1">{message}</p>
      </div>
      <div className="progress w-100 mt-2">
        <div className={`progress-bar ${isSuccess ? "bg-success" : "bg-danger"}`}></div>
      </div>
    </div>
  );
};
