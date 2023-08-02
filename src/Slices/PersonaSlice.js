import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personas: []
}

export const PersonaSlice = createSlice({
    name: "persona",
    initialState,
    reducers: {
        guardarPersonas: (state, action) => {
            state.personas = action.payload;
        },
        agregarPersona: (state, action) => {
            state.personas.push(action.payload);
        }
    }
})

export const {guardarPersonas, agregarPersona } = PersonaSlice.actions
export default PersonaSlice.reducer;