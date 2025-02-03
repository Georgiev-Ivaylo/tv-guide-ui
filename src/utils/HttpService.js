import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, MessageContext } from "utils/context";

export function useHttpConfiguration() {
  let url = process.env.REACT_APP_PUBLIC_HOST;
  const navigate = useNavigate();
  const { isUser, userToken, clientToken, setUserToken, setClientToken } =
    useContext(AuthContext);
  const { errors, setErrors } = useContext(MessageContext);
  let headers = {
    "Content-Type": "application/json",
  };

  console.log(clientToken, isUser);
  if (isUser) {
    url += "/admin";
    headers.Authorization = `Bearer ${userToken}`;
  } else if (clientToken) {
    headers.Authorization = `Bearer ${clientToken}`;
  }

  const customAxios = axios.create({
    baseURL: url,
    timeout: 10000,
    headers: headers,
  });

  // Adding global error handling interceptor
  customAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // console.error(
        //   "Response error:",
        //   error.response.status,
        //   error.response.data
        // );
        if (error.response.status === 419) {
          if (isUser) {
            setUserToken(null);
            navigate("/admin/login");
          } else {
            setClientToken(null);
            navigate("/login");
          }
        }
        setErrors([error.response.data, ...errors]);
        // return error.response;
        return { data: { data: null, errors: error.response.data.data } };
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
        setErrors([{ message: "Something went wrong..." }, ...errors]);
      } else {
        // Something happened in setting up the request that triggered an error
        // console.error("Error:", error.message);
        setErrors([
          { message: "Something unexpected went wrong..." },
          ...errors,
        ]);
      }
      // return {};
      return { data: { data: null } };
      // return Promise.reject(error);
    }
  );

  return customAxios;
}

export function useHttpService(pathname) {
  const apiCaller = useHttpConfiguration();
  const { toasts, setToasts } = useContext(MessageContext);
  const navigate = useNavigate();

  const fetchData = async (isMetaRequired = false) => {
    if (isMetaRequired) {
      pathname += "&get_pages=true";
    }
    let response;

    response = await apiCaller.get(pathname);

    if (isMetaRequired) {
      return response.data;
    }
    return response.data.data;
  };

  const createRecord = async (data, cb = null) => {
    const response = await apiCaller.post(pathname, data);

    if (response.status === 200) {
      if (cb) {
        cb(response.data.data);
      }
      setToasts([response.data.message, ...toasts]);
      navigate(response.data.data.redirect);
    }

    return response.data;
  };

  const editRecord = async (data, extraPath = "") => {
    const response = await apiCaller.put(pathname + extraPath, data);

    if (response.status === 200) {
      setToasts([response.data.message, ...toasts]);
      navigate(response.data.data.redirect);
    }
    return response.data;
  };

  const deleteRecord = async () => {
    const response = await apiCaller.delete(pathname);

    if (response.status === 200) {
      setToasts([response.data.message, ...toasts]);
      navigate(response.data.data.redirect);
      navigate(-1);
    }
    return response.data;
  };

  return { fetchData, createRecord, editRecord, deleteRecord };
}
