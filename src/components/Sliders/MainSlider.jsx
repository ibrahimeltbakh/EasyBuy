import { Box, Stack } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/16.jpg";
import img2 from "../../assets/17.jpg";
import img3 from "../../assets/18.jpg";
import img4 from "../../assets/banner-15.jpg";
import img5 from "../../assets/banner-25.jpg";
const MainSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  const mainImages = [img4, img5];
  const sideImages = [img1, img2, img3];
  return (
    <Stack
      sx={{
        height: "500px",
        flexDirection: "row",
        marginBottom: "30px",
        alignItems: "center",
        overflow: "hidden",
      }}>
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          height: "100%",
        }}>
        <Slider {...settings} style={{ width: "100%", height: "100%" }}>
          {mainImages.map((img, index) => (
            <Box key={index} sx={{ width: "100%", height: "100%" }}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={img}
                alt={`product image ${index + 1}`}
              />
            </Box>
          ))}
        </Slider>
      </Box>
      <Box
        sx={{
          width: "20%",
          height: "100%",
          flexDirection: "column",
          display: { xs: "none", md: "flex" },
        }}>
        {sideImages.map((img, index) => {
          return (
            <img
              key={index}
              style={{ width: "100%", height: "35%", objectFit: "cover" }}
              src={img}
              alt="img"
            />
          );
        })}
      </Box>
    </Stack>
  );
};

export default MainSlider;
