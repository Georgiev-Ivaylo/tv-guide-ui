import Checkbox from "components/common/form/Checkbox";
import Input from "components/common/form/Input";
import Password from "components/common/form/Password";
import Select from "components/common/form/Select";
import Textarea from "components/common/form/Textarea";

const Field = ({
  field,
  updateField,
  currentValue = null,
  errorMsg = null,
}) => {
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    updateField(field.name, value);
  };
  if (field.type === "textarea") {
    return (
      <Textarea
        label={field.label}
        name={field.name}
        value={currentValue}
        error_msg={errorMsg}
        handleChange={handleChange}
        alterClass="md:col-span-2 lg:col-span-3"
      />
    );
  }

  if (field.type === "select") {
    return (
      <Select
        label={field.label}
        name={field.name}
        value={currentValue}
        error_msg={errorMsg}
        handleChange={handleChange}
        options={field.options}
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <Checkbox
        label={field.label}
        name={field.name}
        value={currentValue}
        error_msg={errorMsg}
        handleChange={handleChange}
      />
    );
  }

  if (field.type === "password") {
    return (
      <Password
        label={field.label}
        name={field.name}
        value={currentValue}
        error_msg={errorMsg}
        handleChange={handleChange}
      />
    );
  }

  return (
    <Input
      type={field.type}
      label={field.label}
      name={field.name}
      value={currentValue}
      error_msg={errorMsg}
      handleChange={handleChange}
    />
  );
};

export default Field;
