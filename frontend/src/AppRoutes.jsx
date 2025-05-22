import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import Default from "./pages/Default/Default"
import AppLayout from "./AppLayout"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Frame from "./pages/Frame/Frame"
import MyOrders from "./pages/MyOrders/MyOrders"
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="order" element={<PlaceOrder />} />
        <Route path="frame/:id" element={<Frame />} />
        <Route path="myorders" element={<MyOrders/>} />
        <Route path="*" element={<Default />} />
      </Route>
    </Routes>
  )
}