const Checkbox = ({ label, name, value, error_msg, handleChange }) => {
  const errorClass = error_msg ? "has-error" : "";
  return (
    <div className="form-field-box">
      <label className={`form-label ${errorClass}`}>
        <input
          type="checkbox"
          name={name}
          checked={value}
          className={`form-checkbox`}
          onChange={handleChange}
        />
        <span className="pl-2">{label}</span>
      </label>
      {error_msg && <p className="form-field-error-full">{error_msg}</p>}
    </div>
  );
};

export default Checkbox;
