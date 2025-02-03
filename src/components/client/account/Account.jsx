import Form from "components/common/form/Form";
import Loading from "components/common/Loading";
import { useEffect, useState } from "react";
import { useHttpService } from "utils/HttpService";

const Account = () => {
  const { fetchData } = useHttpService("/clients/session");
  const [client, setClient] = useState(null);

  useEffect(() => {
    fetchData().then((data) => {
      setClient(data);
    });
  }, []);
  if (!client) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="title">Account</h1>
      <Form
        oldData={client}
        fieldsPath="/forms/client/update"
        actionPath={"/clients/" + client.id}
      />
    </>
  );
};

export default Account;
