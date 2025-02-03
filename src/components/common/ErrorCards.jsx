import { useEffect } from "react";

const ErrorCards = ({ errors = [], setErrors }) => {
  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      // if (errors.length >= 1) {
      removeToast(errors.length - 1);
      // }
    }, 5 * 1000);
    if (errors.length === 0) {
      clearInterval(interval);
    }

    //Clearing the interval
    return () => clearInterval(interval);
  }, [errors]);

  function removeToast(index) {
    errors.splice(index, 1);
    setErrors([...errors]);
  }
  return (
    <div className={`card-grid card-active`}>
      {errors.map((error, index) => (
        <div className="card" key={index}>
          <h5 className="card-title for-error">{error.message}</h5>
          <button className="card-btn" onClick={() => removeToast(index)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default ErrorCards;
