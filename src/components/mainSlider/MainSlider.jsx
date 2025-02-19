import { Box, Stack } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/4.jpg";
import img4 from "../../assets/6.jpg";
import img5 from "../../assets/7.jpg";
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
  const imgs = [img3, img4, img5];
  return (
    <Stack
      sx={{
        height: "400px",
        flexDirection: "row",
        marginBottom: "30px",
        alignItems: "center",
        overflow: "hidden",
      }}>
      <Box sx={{ width: "80%", height: "100%" }}>
        <Slider {...settings} style={{ width: "100%", height: "100%" }}>
          {imgs.map((img, index) => (
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
          display: "flex",
          flexDirection: "column",
        }}>
        <img
          style={{ width: "100%", height: "50%", objectFit: "cover" }}
          src={img1}
          alt="img1"
        />
        <img
          style={{ width: "100%", height: "50%", objectFit: "cover" }}
          src={img2}
          alt="img2"
        />
      </Box>
    </Stack>
  );
};

export default MainSlider;
