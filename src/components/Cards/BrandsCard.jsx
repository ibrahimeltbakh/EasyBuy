import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const BrandsCard = ({ brand }) => {
  return (
    <Link to={`/brandsdetails/${brand._id}`}>
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
            src={brand.image}
            alt={brand.name}
            style={{
              height: "200px",
              maxWidth: "100%",
            }}
          />
        </CardMedia>
        <CardContent>
          <Stack
            direction={"column"}
            aligncategorys={"center"}
            justifyContent={"center"}
            gap={"1px"}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="teal"
              textAlign={"center"}>
              {brand?.name}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BrandsCard;
