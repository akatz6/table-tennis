import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import playerService from "./playerService";

const initialState = {
  players: [],
  player: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "player/register",
  async (playerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await playerService.register(playerData, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get players
export const getPlayers = createAsyncThunk(
  "player/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await playerService.getPlayers(token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const playerSlice = createSlice({
  name: "player",
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.player = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.player = null;
        state.message = action.payload;
      })
      .addCase(getPlayers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlayers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.players = action.payload;
      })
      .addCase(getPlayers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.players = [];
        state.message = action.payload;
      });
  },
});

export const { reset } = playerSlice.actions;
export default playerSlice.reducer;
