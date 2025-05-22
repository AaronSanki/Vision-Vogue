import { create } from "zustand";
const initialState = {
    cartItems: [],
    cartSubtotal: 0,
}

const cartState = (set) => ({
    ...initialState,
    addToCart: (frame, quantity = 1) => {
        set((state) => {
            let cartItems = [...state.cartItems]
            let cartItemIndex = cartItems.findIndex(item => item.frame._id === frame._id)
            if(cartItemIndex !== -1) {
                cartItems[cartItemIndex] = {
                    ...cartItems[cartItemIndex],
                    quantity: cartItems[cartItemIndex].quantity + quantity
                }
            }
            else
                cartItems.push({ frame, quantity: quantity })
            const cartSubtotal = state.cartSubtotal+frame.price*quantity
            return { ...state, cartItems, cartSubtotal}
        })
    },
    removeFromCart: (frame, quantity = 1) => {
        set((state) => {
            let cartItems = [...state.cartItems];
            const cartItemIndex = cartItems.findIndex(item => item.frame._id === frame._id);
            let cartSubtotal = state.cartSubtotal
            if (cartItemIndex !== -1) {
                const currentFrame = cartItems[cartItemIndex]
                if (currentFrame.quantity > 1) {
                    cartItems[cartItemIndex] = {
                        ...currentFrame,
                        quantity: currentFrame.quantity - quantity
                    }
                }
                else
                    cartItems.splice(cartItemIndex, quantity);
                cartSubtotal -= quantity * frame.price
            }
            return { ...state, cartItems, cartSubtotal }
        })
    },
    setCart: (cartItems, cartSubtotal) => {
        set(() => {
            return {cartItems, cartSubtotal}
        })
    }
})

export default create(cartState)