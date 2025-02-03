import Form from "components/common/form/Form";
import { useContext } from "react";
import { AuthContext } from "utils/context";

const Login = () => {
  const { clientToken, setClientToken } = useContext(AuthContext);
  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      // 'validation': ['required', 'string'],
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      // 'validation': ['required', 'string'],
    },
  ];

  const updateState = (data) => {
    setClientToken(data.token);
  };

  return (
    <>
      <h1 className="title">Nice to see you</h1>
      <Form
        nativeFields={fields}
        actionPath="/login"
        updateState={updateState}
      />
    </>
  );
};

export default Login;
