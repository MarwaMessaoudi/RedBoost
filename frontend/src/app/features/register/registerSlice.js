import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "registerSlice",
  initialState: {
    username: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    password: "",
    confirmation: "",
  },
  reducers: {
    handleRegister(state, { payload: { key, value } }) {
      state[key] = value;
    },
  },
});
export const { handleRegister } = registerSlice.actions;
export default registerSlice.reducer;
