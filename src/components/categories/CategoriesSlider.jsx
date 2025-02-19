// import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import {  useSelector } from "react-redux";
import { fetchCategories } from "../../RTK/Slices/categoriesSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import RiseLoader from "./../../../node_modules/react-spinners/esm/RiseLoader";
const CategoriesSlider = () => {
  const dispatch = useDispatch();
  // const catergories = useSelector((state) => state.categories);
  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, []);
  const { data, isLoading } = useQuery({
    queryKey: ["catergories"],
    queryFn: async () => {
      const res = await dispatch(fetchCategories());
      return res.payload;
    },
    staleTime: 10000,
  });
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
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
        {data.data.map((catergory, index) => (
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
