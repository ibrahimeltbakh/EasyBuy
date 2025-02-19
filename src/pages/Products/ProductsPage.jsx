// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../../RTK/Slices/productsSlice";
import Container from "@mui/material/Container";
import ProductCard from "../../components/product/ProductCard";
import { Stack } from "@mui/material";
import RiseLoader from "./../../../node_modules/react-spinners/esm/RiseLoader";
import useProducts from "../../Hooks/useProducts";
import { Helmet } from "react-helmet";
const ProductsPage = () => {
  // const products = useSelector((state) => state.products);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, []);
  const { data, isLoading, isError, error } = useProducts();
  if (isError) {
    return (
      <>
        <Stack
          sx={{
            marginTop: "150px",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
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
  return (
    <>
      <Helmet>
        <title>Products | EasyBuy</title>
        <meta
          name="description"
          content="Browse a wide range of products at EasyBuy. Shop your favorites now!"
        />
      </Helmet>

      <Container
        sx={{
          mt: "100px",
        }}>
        <Stack
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}>
          {data?.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default ProductsPage;
