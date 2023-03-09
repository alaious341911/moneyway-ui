import React from "react";
import router from "next/router";

export const handleLogout = () => { // Define a new function for handling logout
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    // setIsLoggedIn(false);
    router.push('/'); // Redirect user to the login page after logout

}