import { Stack } from "@mui/material";
import { Helmet } from "react-helmet";
import error404 from "../assets/error.svg";
const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>NotFound | EasyBuy</title>
      </Helmet>
      <Stack
        sx={{
          marginTop: "150px",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          color: "Teal",
        }}>
        <img src={error404} alt="notfound" />
      </Stack>
    </>
  );
};

export default NotFound;
