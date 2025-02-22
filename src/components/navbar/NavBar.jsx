import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { logout } from "../../RTK/Slices/userTokenSlice";
import { fetchCartData } from "./../../RTK/Slices/cartSlicewithAPI";
import { useEffect } from "react";
import useGetData from "./../../Hooks/wishList/useGetData";
import useCart from "./../../Hooks/useCart";

function NavBar() {
  const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTRhNzYxNTE4MTUxZDgwM2QyMTlhNyIsIm5hbWUiOiJJYnJhaGltIEVsdGJha2giLCJyb2xlIjoidXNlciIsImlhdCI6MTczOTgwODM5NiwiZXhwIjoxNzQ3NTg0Mzk2fQ.0HZZSgn7lLVnmOQMBnS_SR2VBLFfGPTnC8NC8-hOGrQ";
  // const cart = useSelector((state) => state.cart.products);
  const { data: productsInCart } = useCart();
  let cart = productsInCart?.data?.products;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartData());
  }, []);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector((state) => state.userToken);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const { data } = useGetData();
  const pages = [
    { title: "Home", path: "/" },
    { title: "Products", path: "Products" },
    { title: "Categories", path: "categories" },
    { title: "Brands", path: "brands" },
    {
      title: (
        <StyledBadge badgeContent={cart?.length} color="error">
          <ShoppingCartIcon />
        </StyledBadge>
      ),
      path: "/cart",
    },
    {
      title: (
        <StyledBadge badgeContent={data?.count} color="error">
          <BookmarkIcon />
        </StyledBadge>
      ),
      path: "/wish",
    },
  ];
  const settings = [
    { title: "Register", path: "/register" },
    { title: "Login", path: "/login" },
    { title: "Dashboard", path: "/" },
    { title: "Logout", path: "/login" },
  ];
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        color: "teal",
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "teal",
              textDecoration: "none",
            }}>
            <Link to={"/"} style={{ color: "teal" }}>
              EasyBuy
            </Link>
          </Typography>
          {user !== null && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}>
                {pages.map((page) => (
                  <Link key={page.path} to={"/"}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: "teal",
                          padding: "8px",
                          "&:hover": {
                            color: "white",
                            backgroundColor: "teal",
                          },
                        }}>
                        {page.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          )}

          <Typography
            variant="h5"
            noWrap
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "teal",
              textDecoration: "none",
            }}>
            <Link to={"/"} style={{ color: "teal" }}>
              EasyBuy
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user !== null &&
              pages.map((page) => (
                <Link
                  className="page"
                  key={page.path}
                  to={page.path}
                  onClick={handleCloseNavMenu}>
                  {page.title}
                </Link>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 2, color: "teal" }}>
                <AccountCircle sx={{ width: "40px", height: "40px" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {/* {user === null ? (
                <>
                  <Link
                    sx={{ textAlign: "center" }}
                    className="page"
                    onClick={handleCloseUserMenu}
                    to={"/register"}>
                    Register
                  </Link>
                  <Link
                    sx={{ textAlign: "center" }}
                    className="page"
                    onClick={handleCloseUserMenu}
                    to={"/login"}>
                    Login
                  </Link>
                </>
              ) : user === adminToken ? (
                <>
                  {" "}
                  <Link
                    sx={{ textAlign: "center" }}
                    className="page"
                    onClick={handleCloseUserMenu}
                    to={"/"}>
                    Dashboard
                  </Link>
                  <Link
                    sx={{ textAlign: "center" }}
                    className="page"
                    onClick={handleCloseUserMenu}
                    to={"/"}>
                    Logout
                  </Link>
                </>
              ) : (
                <Link
                  sx={{ textAlign: "center" }}
                  className="page"
                  onClick={handleCloseUserMenu}
                  to={"/"}>
                  Logout
                </Link>
              )} */}

              {settings.map((page) => {
                if (user === null) {
                  if (page.title === "Register" || page.title === "Login") {
                    return (
                      <Link
                        key={page.title}
                        onClick={handleCloseUserMenu}
                        to={page.path}
                        sx={{ textAlign: "center" }}
                        className="page">
                        {page.title}
                      </Link>
                    );
                  }
                } else if (user !== null) {
                  if (user === adminToken) {
                    if (page.title === "Dashboard" || page.title === "Logout") {
                      return (
                        <Link
                          key={page.title}
                          onClick={handleCloseUserMenu}
                          to={page.path}
                          sx={{ textAlign: "center" }}
                          className="page">
                          {page.title}
                        </Link>
                      );
                    }
                  } else {
                    if (page.title === "Logout") {
                      return (
                        <Link
                          key={page.title}
                          onClick={() => {
                            handleCloseUserMenu();
                            dispatch(logout());
                          }}
                          to={page.path}
                          sx={{ textAlign: "center" }}
                          className="page">
                          {page.title}
                        </Link>
                      );
                    }
                  }
                }
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
