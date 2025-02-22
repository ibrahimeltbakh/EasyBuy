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
    {
      icon: <LinkedInIcon />,
      color: "#0a66c2",
      link: "https://www.linkedin.com/in/ibrahim-eltbakh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      icon: <XIcon />,
      color: "#14171a",
      link: "https://x.com/ibrahim_eltbakh",
    },
    {
      icon: <InstagramIcon />,
      color: "#c13584",
      link: "https://t.co/BTI3Qwzzrt",
    },
    {
      icon: <FacebookIcon />,
      color: "#1877f2",
      link: "https://www.facebook.com/ibrahim.samir55",
    },
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
        borderTop: "2px solid teal",
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
          {social.map((page, index) => (
            <a
              key={index}
              href={page.link}
              target="_blank"
              style={{ color: `${page.color}` }}>
              {page.icon}
            </a>
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
