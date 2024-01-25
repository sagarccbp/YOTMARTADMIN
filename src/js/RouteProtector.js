import React from "react";
import {Redirect, Route} from "react-router-dom";

function ProtectedRoute({component: Component, ...restOfProps}) {
  const isAuthenticated = localStorage.getItem("isLoggedIn");

  const role = localStorage.getItem("role");
  console.log(role, isAuthenticated);
  return (
    <Route
      {...restOfProps}
      render={props =>
        isAuthenticated &&
        role &&
        (role.toUpperCase() === "Admin".toUpperCase() ||
          role.toUpperCase() === "NUTRITIONIST".toUpperCase() ||
          role.toUpperCase() === "SUPERADMIN".toUpperCase() ||
          role.toUpperCase() === "VENDOR".toUpperCase()) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
