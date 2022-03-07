import { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import BoxedLayout from "../../core/components/BoxedLayout";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/auth/authAction";
import { useNavigate } from "react-router-dom";
import Loader from "../../core/components/Loader";

const Login = () => {
  const { auth }: any = useSelector((state) => state);
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter Email")
        .required("Email address is required"),
      password: Yup.string().required("Please Enter your password"),
    }),
    onSubmit: (values: any) => dispatch(login(values)),
  });

  // useEffect(() => {
  //   if (auth?.token) {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/");
  //   }
  // }, [auth]);

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
      }}
    >
      <Loader isLoading={auth?.loading} />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(./img/startup.svg)",
          backgroundRepeat: "no-repeat",
          bgcolor: "background.default",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        square
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <BoxedLayout>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            marginTop={3}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              id="email"
              label={"Email"}
              inputProps={{
                autoComplete: "off",
              }}
              name="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="password"
              label={"Password"}
              type="password"
              id="password"
              inputProps={{
                autoComplete: "off",
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Submit
            </Button>

            <Button
              component={Link}
              to={"/register"}
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Don't have an account? Sign Up!
            </Button>
          </Box>
        </BoxedLayout>
      </Grid>
    </Grid>
  );
};

export default Login;
