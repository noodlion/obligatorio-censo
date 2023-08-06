import { configureStore } from "@reduxjs/toolkit";
import departamentosReducer from "../Slices/DepartamentosSlice";
import ciudadesReducer from "../Slices/CiudadesSlice";
import personaReducer from "../Slices/PersonaSlice";

export const Store = configureStore({
  reducer: {
    personas: personaReducer,
    departamentos: departamentosReducer,
    ciudades: ciudadesReducer,
  },
});
