import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.login);

  var isExpired = false;
  if (token) {
    const decodedToken = jwtDecode(token);
    var dateNow = new Date();
    if (decodedToken.exp * 1000 < dateNow.getTime()) {
      isExpired = true;
    }
  }

  const { errorInLogin } = useSelector((state) => state.login);
  let location = useLocation();
  if (!token || errorInLogin || isExpired === true) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
