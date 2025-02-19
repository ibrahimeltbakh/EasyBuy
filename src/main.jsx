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
import ProtextRoutes from "./components/protextRoutes/ProtextRoutes.jsx";
import Products from "./pages/Products/ProductsPage.jsx";
import ProductDetails from "./pages/Product Details/ProductDetails.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import AllOrders from "./pages/AllOrders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
                  <ProtextRoutes>
                    <Home />
                  </ProtextRoutes>
                }
              />
              <Route
                path="products"
                element={
                  <ProtextRoutes>
                    <Products />
                  </ProtextRoutes>
                }
              />
              <Route
                path="productsdetails/:id/:category"
                element={
                  <ProtextRoutes>
                    <ProductDetails />
                  </ProtextRoutes>
                }
              />
              <Route
                path="cart"
                element={
                  <ProtextRoutes>
                    <Cart />
                  </ProtextRoutes>
                }
              />
              <Route
                path="checkout"
                element={
                  <ProtextRoutes>
                    <Checkout />
                  </ProtextRoutes>
                }
              />
              <Route
                path="allorders"
                element={
                  <ProtextRoutes>
                    <AllOrders />
                  </ProtextRoutes>
                }
              />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
