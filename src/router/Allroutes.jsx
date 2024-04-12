import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../components/main/Main";
import Products from "../pages/products/Products";
import SoloProduct from "../pages/products/SoloProduct";
import Cart from "../pages/cart/Cart";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";

export default function Allroutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<SoloProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<Logout />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}