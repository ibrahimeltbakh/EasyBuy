import { Stack } from "@mui/material";
import useCategories from "../Hooks/usecatergories";
import Container from "@mui/material/Container";
import { RiseLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import CategoriesCard from "../components/Cards/CategoriesCard";
const Categories = () => {
  const { data, isLoading, isError, error } = useCategories();
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
        <title>Categories | EasyBuy</title>
        <meta
          name="description"
          content="Browse a wide range of Categories at EasyBuy. Shop your favorites now!"
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
          {data?.data.map((category) => (
            <CategoriesCard key={category._id} category={category} />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default Categories;
