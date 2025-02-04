import Loading from "components/common/Loading";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useHttpService } from "utils/HttpService";

const Verify = () => {
  const { createRecord } = useHttpService("/verify");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    createRecord({
      token: searchParams.get("token"),
      email: searchParams.get("email"),
    });
  }, []);

  return (
    <>
      <h1 className="title">Verify</h1>
      <Loading />
    </>
  );
};

export default Verify;
