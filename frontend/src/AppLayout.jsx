import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useApp, useUser, useCart } from './store/index.js';
import SignIn from './components/SignIn/SignIn';
import ScrollToTop from "./utils/scrollToTop";
import { ToastContainer, Bounce, toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner/Spinner.jsx"
export default function AppLayout() {
  const [loading, setLoading] = useState(true)
  const { url, showSignIn, toastStyle } = useApp()
  const {user, setUser} = useUser()
  const {cartItems, setCart} = useCart()
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${url}/api/user/login`, { withCredentials: true })
        if (res.data.success) {
          setUser(res.data.data)
          setCart(res.data.data.cartItems, res.data.data.cartSubtotal)
        }
      }
      catch (err) {
        setUser(null)
        toast.error("Couldn't fetch user details", toastStyle)
        console.log(err)
      }
      finally{
        setLoading(false)
      }
    }
    fetchUser()
  }, [])
  
  if(loading)
    return <Spinner/>
  return (
    <>
      {showSignIn && <SignIn />}
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
        <ScrollToTop/>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}