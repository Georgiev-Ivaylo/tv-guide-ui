import { useEffect, useState } from "react";
import { useHttpService } from "utils/HttpService";

const useFormActions = (
  nativeFields,
  actionPath,
  isEdit = false,
  fieldsPath = "",
  updateState = null
) => {
  const { fetchData } = useHttpService(fieldsPath);
  const { createRecord, editRecord } = useHttpService(actionPath);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (nativeFields.length >= 1) {
      setFields(nativeFields);
      setLoading(false);
      return;
    }
    setLoading(true);

    fetchData().then((data) => {
      setFields(data);
      setLoading(false);
    });
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setErrors({});

    // formData = new FormData(event.currentTarget);

    let formResponse = null;
    console.log(formData);
    if (isEdit) {
      formResponse = await editRecord(formData);
    } else {
      formResponse = await createRecord(formData, updateState);
    }

    if (formResponse.errors) {
      setErrors(formResponse.errors);
    }

    setLoading(false);
  }

  return { onSubmit, setFormData, formData, loading, fields, errors };
};

export default useFormActions;
