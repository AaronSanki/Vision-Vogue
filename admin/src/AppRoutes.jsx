import React from "react";
import { Routes, Route } from "react-router-dom"
import AppLayout from "./AppLayout"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Order from "./pages/Order/Order"
import Edit from "./pages/Edit/Edit"
import {Bounce} from "react-toastify"
export default function AppRoutes() {
  const url = import.meta.env.VITE_BACKEND_URL
  const toastStyle = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  }
  return (
    <Routes>
        <Route path="/" element={<AppLayout url={url} toastStyle = {toastStyle} />}>
          <Route path="add" element={<Add url={url} toastStyle = {toastStyle} />} />
          <Route path="edit/:id" element={<Edit url={url} toastStyle = {toastStyle} />} />
          <Route path="list" element={<List url={url} toastStyle = {toastStyle} />} />
          <Route path="order" element={<Order url={url} toastStyle = {toastStyle} />} />
        </Route>
    </Routes>
  )
}