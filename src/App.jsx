import NavBar from "./components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          minHeight: "100vh",
        }}>
        <Toaster />

        <Outlet />
        <Offline>
          <Box sx={{ margin: "30px auto", width: "50%" }}>
            <Alert variant="outlined" severity="error">
              Please Connect To Network
            </Alert>
          </Box>
        </Offline>
      </Box>
      <Footer />
    </>
  );
}

export default App;
