import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  personas: [],
};

export const PersonaSlice = createSlice({
  name: "persona",
  initialState,
  reducers: {
    guardarPersonas: (state, action) => {
      state.personas = action.payload;
    },
    agregarPersona: (state, action) => {
      state.personas.push(action.payload);
    },
    eliminarPersona: (state, action) => {
      const idPersona = action.payload;
      state.personas = state.personas.filter(
        (persona) => persona.id !== idPersona
      );
    },
  },
});

export const { guardarPersonas, agregarPersona, eliminarPersona } = PersonaSlice.actions;
export default PersonaSlice.reducer;
