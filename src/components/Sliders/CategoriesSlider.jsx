// import { useEffect } from "react";
// import {  useSelector,useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from "@mui/material";
import { RiseLoader } from "react-spinners";
import usecatergories from "./../../Hooks/usecatergories";
const CategoriesSlider = () => {
  // const catergories = useSelector((state) => state.categories);
  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, []);
  const { data, isLoading, isError, error } = usecatergories();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  if (isError) {
    return (
      <>
        <Stack
          sx={{
            marginTop: "150px",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            color: "error",
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
    <Box>
      <Slider {...settings}>
        {data?.data.map((catergory, index) => (
          <Stack key={index}>
            <img
              style={{ maxWidth: "100%", height: "200px" }}
              src={catergory.image}
              alt={`product image ${index + 1}`}
            />
            <Typography variant="subtitle2" component={"h6"}>
              {catergory.name}
            </Typography>
          </Stack>
        ))}
      </Slider>
    </Box>
  );
};

export default CategoriesSlider;
