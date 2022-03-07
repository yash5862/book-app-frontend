import React, { lazy, useMemo } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Loader from "./core/components/Loader";
import { createTheme } from "../src/core/theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core";
import { useSelector } from "react-redux";
import AuthRoute from "./authRoute";

const Login = lazy(() => import("./screen/Auth/login"));
const PrivateRoute = lazy(() => import("./screen/privateRoute"));
const Notfound = lazy(() => import("./screen/NotFound"));
const Register = lazy(() => import("./screen/Auth/Register"));
const Dashboard = lazy(() => import("./screen/Dashbord"));
const AppRoutes = () => {
  const { auth }: any = useSelector((state) => state);
  const theme = useMemo(
    () => createTheme(auth?.mode as "dark" | "light"),
    [auth?.mode]
  );

  return (
    <React.Suspense fallback={<Loader />}>
      <MuiThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route path="404" element={<Notfound />} />
          <Route path="*" element={<Navigate to={`/404`} replace />} />
        </Routes>
      </MuiThemeProvider>
    </React.Suspense>
  );
};

export default AppRoutes;
