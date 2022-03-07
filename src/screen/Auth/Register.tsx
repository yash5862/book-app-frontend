import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as Yup from "yup";
import BoxedLayout from "../../core/components/BoxedLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resgitser } from "../../store/auth/authAction";
import moment from "moment";
import Loader from "../../core/components/Loader";

const Register = () => {
  const navigate: any = useNavigate();
  const dispatch = useDispatch();
  const { auth }: any = useSelector((state) => state);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      dateOfBirth: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("common.validations.required"),
      firstName: Yup.string()
        .max(20, "common.validations.max")
        .required("common.validations.required"),
      lastName: Yup.string()
        .max(30, "common.validations.max")
        .required("common.validations.required"),
      mobileNumber: Yup.string()
        .max(10, "Mobile Number is Invalid")
        .min(10, "Mobile Number is Invalid")
        .required("User name is required"),
      password: Yup.string()
        .required("password is required !")
        .max(16, "Password is allow more then 16 Charactors")
        .min(8, "Password is allow more then 8 Charactors"),
      dateOfBirth: Yup.string().required("Date Is Required"),
    }),
    onSubmit: async (values: any) => {
      await dispatch(resgitser(values));
      navigate("/");
    },
  });

  return (
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
        margin: "auto",
      }}
    >
      <Loader isLoading={auth?.loading} />
      <BoxedLayout>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          marginTop={3}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label={"Last Name"}
            name="lastName"
            autoFocus
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label={"First Name"}
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={"E-mail Address"}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobileNumber"
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            inputProps={{
              maxLength: 10,
            }}
            label={"Mobile Number"}
            name="mobileNumber"
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
            }
            helperText={
              formik.touched.mobileNumber && formik.errors.mobileNumber
            }
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              value={
                formik.values.dateOfBirth
                  ? new Date(formik.values.dateOfBirth)
                  : new Date()
              }
              onChange={(date: Date | null) => {
                formik.setFieldValue(
                  "dateOfBirth",
                  moment(date, "DD-MM-YYYY").format("MM-DD-YYYY")
                );
              }}
              maxDate={new Date()}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  id="date"
                  fullWidth
                  margin="normal"
                  name="date"
                  label="Date Of Birth"
                />
              )}
            />
          </LocalizationProvider>

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label={"Password here"}
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>

          <Button
            component={Link}
            to={"/login"}
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Back to Login
          </Button>
        </Box>
      </BoxedLayout>
    </Grid>
  );
};

export default Register;
