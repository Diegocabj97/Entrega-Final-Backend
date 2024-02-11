import React from "react";
import "./App.css";
import { CartProvider } from "./context/cartContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage.jsx";
import IndexPage from "./pages/indexPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import LogoutPage from "./pages/logoutPage.jsx";
import CartPage from "./pages/cartPage.jsx";
import { ProdsProvider } from "./context/prodsContext.jsx";
import DetailPage from "./pages/detailPage.jsx";
import ProductsPage from "./pages/productsPage.jsx";
import UsersPage from "./pages/usersPage.jsx";
import { Navbar } from "react-bootstrap";
import { AuthProvider } from "./context/authContext.jsx";
export const URLBACK =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <ProdsProvider>
            <Router>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/allprods" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/detail/:pid" element={<DetailPage />} />
                <Route path="/users" element={<UsersPage />} />
              </Routes>
            </Router>
          </ProdsProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
