import { useDispatch } from "react-redux";
// import {  useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Container, Stack } from "@mui/material";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
// import { useEffect } from "react";
import {
  fetchCartData,
  removeProduct,
  updateProduct,
  clearCart,
} from "../../RTK/Slices/cartSlicewithAPI";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import ScaleLoader from "./../../../node_modules/react-spinners/esm/ScaleLoader";
import { useState } from "react";
import { Helmet } from "react-helmet";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "teal",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Cart = () => {
  const dispatch = useDispatch();
  const [loadingItem, setLoadingItem] = useState(null);
  // useEffect(() => {
  //   dispatch(fetchCartData());
  // }, []);
  // const cart = useSelector((state) => state.cart.products);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await dispatch(fetchCartData());
      return res.payload;
    },
  });
  const handelUpdateCart = async (productId, newCount) => {
    setLoadingItem(productId);
    await dispatch(updateProduct({ productId, productCount: newCount }));
    refetch();
    setLoadingItem(null);
  };
  // const totalPrice = cart.reduce((acc, product) => {
  //   acc += product.price * product.count;
  //   return Number(acc.toFixed(2));
  // }, 0);
  const navigate = useNavigate();
  const cart = data?.data.products;
  if (isLoading) {
    return (
      <>
        <Stack
          sx={{
            my: "100px",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}>
          <ScaleLoader color="teal" />
        </Stack>
      </>
    );
  }
  if (data.numOfCartItems === 0) {
    return (
      <>
        <Stack
          sx={{
            my: "100px",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            color: "teal",
          }}>
          <h2>No Products in Your Cart </h2>
        </Stack>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>Cart | EasyBuy</title>
        <meta
          name="description"
          content="Review and manage the items in your cart before checkout on EasyBuy."
        />
      </Helmet>

      <Container sx={{ my: "100px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">image</StyledTableCell>
                <StyledTableCell align="center">Count</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((product) => (
                <StyledTableRow key={product.product.id}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ color: "#2e7d32", fontWeight: "bold" }}>
                    {product.product.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.price}EGP
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      style={{
                        width: "80px",
                        height: "80px",
                      }}
                      src={product.product.imageCover}
                      alt={product.product.title}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.count}
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                          handelUpdateCart(
                            product.product.id,
                            product.count + 1
                          )
                        }>
                        {loadingItem === product.product.id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "+"
                        )}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          if (product.count > 1) {
                            handelUpdateCart(
                              product.product.id,
                              product.count - 1
                            );
                          }
                        }}>
                        {loadingItem === product.product.id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "-"
                        )}
                      </Button>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to remove this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, remove it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "Deleted!",
                              text: "Your product has been deleted.",
                              icon: "success",
                            });
                            dispatch(removeProduct(product.product.id));
                            refetch();
                          }
                        });
                      }}>
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack
          sx={{
            mt: "30px",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "30px",
            display: cart.length > 0 ? "flex" : "none",
          }}>
          <Box>
            Total price:{" "}
            <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
              {data?.data.totalCartPrice} EGP
            </span>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to Clear Cart!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Clear it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      title: "Cleared!",
                      text: "Your Cart has been Cleared.",
                      icon: "success",
                    });
                    dispatch(clearCart());
                    refetch();
                  }
                });
              }}>
              Clear Cart
            </Button>
          </Box>
        </Stack>
        <Box
          sx={{
            mt: "30px",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "30px",
            display: cart.length > 0 ? "flex" : "none",
          }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "teal" }}
            fullWidth
            onClick={() => navigate("/checkout")}>
            Checkout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Cart;
