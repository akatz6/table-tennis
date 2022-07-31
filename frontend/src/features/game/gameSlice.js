import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  playerData: {
    playersCount: 2,
    points: 1,
    random: false,
    teamOne: [],
    teamTwo: [],
  },
};

export const registerGame = createAsyncThunk(
  "game/setup", (playerData) => {
    return playerData
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: (state) => {
      state.playerData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerGame.fulfilled, (state, action) => {
      state.playerData = action.payload
    });
  },
});

export const { resetGame } = gameSlice.actions;
export default gameSlice.reducer;
