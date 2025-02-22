import { Link } from "react-router-dom";
import { Container, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import masterCard from "../../assets/download.png";
import amazonPay from "../../assets/amazon.png";
import payPal from "../../assets/paypal.png";
const Footer = () => {
  const social = [
    { icon: <FacebookIcon />, color: "#1877f2" },
    { icon: <XIcon />, color: "#14171a" },
    { icon: <InstagramIcon />, color: "#c13584" },
    { icon: <LinkedInIcon />, color: "#0a66c2" },
  ];
  const parteners = [masterCard, amazonPay, payPal];
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        alignItems: "center",
        background: "#fff",
        padding: "30px  ",
        marginTop: "40px",
      }}>
      <Stack
        sx={{
          height: "80px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px 0",
        }}>
        <Typography variant="body1">Payment Partners</Typography>
        <Stack flexDirection={"row"} gap={2}>
          {parteners.map((part, index) => {
            return (
              <img
                style={{ width: "60px", height: "60px" }}
                key={index}
                src={part}
                alt="part"
              />
            );
          })}
        </Stack>
      </Stack>
      <Stack
        sx={{
          height: "80px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px 0",
        }}>
        <Typography variant="body1">Follow Us</Typography>
        <Stack flexDirection={"row"} gap={2}>
          {social.map((page) => (
            <Link key={page} to="#" style={{ color: `${page.color}` }}>
              {page.icon}
            </Link>
          ))}
        </Stack>
      </Stack>
      <Stack
        sx={{
          height: "80px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px 0",
        }}>
        <Typography variant="body2">© 2025 All Rights Reserved.</Typography>
        <Typography variant="body2">
          Developed by:
          <a
            href="https://wa.me/+201024556364"
            target="_blank"
            style={{ color: "teal" }}>
            ibrahim eltbakh
          </a>
        </Typography>
      </Stack>
    </Container>
  );
};

export default Footer;
