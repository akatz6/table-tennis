import axios from "axios";

const API_URL = "/api/results";

const winner = async (team, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  const response = await axios.put(`${API_URL}/winner`, team, config);
  return response.data;
};

const loser = async (team, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  const response = await axios.put(`${API_URL}/loser`, team, config);
  return response.data;
};





const ResultService = {
  winner,
  loser,
};

export default ResultService;
