import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    initial: false 
}

const Rreducer = createSlice({
    name: 'MainReducer',
    initialState,
    reducers: {
        HandleClick: (state) => {
            state.initial = !state.initial;
        }
    }
})

export const { HandleClick } = Rreducer.actions;
export const MainReducer =  Rreducer.reducer