import { create } from "zustand";
import { Bounce } from "react-toastify"
const initialState = {
    showSignIn: false,
    url: import.meta.env.VITE_BACKEND_URL,
    toastStyle: {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    },
}
const AppState = (set) => ({
    ...initialState,
    setShowSignIn: (value) => {
        set(() => ({
            showSignIn: value
        }))
    }
})

export default create(AppState)