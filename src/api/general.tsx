import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const defaultHeaders = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

export const defaultAxios: any = axios.create({});

export function apiClient({
  url,
  data = {},
  method = "POST",
  headers = {},
  noHeaders,
  ...rest
}: any) {
  return new Promise((resolve, reject) => {
    defaultAxios({
      method,
      url,
      headers: {
        ...(noHeaders ? {} : defaultHeaders),
        ...headers,
      },
      data,
      ...rest,
    })
      .then((res: any) => {
        resolve(res.data);
      
        toast.success(res?.data?.message)
      })
      .catch((err: any) => {
        if (err.response && err.response.data.message) {
          reject(err.response.data.error);
          if (err.response.data.statusCode === 401) {
            localStorage.removeItem("token");
            toast.error("Please Reload the Page and Login Again");
          } else {
            toast.error(err.response.data.message);
          }
        } else {
          reject(err);
        }
      });
  });
}
