const Input = ({
  type = "text",
  label,
  name,
  value,
  error_msg,
  handleChange,
}) => {
  const errorClass = error_msg ? "has-error" : "";
  return (
    <div className="form-field-box">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={value}
        className={`form-field ${errorClass}`}
        onChange={handleChange}
      />
      {error_msg && <p className="form-field-error-full">{error_msg}</p>}
    </div>
  );
};

export default Input;
