const ErrorCards = ({ errors = [], setErrors }) => {
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
