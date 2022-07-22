import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  playerData: {
    playersCount: 0,
    points: 0,
    random: false,
    playersArr: [],
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
    reset: (state) => {
      state.playerData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerGame.fulfilled, (state, action) => {
      state.playerData = action.payload
    });
  },
});

// export const { reset } = gameSlice.actions;
export default gameSlice.reducer;
