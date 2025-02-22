import { Box, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

import ButtonsAction from "../Buttons Actions/ButtonsAction";
export default function ProductCard({ product }) {
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
        <ButtonsAction product={product} />
      </Card>
    </Link>
  );
}
