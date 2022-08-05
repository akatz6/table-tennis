import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resultsService from "./resultsService";

const initialState = {
  team: [],
};

export const winner = createAsyncThunk(
  "result/winner",
  async (team, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await resultsService.winner(team, token);
      } catch (error) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
  }
);

export const loser = createAsyncThunk(
  "result/loser",
  async (team, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await resultsService.loser(team, token);
      } catch (error) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
  }
);

export const resultsSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(winner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(winner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.player = action.payload;
      })
      .addCase(winner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.player = null;
        state.message = action.payload;
      })
      .addCase(loser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.players = action.payload;
      })
      .addCase(loser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.players = [];
      });
  },
});

export const { reset } = resultsSlice.actions;
export default resultsSlice.reducer;
