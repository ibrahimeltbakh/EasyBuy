import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";
import { RiseLoader } from "react-spinners";
import useProducts from "../Hooks/useProducts";
import ProductCard from "../components/Cards/ProductCard";
const BrandsDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useProducts();
  const productsWithSameBrand = data?.data.filter(
    (product) => product.brand._id == id
  );

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
  if (productsWithSameBrand.length === 0) {
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
          <h3>
            Oops! There are no products available in this Brand at the moment.
            Please check back later!
          </h3>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title> Brand Products| EasyBuy</title>
        <meta
          name="description"
          content="Browse a wide range of Categories at EasyBuy. Shop your favorites now!"
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
          {productsWithSameBrand.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default BrandsDetails;
