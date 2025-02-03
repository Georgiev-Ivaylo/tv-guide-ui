import { useContext, useEffect } from "react";
import { MessageContext } from "utils/context";

const ToastCards = () => {
  const { toasts, setToasts } = useContext(MessageContext);
  useEffect(() => {
    const interval = setInterval(() => {
      removeToast(toasts.length - 1);
    }, 5 * 1000);
    if (toasts.length === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [toasts]);

  function removeToast(index) {
    toasts.splice(index, 1);
    setToasts([...toasts]);
  }
  return (
    <div className={`toast-card-grid toast-card-active`}>
      {toasts.map((message, index) => (
        <div className="card" key={index}>
          <h5 className="card-title">{message}</h5>
          <button className="card-btn" onClick={() => removeToast(index)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastCards;
