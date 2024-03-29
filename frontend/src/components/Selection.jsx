import { useState, useEffect } from "react";
import { registerGame } from "../features/game/gameSlice";
import { useSelector, useDispatch } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";
import PlayerImageAndName from "../components/PlayerImageAndName";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import {
  setRandomTeams,
  checkTeamsLength,
  removeFromTeam,
  setTeam,
} from "../commonJSFiles/playerSelectionCode";

const vsStyle = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
function Selection() {
  const { playersCount, points, random, teamOne, teamTwo } = useSelector(
    (state) => state.game.playerData
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { players } = useSelector((state) => state.player);
  const [firstTeam, setFirstTeam] = useState([]);
  const [secondTeam, setSecondTeam] = useState([]);

  useEffect(() => {
    if (random) {
      setRandomTeams(
        players,
        playersCount,
        secondTeam,
        setFirstTeam,
        setSecondTeam
      );
    }
  }, []);

  useEffect(() => {}, [secondTeam, firstTeam]);

  const playersSelected = (e) => {
    const gameSet = {
      playersCount,
      points,
      teamOne: firstTeam,
      teamTwo: secondTeam,
    };
    dispatch(registerGame(gameSet));
    navigate("/play-game");
  };

  const onClick = (e) => {
    if (e.target.checked) {
      if (
        checkTeamsLength(secondTeam, playersCount) &&
        checkTeamsLength(firstTeam, playersCount)
      ) {
        e.target.checked = !e.target.checked;
        toast.error(`Only allowed to add ${playersCount} players`);
      } else {
        if (firstTeam.length < Math.floor(Number(playersCount) / 2)) {
          setTeam(players, e.target.value, firstTeam, setFirstTeam);
        } else {
          setTeam(players, e.target.value, secondTeam, setSecondTeam);
        }
      }
    } else {
      removeFromTeam(firstTeam, e.target.value, setFirstTeam);
      removeFromTeam(secondTeam, e.target.value, setSecondTeam);
    }
  };
  return (
    <div>
      <div className="d-flex" style={{ height: "350px" }}>
        <div className="p-2 flex-grow-1" style={{ display: "flex" }}>
          {firstTeam.map((player) => (
            <PlayerImageAndName key={player._id} player={player} />
          ))}
        </div>
        {secondTeam.length > 0 && (
          <div className="p-2" style={vsStyle}>
            <h1>Vs.</h1>
          </div>
        )}

        <div className="p-2 flex-grow-1" style={{ display: "flex" }}>
          {secondTeam.map((player) => (
            <PlayerImageAndName key={player._id} player={player} />
          ))}
        </div>
      </div>
      <div>
        {secondTeam.length === Math.floor(Number(playersCount) / 2) && (
          <Button
            variant="success"
            style={{ display: "block", margin: "0 auto" }}
            onClick={playersSelected}
          >
            Go To Game
          </Button>
        )}
      </div>

      {!random && <h3 className="mb-3">Select Players</h3>}
      {!random &&
        players.map((player) => (
          <div key={player._id}>
            <InputGroup
              className="mb-2"
              value={player._id}
              key={player._id}
              onClick={onClick}
            >
              <InputGroup.Checkbox value={player._id} />
              <InputGroup.Text id="basic-addon3">
                {player.firstName} {player.lastName}
              </InputGroup.Text>
            </InputGroup>
          </div>
        ))}
    </div>
  );
}
export default Selection;
