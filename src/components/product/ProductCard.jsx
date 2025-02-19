import { Box, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { addProductToCart } from "../../RTK/Slices/cartSlicewithAPI";
import { useState } from "react";
export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = useState(false);
  async function handelAddProduct(event, productId) {
    setBtnLoading(true);
    event.preventDefault();
    event.stopPropagation();

    const response = await dispatch(addProductToCart(productId));
    if (response) {
      setBtnLoading(false);
      toast.success("Product Added Successfuly", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  }
  return (
    <Link to={`/productsdetails/${product.id}/${product.category.name}`}>
      <Card
        sx={{
          maxWidth: 200,
          mt: 4,
          boxShadow: "gray 1px 1px 5px ,gray -1px -1px 5px",
          "&:hover ": {
            border: "1px solid teal",
            ".MuiCardMedia-root": {
              rotate: "1deg",
              scale: "1.1",
              transition: "0.5s",
            },
          },
        }}>
        <CardMedia
          sx={{
            padding: "10px",
          }}>
          <img
            src={product.imageCover}
            alt={product.title}
            style={{
              maxWidth: "100%",
            }}
          />
        </CardMedia>
        <CardContent>
          <Stack
            direction={"column"}
            alignproducts={"center"}
            justifyContent={"center"}
            gap={"1px"}>
            <Typography gutterBottom variant="h6" component="div" color="teal">
              {product?.category?.name}
            </Typography>
            <Typography variant="subtitle1" component="h6" mb={1}>
              {product.title.split(" ").slice(0, 2).join(" ")}
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
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                gutterBottom
                variant="subtitle2"
                component="p">
                <StarIcon color="warning" />
                {Number(product?.ratingsAverage) || 0}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            mb: "10px",
            mt: -3,
          }}>
          {}
          <Button
            onClick={(event) => handelAddProduct(event, product.id)}
            sx={{
              color: "teal",
              textTransform: "capitalize",
              borderColor: "teal",
              width: "100%",
              "&:hover": { backgroundColor: "teal", color: "#fff" },
            }}
            loading={btnLoading}
            size="large"
            variant="outlined">
            <AddShoppingCartOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}
