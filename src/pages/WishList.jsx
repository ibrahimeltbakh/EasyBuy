import useGetData from "../Hooks/wishList/useGetData";
import { Stack } from "@mui/material";
import { RiseLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { Container } from "@mui/material";
import ProductCard from "./../components/Cards/ProductCard";

const WishList = () => {
  const { data, isError, error, isLoading } = useGetData();
  if (isError) {
    return (
      <>
        <Stack
          sx={{
            marginTop: "150px",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            color: "Teal",
          }}>
          <h3>{error}</h3>
        </Stack>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <Stack
          sx={{
            marginTop: "150px",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}>
          <RiseLoader color="teal" />
        </Stack>
      </>
    );
  }
  if (data?.count === 0) {
    return (
      <>
        <Stack
          sx={{
            marginTop: "150px",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            color: "Teal",
          }}>
          <h2>Your wishlist is empty</h2>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title> WishList Products| EasyBuy</title>
        <meta
          name="description"
          content="Browse a wide range of WishList at EasyBuy. Shop your favorites now!"
        />
      </Helmet>
      <Container sx={{ mt: "100px" }}>
        <Stack
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}>
          {data?.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default WishList;
