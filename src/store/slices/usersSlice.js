import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("users")) || [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addToUsers: (state, action) => {
      state.value = [...state.value, action.payload];
      localStorage.setItem("users", JSON.stringify(state.value));
    },
    editUser: (state, action) => {
      const editedUser = action.payload;
      state.value = state.value.map((user) =>
        user.id === editedUser.id ? editedUser : user
      );
      localStorage.setItem("users", JSON.stringify(state.value));
    },
    removeFromUsers: (state, action) => {
      if (window.confirm("Are you sure?")) {
        state.value = state.value.filter(
          (user) => user.id !== action.payload.id
        );
        localStorage.setItem("users", JSON.stringify(state.value));
      }
    },
    followUsers: (state, action) => {
      state.value = [...state.value, action.payload];
      localStorage.setItem("users", JSON.stringify(state.value));
    },
  },
});

export const { follow, addToUsers, editUser, removeFromUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
