import { useEffect, useState } from 'react';
import './index.css';

let pendingToasts = [];
let attachToast = null;

const ToastProvider = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    attachToast = (toast) => {
      setToasts((prevToasts) => [...prevToasts, toast]);
      window.setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((item) => item.id !== toast.id));
      }, 3000);
    };

    if (pendingToasts.length > 0) {
      pendingToasts.forEach((toast) => attachToast(toast));
      pendingToasts = [];
    }

    return () => {
      attachToast = null;
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          <span>{toast.message}</span>
          <button type="button" onClick={() => removeToast(toast.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export const showToast = (message, type = 'info') => {
  const toast = { id: Date.now() + Math.random(), message, type };

  if (attachToast) {
    attachToast(toast);
  } else {
    pendingToasts = [...pendingToasts, toast];
  }
};

export default ToastProvider;
