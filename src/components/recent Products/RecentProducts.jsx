// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import ProductCard from "./../product/ProductCard";
import RiseLoader from "./../../../node_modules/react-spinners/esm/RiseLoader";
import useProducts from "../../Hooks/useProducts";

const RecentProducts = () => {
  // const dispatch = useDispatch();
  // const recentProducts = useSelector((state) => state.recentProducts);
  // useEffect(() => {
  //   dispatch(fetchRecentProducts());
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
    </>
  );
};

export default RecentProducts;
