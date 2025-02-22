import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import { store } from "./RTK/store.js";
import { Provider } from "react-redux";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import ProtectRoutes from "./components/ProtectRoutes/ProtectRoutes.jsx";
import Products from "./pages/Products/ProductsPage.jsx";
import ProductDetails from "./pages/Product Details/ProductDetails.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import AllOrders from "./pages/AllOrders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Categories from "./pages/Categories.jsx";
import CategoryDetails from "./pages/CategoryDetails.jsx";
import Brands from "./pages/Brands.jsx";
import BrandsDetails from "./pages/BrandsDetails.jsx";
import WishList from "./pages/WishList.jsx";
import NotFound from "./pages/NotFound.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                path="/"
                element={
                  <ProtectRoutes>
                    <Home />
                  </ProtectRoutes>
                }
              />
              <Route
                path="products"
                element={
                  <ProtectRoutes>
                    <Products />
                  </ProtectRoutes>
                }
              />
              <Route
                path="categories"
                element={
                  <ProtectRoutes>
                    <Categories />
                  </ProtectRoutes>
                }
              />
              <Route
                path="brands"
                element={
                  <ProtectRoutes>
                    <Brands />
                  </ProtectRoutes>
                }
              />
              <Route
                path="productsdetails/:id/:category"
                element={
                  <ProtectRoutes>
                    <ProductDetails />
                  </ProtectRoutes>
                }
              />
              <Route
                path="categoriesdetails/:id"
                element={
                  <ProtectRoutes>
                    <CategoryDetails />
                  </ProtectRoutes>
                }
              />
              <Route
                path="brandsdetails/:id"
                element={
                  <ProtectRoutes>
                    <BrandsDetails />
                  </ProtectRoutes>
                }
              />
              <Route
                path="cart"
                element={
                  <ProtectRoutes>
                    <Cart />
                  </ProtectRoutes>
                }
              />
              <Route
                path="wish"
                element={
                  <ProtectRoutes>
                    <WishList />
                  </ProtectRoutes>
                }
              />
              <Route
                path="checkout"
                element={
                  <ProtectRoutes>
                    <Checkout />
                  </ProtectRoutes>
                }
              />
              <Route
                path="allorders"
                element={
                  <ProtectRoutes>
                    <AllOrders />
                  </ProtectRoutes>
                }
              />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
