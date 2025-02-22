import { Stack } from "@mui/material";
import Container from "@mui/material/Container";
import { RiseLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import useBrands from "../Hooks/useBrands";
import BrandsCard from "../components/Cards/BrandsCard";
const Brands = () => {
  const { data, isLoading, isError, error } = useBrands();
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
  return (
    <>
      <Helmet>
        <title>Brands | EasyBuy</title>
        <meta
          name="description"
          content="Browse a wide range of Brands at EasyBuy. Shop your favorites now!"
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
          {data?.data.map((brand) => (
            <BrandsCard key={brand._id} brand={brand} />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default Brands;
