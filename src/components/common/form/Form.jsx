import Field from "components/common/form/Field";
import useFormActions from "components/common/form/useFormActions";
import Loading from "components/common/Loading";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const getFormRowSize = () => {
  if (window.innerWidth >= 768) {
    return 3;
  }

  // if (window.innerWidth >= 640) { // Single line will be handled by media query
  //   return 2;
  // }

  return 2;
};

const Form = ({
  oldData = null,
  nativeFields = [],
  actionPath,
  fieldsPath = "",
  updateState = null,
}) => {
  const { onSubmit, setFormData, formData, loading, fields, errors } =
    useFormActions(
      nativeFields,
      actionPath,
      oldData !== null,
      fieldsPath,
      updateState
    );

  useEffect(() => {
    setFormData(oldData);
  }, []);

  function updateFormData(name, value) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const rowSize = getFormRowSize();

  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="large-form">
        {rowSize >= 2 &&
          chunkFields(fields, rowSize).map((field) => {
            return constructFieldRow(field, formData, errors, updateFormData);
          })}
        {rowSize === 1 &&
          fields.map((field) => {
            return (
              <Field
                key={field.name}
                field={field}
                updateField={updateFormData}
                errorMsg={errors?.[field.name]}
                currentValue={formData?.[field.name]}
              />
            );
          })}
      </div>
      {errors && <p className="description-error">{errors.message}</p>}
      <div className="side-card-nav">
        <div className="form-btn-container">
          <Link to={"../"} className="side-card-btn">
            Back
          </Link>
        </div>
        <div className="form-btn-container">
          <button type="submit" className="form-btn">
            {loading ? "Loading" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

const chunkFields = (array, size) => {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunkFields(tail, size)];
};

const constructFieldRow = (fields, formData, errors, updateFormData) => {
  return (
    <div className="form-field-row" key={fields[0].name + "-break"}>
      {fields.map((field) => {
        return (
          <Field
            key={field.name}
            field={field}
            updateField={updateFormData}
            errorMsg={errors?.[field.name]}
            currentValue={formData?.[field.name]}
          />
        );
      })}
    </div>
  );
};

export default Form;
