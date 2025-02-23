import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setToken } from "../../RTK/Slices/userTokenSlice";
import { Helmet } from "react-helmet";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const submitForm = async (val) => {
    setLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", val)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("userToken", res.data.token);
        dispatch(setToken(res.data.token));
        navigate("/");
        window.location.reload();
      })
      .catch((res) => {
        setLoading(false);
        setError(res?.response?.data.message);
      });
  };
  // manual Validation
  // const validateForm = (val) => {
  //   const errors = {};
  //   if (val.name == "") {
  //     errors.name = "Name Is required";
  //   } else if (/^[a-zA-Z\s]{2,}$/.test(val.name)) {
  //     errors.name =
  //       "Name must only alphabetic characters, spaces, and a length of at least 2 characters";
  //   }
  //   if (val.email == "") {
  //     errors.email = "Email Is required";
  //   } else if (
  //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val.email)
  //   ) {
  //     errors.email = "ex:name@gmail.com";
  //   }
  //   return errors;
  // };

  // Yup validation
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "Too Short")
      .max(50, "Too Long"),
    email: Yup.string()
      .required("Email is Required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email example@example.com"
      ),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
        "Minimum of 8 characters, at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      ),
    rePassword: Yup.string()
      .required("Re-enter Password is Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone Number is Required")
      .matches(
        /^(?:\+20|0)(1[0-2]|10|11|12|15)[0-9]{8}$/,
        "Invalid Egyption Number"
      ),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Helmet>
        <title>Register | EasyBuy</title>
        <meta
          name="description"
          content="Create an account on EasyBuy to start shopping and enjoy exclusive deals."
        />
      </Helmet>
      <Container sx={{ mt: "100px" }}>
        <Typography variant="h2" sx={{ color: "teal" }}>
          Register Now
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}>
          <TextField
            color="success"
            className="textField"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
            label="Name"
            variant="standard"
            fullWidth
          />
          {formik.errors.name && formik.touched.name ? (
            <Alert variant="outlined" severity="error">
              {formik.errors.name}
            </Alert>
          ) : null}
          <TextField
            color="success"
            className="textField"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            label="Email"
            variant="standard"
            fullWidth
          />
          {formik.errors.email && formik.touched.email ? (
            <Alert variant="outlined" severity="error">
              {formik.errors.email}
            </Alert>
          ) : null}
          <FormControl
            fullWidth
            variant="standard"
            color="success"
            className="textField">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color={showPassword ? "success" : ""}
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {formik.errors.password && formik.touched.password ? (
            <Alert variant="outlined" severity="error">
              {formik.errors.password}
            </Alert>
          ) : null}
          <FormControl
            fullWidth
            variant="standard"
            color="success"
            className="textField">
            <InputLabel htmlFor="rePassword">rePassword</InputLabel>
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              name="rePassword"
              id="rePassword"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color={showPassword ? "success" : ""}
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <Alert variant="outlined" severity="error">
              {formik.errors.rePassword}
            </Alert>
          ) : null}
          <TextField
            color="success"
            className="textField"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            name="phone"
            label="Phone Number"
            variant="standard"
            fullWidth
          />
          {formik.errors.phone && formik.touched.phone ? (
            <Alert variant="outlined" severity="error">
              {formik.errors.phone}
            </Alert>
          ) : null}
          {error && (
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            style={{
              width: "150px",
              marginLeft: "auto",
              backgroundColor: "teal",
            }}
            loading={loading}
            loadingPosition="end">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Register;
