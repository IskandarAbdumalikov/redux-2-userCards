import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("users")) || [],
  followed: JSON.parse(localStorage.getItem("followedUsers")) || [],
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
    followUser: (state, action) => {
      const user = action.payload;
      if (!state.followed.find((u) => u.id === user.id)) {
        state.followed = [...state.followed, user];
        localStorage.setItem("followedUsers", JSON.stringify(state.followed));
      }
    },
    unfollowUser: (state, action) => {
      const user = action.payload;
      state.followed = state.followed.filter((u) => u.id !== user.id);
      localStorage.setItem("followedUsers", JSON.stringify(state.followed));
    },
  },
});

export const {
  addToUsers,
  editUser,
  removeFromUsers,
  followUser,
  unfollowUser,
} = usersSlice.actions;

export default usersSlice.reducer;
