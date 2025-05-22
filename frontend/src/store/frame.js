import { create } from 'zustand';
const initialState = {
    frames: null,
    selectedShape: "All",
    selectedType: "All",
}

const frameState = (set) => ({
    ...initialState,
    setFrames: (frames) => {
        set((state) => {
            return {...state, frames}
        })
    },
    setShape: (shape) => {
        set((state) => {
            if(state.selectedShape === shape)
                shape = "All"
            return {...state, selectedShape: shape}
        })
    },
    setType: (type) => {
        set((state) => {
            if(state.selectedType === type)
                type = "All"
            return {...state, selectedType: type}
        })
    },
})

export default create(frameState)