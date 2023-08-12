/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import AuthLayoutRegister from "layouts/AuthRegister.js";
import { AuthContextProvider } from "context/AuthContext";
import { AuthContext } from "context/AuthContext";
import App from "App";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const { isLogin } = useContext(AuthContext);

// const RequireAuth = ({ children }) => {
//   return isLogin == null ? children : <Navigate to={"/auth/login"} />;
// };

root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
      {/* <AuthContextProvider>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        />
        <Route path="/auth/login" element={<AuthLayout />} />
        <Route path="/auth/register" element={<AuthLayoutRegister />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </AuthContextProvider> */}
    </BrowserRouter>
  </AuthContextProvider>
);
