import axios from "axios";

const API_URL = "/api/players";

const register = async (playerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(API_URL, playerData, config);
  return response.data;
};

const getPlayers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const PlayerService = {
  register,
  getPlayers,
};

export default PlayerService;
