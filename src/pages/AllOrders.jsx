import { Stack } from "@mui/material";
import { Helmet } from "react-helmet";
const AllOrders = () => {
  return (
    <>
      <Helmet>
        <title>All Orders | EasyBuy</title>
        <meta
          name="description"
          content="View all your past and current orders on EasyBuy. Track your purchases easily."
        />
      </Helmet>
      <Stack
        sx={{
          marginTop: "150px",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          color: "Teal",
        }}>
        <h2>Thank you for shopping with us! Your order has been received.</h2>
      </Stack>
    </>
  );
};

export default AllOrders;
