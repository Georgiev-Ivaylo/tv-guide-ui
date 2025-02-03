import Form from "components/common/form/Form";

const Registration = () => {
  return (
    <>
      <h1 className="title">Registration</h1>
      <Form fieldsPath="/forms/client" actionPath="/clients" />
    </>
  );
};

export default Registration;
