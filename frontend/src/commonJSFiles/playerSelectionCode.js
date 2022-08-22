export const setRandomTeams = (
  players,
  playersCount,
  secondTeam,
  setFirstTeam,
  setSecondTeam
) => {
  let tempArray = [...players];
  let tempFirstTeam = [];
  let tempSecondTeam = [];
  if (secondTeam.length < Math.floor(Number(playersCount) / 2)) {
    for (let i = 0; i < Math.floor(Number(playersCount)); i++) {
      const num = Math.floor(Math.random() * tempArray.length);
      if (i < Math.floor(Number(playersCount) / 2)) {
        tempFirstTeam.push(tempArray[num]);
      } else {
        tempSecondTeam.push(tempArray[num]);
      }
      tempArray.splice(num, 1);
    }
  }
  setFirstTeam(tempFirstTeam);
  setSecondTeam(tempSecondTeam);
};

export const checkTeamsLength = (team, playersCount) => {
  return (
    team.length ===
    Math.floor(
      Number(playersCount) / 2 ||
        team.length === Math.floor(Number(playersCount) / 2)
    )
  );
};

export const removeFromTeam = (team, value, setTeam) => {
  let tempTeam = team.filter((element) => element._id !== value);
  setTeam(tempTeam);
};

export const setTeam = (players, value, team, setTeam) => {
  const player = players.find((element) => element._id === value);
  const tempTeamArray = [...team];
  tempTeamArray.push(player);
  setTeam(tempTeamArray);
};
