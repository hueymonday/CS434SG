import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XIcon, XCircleIcon } from 'lucide-react';
export type ToastType = 'success' | 'error' | null;
interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}
export const Toast = ({
  message,
  type,
  onClose
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`flex items-center p-4 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
        {type === 'success' ? <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" /> : <XCircleIcon className="w-5 h-5 mr-2 text-red-500" />}
        <span className="mr-4">{message}</span>
        <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600" aria-label="Close">
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </div>;
};
export const ToastContainer = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  // Export this function to be used globally
  window.showToast = (message: string, type: ToastType) => {
    setToast({
      message,
      type
    });
  };
  const handleClose = () => {
    setToast(null);
  };
  return toast ? <Toast message={toast.message} type={toast.type} onClose={handleClose} /> : null;
};
// Add to global window object
declare global {
  interface Window {
    showToast: (message: string, type: ToastType) => void;
  }
}