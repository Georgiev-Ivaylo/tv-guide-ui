import { useState } from "react";

const Password = ({ label, name, value, error_msg, handleChange }) => {
  const errorClass = error_msg ? "has-error" : "";
  const [type, setType] = useState("password");
  const togglePassVisibility = () => {
    setType(type === "password" ? "text" : "password");
  };
  return (
    <div className="form-field-box">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={value}
        className={`form-field pass ${errorClass}`}
        onChange={handleChange}
      />
      <span
        className={`form-field-show-pass ${type === "text" ? "enabled" : ""}`}
        onClick={togglePassVisibility}
      >
        &nbsp;
      </span>
      {error_msg && <p className="form-field-error-full">{error_msg}</p>}
    </div>
  );
};

export default Password;
