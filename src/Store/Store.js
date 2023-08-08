import { configureStore } from "@reduxjs/toolkit";
import departamentosReducer from "../Slices/DepartamentosSlice";
import ciudadesReducer from "../Slices/CiudadesSlice";
import personaReducer from "../Slices/PersonaSlice";
import ocupacionesReducer from "../Slices/OcupacionesSlice";

export const Store = configureStore({
  reducer: {
    personas: personaReducer,
    departamentos: departamentosReducer,
    ciudades: ciudadesReducer,
    ocupaciones: ocupacionesReducer
  },
});
