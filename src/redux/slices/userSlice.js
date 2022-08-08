import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL =
  "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6";

const initialState = {
  users: [],
  status: null,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (url = URL) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = "pending";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.users = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {},
  },
});

export default usersSlice.reducer;
