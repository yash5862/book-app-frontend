import { Navigate } from "react-router-dom";
import WithoutLayout from "./screen/privateRoute";
const AuthRoute = ({ component }: any): any => {
  const token = localStorage.getItem("token") || "";

  return !token ? (
    <WithoutLayout Children={component} />
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default AuthRoute;
