import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  token: "",
  user: {
    id: "",
    name: "",
    email: "",
    branch: "",
    year: "",
  },
};
if (typeof window !== "undefined") {
  if (localStorage.getItem("CampusAuth") !== null) {
        initialState = JSON.parse(localStorage.getItem("CampusAuth"));
  }
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
