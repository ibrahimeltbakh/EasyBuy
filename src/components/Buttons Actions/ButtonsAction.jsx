import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  addProductToCart,
  removeProduct,
} from "../../RTK/Slices/cartSlicewithAPI";
import { useState } from "react";
import usePostData from "../../Hooks/wishList/usePostData";
import useGetData from "./../../Hooks/wishList/useGetData";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import useDeleteData from "../../Hooks/wishList/useDeleteData";
import useCart from "../../Hooks/useCart";

const ButtonsAction = ({ product }) => {
  const { data: productsInCart } = useCart();
  let cartProducts = productsInCart?.data?.products;
  const dispatch = useDispatch();
  const [btnAddLoading, setBtnAddLoading] = useState(false);
  const [btnDeleteLoading, setBtnDeleteLoading] = useState(false);
  const { data: wishListData } = useGetData();
  const {
    mutate: addMutation,
    isPending: addPending,
    isSuccess: addSuccess,
  } = usePostData();
  const {
    mutate: deleteMutation,
    isPending: deletePending,
    isSuccess: deleteSuccess,
  } = useDeleteData();

  const handelAddToCart = async (event, productId) => {
    setBtnAddLoading(true);
    event.preventDefault();
    event.stopPropagation();

    const addToCartResponse = await dispatch(addProductToCart(productId));
    if (addToCartResponse) {
      setBtnAddLoading(false);
      toast.success("Product Added To Cart Successfuly", {
        duration: 4000,
        position: "top-center",
      });
    }
  };
  const handelRemoveFromCart = async (event, productId) => {
    setBtnDeleteLoading(true);
    event.preventDefault();
    event.stopPropagation();
    const addToCartResponse = await dispatch(removeProduct(productId));
    console.log(addToCartResponse);
    if (addToCartResponse) {
      setBtnDeleteLoading(false);
      toast.success("Product Removed From Cart Successfuly", {
        duration: 4000,
        position: "top-center",
      });
    }
  };

  const handelAddToWishList = (event, productId) => {
    event.preventDefault();
    event.stopPropagation();
    addMutation(productId);
    if (addSuccess) {
      toast.success("Product Added to Wish list Successfuly", {
        duration: 4000,
        position: "top-center",
      });
    }
  };
  const handelRemoveFromWishList = (event, productId) => {
    event.preventDefault();
    event.stopPropagation();
    deleteMutation(productId);
    if (deleteSuccess) {
      toast.success("Product Removed from Wish list Successfuly", {
        duration: 4000,
        position: "top-center",
      });
    }
  };
  return (
    <CardActions
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        mb: "10px",
        mt: -3,
      }}>
      {cartProducts?.some((pro) => pro.product.id === product.id) ? (
        <Button
          onClick={(event) => handelRemoveFromCart(event, product.id)}
          sx={{
            color: "teal",
            textTransform: "capitalize",
            borderColor: "#D32F2F",
            width: "100%",
            "&:hover": { backgroundColor: "#D32F2F", color: "#fff" },
          }}
          loading={btnDeleteLoading}
          size="large"
          variant="outlined">
          <RemoveShoppingCartIcon fontSize="small" sx={{ mr: 1 }} />
        </Button>
      ) : (
        <Button
          onClick={(event) => handelAddToCart(event, product.id)}
          sx={{
            color: "teal",
            textTransform: "capitalize",
            borderColor: "teal",
            width: "100%",
            "&:hover": { backgroundColor: "teal", color: "#fff" },
          }}
          loading={btnAddLoading}
          size="large"
          variant="outlined">
          <AddShoppingCartOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
        </Button>
      )}
      {wishListData?.data.some((pro) => pro.id === product.id) ? (
        <Button
          onClick={(event) => handelRemoveFromWishList(event, product.id)}
          sx={{
            color: "teal",
            textTransform: "capitalize",
            borderColor: "#D32F2F",
            width: "100%",
            "&:hover": { backgroundColor: "#D32F2F", color: "#fff" },
          }}
          loading={deletePending}
          size="large"
          variant="outlined">
          <BookmarkRemoveIcon fontSize="small" sx={{ mr: 1 }} />
        </Button>
      ) : (
        <Button
          onClick={(event) => handelAddToWishList(event, product.id)}
          sx={{
            color: "teal",
            textTransform: "capitalize",
            borderColor: "teal",
            width: "100%",
            "&:hover": { backgroundColor: "teal", color: "#fff" },
          }}
          loading={addPending}
          size="large"
          variant="outlined">
          <BookmarkAddIcon fontSize="small" sx={{ mr: 1 }} />
        </Button>
      )}
    </CardActions>
  );
};

export default ButtonsAction;
