import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "./../../RTK/Slices/checkoutSlice";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const Checkout = () => {
  const dispatch = useDispatch();
  const { orderData, loading } = useSelector((state) => state.checkout);
  const { id: reduxCartId } = useSelector((state) => state.cart);
  const [cartId, setCartId] = useState(reduxCartId || "");
  const url = "http://localhost:5173";
  const handelCheckout = (id, backUrl, values) => {
    if (!cartId) {
      console.error("Cart Id is midding");
      return;
    }
    dispatch(checkout({ cartId: id, url: backUrl, formValues: values }));
  };
  useEffect(() => {
    if (orderData?.status == "success" && orderData?.session?.url) {
      window.location.href = orderData.session.url;
    }
  }, [orderData]);
  useEffect(() => {
    if (reduxCartId) {
      setCartId(reduxCartId);
    }
  }, [reduxCartId]);
  const formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: (values) => {
      handelCheckout(cartId, url, values);
    },
  });

  return (
    <>
      <Helmet>
        <title>Checkout | EasyBuy</title>
        <meta
          name="description"
          content="Complete your purchase securely at EasyBuy and enjoy fast delivery!"
        />
      </Helmet>

      <Container sx={{ mt: "100px" }}>
        <Typography variant="h2" sx={{ color: "teal" }}>
          Checkout Now
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
            value={formik.values.details}
            name="details"
            label="Details"
            variant="standard"
            fullWidth
          />
          <TextField
            color="success"
            className="textField"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            name="city"
            label="City"
            variant="standard"
            fullWidth
          />
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
            Pay Now
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Checkout;
