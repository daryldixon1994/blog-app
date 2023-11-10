import React from "react";
import { Navigate } from "react-router";
function PublicRoute(props) {
  let token = localStorage.getItem("token");
  let isUser = localStorage.getItem("isUser");
  if (token && isUser) {
    return <Navigate to="/error" />;
  } else {
    return <> {props.children}</>;
  }
}

export default PublicRoute;
