import { Navigate } from "react-router-dom";

const ProtextRoutes = (props) => {
  if (localStorage.getItem("userToken") !== null) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtextRoutes;
