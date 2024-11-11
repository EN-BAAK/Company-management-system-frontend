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
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const iconStyle = type === "SUCCESS" ? "bg-success" : "bg-danger";
  const lineStyle = type === 'SUCCESS' ? "text-success border-success" : "text-danger border-danger";
  const innerStyle = type === 'SUCCESS' ? "bg-success" : "bg-danger";
  const paragraphStyle = type === "SUCCESS" ? "text-success" : "text-danger"

  return (
    <div className="my-toast">
      <div
        className={`${iconStyle} d-flex align-items-center justify-content-center fs-5 p-2 rounded-circle text-white`}>
        {type === "SUCCESS"
          ? <IoMdCheckmark />
          : <BsExclamationLg />}
      </div>
      <p className={`mb-0 ms-2 fw-medium ${paragraphStyle}`}>
        {message}
      </p>
      <div className={`${lineStyle} line border-2`}>
        <div className={`${innerStyle} inner-line`}></div>
      </div>
    </div>
  );
};