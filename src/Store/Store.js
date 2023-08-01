import { configureStore } from "@reduxjs/toolkit";
import departamentosReducer from "../Slices/DepartamentosSlice";
import personaReducer from "../Slices/PersonaSlice"

export const Store = configureStore({
    reducer: {
        departamentos: departamentosReducer,
        personas: personaReducer
    }
})