import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[]
}

export const departamentosSlice = createSlice({
    name: 'departamentos',
    initialState,
    reducers: {
        guardarDepartamentos: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { guardarDepartamentos } = departamentosSlice.actions;
export default departamentosSlice.reducer;
