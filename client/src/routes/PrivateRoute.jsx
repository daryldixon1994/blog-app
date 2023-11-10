import React from "react";
import { Navigate } from "react-router";
function PrivateRoute(props) {
  let token = localStorage.getItem("token");
  let isUser = localStorage.getItem("isUser");
  if (token && isUser) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
