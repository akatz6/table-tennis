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

const PlayerService = {
  register,
};

export default PlayerService;
