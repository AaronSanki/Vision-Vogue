import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
// import ScrollToTop from "./utils/scrollToTop";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'
export default function AppLayout() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Navbar />
      <div className="main-content">
        <Sidebar/>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </>
  )
}