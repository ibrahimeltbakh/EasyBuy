import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchProducts } from "../../RTK/Slices/productsSlice";
import ProductCard from "../../components/Cards/ProductCard";
import { Helmet } from "react-helmet";
import ButtonsAction from "../../components/Buttons Actions/ButtonsAction";
const ProductDetails = () => {
  const { id, category } = useParams();
  const dispatch = useDispatch();
  let [product, setProduct] = useState({});
  const allProducts = useSelector((state) => state.products);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchProducts());
        let resposnse = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`
        );
        setProduct(resposnse.data.data);
      } catch (e) {
        console.log("Error", e);
      }
    };
    fetchData();
  }, [id, category]);

  if (!product) {
    return <h1> Loading...</h1>;
  }
  const sameCategories = allProducts.filter(
    (product) => product.category.name === category
  );
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  return (
    <>
      <Helmet>
        <title>Product Details | EasyBuy</title>
        <meta
          name="description"
          content="Browse a wide range of products at EasyBuy. Shop your favorites now!"
        />
      </Helmet>
      <Container sx={{ mt: "100px" }}>
        <Card
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Box sx={{ width: "30%", maxHeight: "100%" }}>
            <CardMedia>
              {product?.images?.length > 0 ? (
                <Slider {...settings}>
                  {product.images.map((img, index) => (
                    <img
                      style={{ maxWidth: "100%" }}
                      key={index}
                      src={img}
                      alt={`product image ${index + 1}`}
                    />
                  ))}
                </Slider>
              ) : (
                <p>Loading images...</p>
              )}
            </CardMedia>
          </Box>
          <Box sx={{ width: "60%" }}>
            <CardContent
              sx={{
                display: "flex",
                gap: "15px",
                flexDirection: "column",
                flexWrap: "wrap",
              }}>
              <Typography gutterBottom variant="h4" component="h4">
                {product.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.description}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product?.category?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: "10px",
                }}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="p"
                  color="error">
                  {product.price}EGP
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Rating
                    size="medium"
                    precision={0.5}
                    name="read-only"
                    value={Number(product?.ratingsAverage) || 0}
                    readOnly
                  />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    ({product.ratingsQuantity} Person)
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <ButtonsAction product={product} />
          </Box>
        </Card>
        <Stack sx={{ flexDirection: "column", mt: "30px" }}>
          <Box sx={{ width: "100%", textAlign: "center", color: "teal" }}>
            <h2> Products in the Same Category</h2>
          </Box>
          <Stack
            sx={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}>
            {sameCategories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default ProductDetails;
