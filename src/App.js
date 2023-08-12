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

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to={"/auth/login"} />;
  };

  console.log("IS LOGIN =", currentUser);
  return (
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
      {/* <Route path="*" element={<Navigate to="/admin/index" replace />} /> */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default App;

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <BrowserRouter>

//   </BrowserRouter>
// );
