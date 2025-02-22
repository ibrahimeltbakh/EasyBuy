import { Container } from "@mui/material";
import CategoriesSlider from "../../components/Sliders/CategoriesSlider";
import RecentProducts from "../../components/recent Products/RecentProducts";
import MainSlider from "../../components/Sliders/MainSlider";
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | EasyBuy</title>
        <meta
          name="description"
          content="Welcome to EasyBuy, your go-to online shop for everything you need."
        />
      </Helmet>

      <Container
        sx={{
          mt: "100px",
        }}>
        <MainSlider />
        <CategoriesSlider />
        <RecentProducts />
      </Container>
    </>
  );
};

export default Home;
