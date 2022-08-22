export const setPoints = (setTeamOnePoints, setTeamTwoPoints) => {
  setTimeout(() => {
    const num = Math.floor(Math.random() * 10);
    if (num % 2 === 0) {
      setTeamOnePoints((points) => points + 1);
    } else {
      setTeamTwoPoints((points) => points + 1);
    }
  }, 1000);
};