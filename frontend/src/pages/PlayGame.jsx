import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import PlayerImageAndName from "../components/PlayerImageAndName";
import { useNavigate } from "react-router-dom";
import { winner, loser } from "../features/results/resultsSlice";

function PlayGame() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { points, teamOne, teamTwo } = useSelector(
    (state) => state.game.playerData
  );

  const [teamOnePoints, setTeamOnePoints] = useState(0);
  const [teamTwoPoints, setTeamTwoPoints] = useState(0);
  const [gamePoints, setGamePoints] = useState(Number(points));

  useEffect(() => {
    if (points === 0) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (gamePoints > teamOnePoints && gamePoints > teamTwoPoints) {
      setTimeout(() => {
        const num = Math.floor(Math.random() * 10);
        if (num % 2 === 0) {
          setTeamOnePoints(teamOnePoints + 1);
        } else {
          setTeamTwoPoints(teamTwoPoints + 1);
        }
      }, 1500);
    } else {
      if (teamOnePoints === gamePoints) {
        dispatch(winner(teamOne));
        dispatch(loser(teamTwo));
      } else {
         dispatch(winner(teamTwo));
         dispatch(loser(teamOne));
      }
    }
  }, [dispatch, gamePoints, teamOne, teamOnePoints, teamTwo, teamTwoPoints]);

  return (
    <div>
      <div style={{ margin: "20px 0" }}>
        <h1 style={{ textAlign: "center" }}>
          First team that gets {points} points wins
        </h1>
      </div>
      <div>
        {teamOnePoints === gamePoints && (
          <div>
            <h2 style={{ marginLeft: "25%" }}>Winner</h2>
          </div>
        )}
        {teamTwoPoints === gamePoints && (
          <div>
            <h2 style={{ marginLeft: "75%" }}>Winner</h2>
          </div>
        )}

        <div className="d-flex" style={{ height: "350px" }}>
          <div className="p-2 flex-grow-1" style={{ display: "flex" }}>
            {teamOne.map((player) => (
              <PlayerImageAndName key={player._id} player={player} />
            ))}
          </div>

          <div className="p-2">
            <h1>Vs.</h1>
          </div>
          <div className="p-2 flex-grow-1" style={{ display: "flex" }}>
            {teamTwo.map((player) => (
              <PlayerImageAndName key={player._id} player={player} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <h4 style={{ marginLeft: "25%" }}>{teamOnePoints}</h4>
          <h4 style={{ marginLeft: "50%" }}>{teamTwoPoints}</h4>
        </div>
      </div>
    </div>
  );
}
export default PlayGame;
