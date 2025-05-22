import { create } from "zustand"

const initialState = {
    user: null,
}
const userState = (set) => ({
    ...initialState,
    setUser: (user) => {
        set((state) => {
            return {...state, user: user}
        })
    }
})

export default create(userState)