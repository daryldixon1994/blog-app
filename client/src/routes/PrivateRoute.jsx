import React from "react";
import { Navigate } from "react-router";
function PrivateRoute(props) {
  let token = localStorage.getItem("token");
  let isUser = localStorage.getItem("isUser");
  let isBanned = localStorage.getItem("isBanned");
  if (token && isUser==="true" && isBanned === "false") {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
