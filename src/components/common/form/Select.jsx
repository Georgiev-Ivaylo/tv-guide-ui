const Select = ({ label, name, value, error_msg, options, handleChange }) => {
  const errorClass = error_msg ? "has-error" : "";

  let renderedOptions = [];
  for (var option in options) {
    renderedOptions.push(
      <option key={option} value={option}>
        {options[option]}
      </option>
    );
  }
  return (
    <div className="form-field-box">
      <label className="form-label">{label}</label>
      <select
        name={name}
        defaultValue={value}
        className={`form-select ${errorClass}`}
        onChange={handleChange}
      >
        {renderedOptions}
      </select>
      {error_msg && <p className="form-field-error-full">{error_msg}</p>}
    </div>
  );
};

export default Select;
