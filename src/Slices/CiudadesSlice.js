import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ciudades: [],
};

export const ciudadesSlice = createSlice({
  name: "ciudades",
  initialState,
  reducers: {
    guardarCiudades: (state, action) => {
      state.ciudades = action.payload;
    },
  },
});

export const { guardarCiudades } = ciudadesSlice.actions;
export default ciudadesSlice.reducer;