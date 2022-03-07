import { Navigate } from "react-router-dom";
import AdminLayout from "./adminLayout";
const PrivateRoute = ({ component }: any): any => {
  const token = localStorage.getItem("token") || "";
  return token ? <AdminLayout Children={component} /> : <Navigate to="/" />;
};

export default PrivateRoute;
