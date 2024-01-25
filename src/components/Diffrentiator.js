import React from "react";

export const Diffrentiator = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn");

  const role = localStorage.getItem("role");

  console.log(role);
  if (role === "NUTRITIONIST") {
    return (window.location.href = "/nutritionist");
  } else if (role === "ADMIN") {
    return (window.location.href = "/admin");
  } else if (role === "SUPERADMIN") {
    return (window.location.href = "/admin");
  } else if (role === "VENDOR") {
    return (window.location.href = "/admin");
  } else {
    return (window.location.href = "/admin");
  }
};
