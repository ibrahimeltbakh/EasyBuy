import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setToken } from "../../RTK/Slices/userTokenSlice";
import { Helmet } from "react-helmet";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
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
  });
  const submitForm = async (val) => {
    setLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", val)
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
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });
  return (
    <>
      <Helmet>
        <title>Login | EasyBuy</title>
        <meta
          name="description"
          content="Log in to your EasyBuy account to access your orders and preferences."
        />
      </Helmet>

      <Container sx={{ mt: "100px" }}>
        <Typography variant="h2" sx={{ color: "teal" }}>
          Login
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

export default Login;
