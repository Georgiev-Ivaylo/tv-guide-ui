import Input from "components/common/form/Input";
import Select from "components/common/form/Select";
import Textarea from "components/common/form/Textarea";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageContext } from "utils/context";
import { useHttpService } from "utils/HttpService";

const ProgramManage = () => {
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { fetchData } = useHttpService("/programs/form");
  const { createRecord, editRecord } = useHttpService("/programs");
  // const { error } = useContext(MessageContext);
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setFormFields(data));
  }, []);
  console.log(formFields);

  if (formFields.length === 0) {
    return <h2>Loading...</h2>;
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);

    let formErrors = null;
    if (location.state) {
      formErrors = await editRecord(formData, "/" + location.state.id);
    } else {
      formErrors = await createRecord(formData);
    }

    console.log(formErrors);
    if (formErrors) {
      setErrors(formErrors);
    }

    setLoading(false);
    console.log(formData);
    // authenticateUser(formData, setErrors, setLoading);
  }

  return (
    <div className="side-card-grid">
      {location.state && <h1 className="title">Program manage</h1>}
      {!location.state && <h1 className="title">New program</h1>}
      <form onSubmit={onSubmit}>
        <div className="large-form">
          {formFields.map((field) => {
            if (field.type === "textarea") {
              return (
                <Textarea
                  label={field.label}
                  name={field.name}
                  alterClass="md:col-span-2 lg:col-span-3"
                  value={location.state?.[field.name]}
                  error_msg={errors?.[field.name]}
                />
              );
            }

            if (field.type === "select") {
              return (
                <Select
                  label={field.label}
                  name={field.name}
                  value={location.state?.[field.name]}
                  error_msg={errors?.[field.name]}
                  options={field.options}
                />
              );
            }

            return (
              <Input
                type={field.type}
                label={field.label}
                name={field.name}
                value={location.state?.[field.name]}
                error_msg={errors?.[field.name]}
              />
            );
          })}
        </div>
        {errors && <p className="description-error">{errors.message}</p>}
        <div className="side-card-nav">
          <span></span>
          <button type="submit" className="form-btn">
            {loading ? "Loading" : location.state ? "Edit" : "Add"}
          </button>
          <Link to={"../"} className="side-card-btn">
            Back
          </Link>
          <span></span>
        </div>
      </form>
    </div>
  );
};

export default ProgramManage;
