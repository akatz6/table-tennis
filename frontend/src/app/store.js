import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import playerReducer from "../features/player/playerSlice";
import gameReducer from "../features/game/gameSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    game: gameReducer,
  },
});
