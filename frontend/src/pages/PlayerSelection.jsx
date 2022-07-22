import { useState, useEffect } from "react";
import { registerGame } from "../features/game/gameSlice";
import { useSelector, useDispatch } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";

function PlayerSelection() {
  const { playersCount, points, random, playersArr } = useSelector(
    (state) => state.game.playerData
  );
  const { players } = useSelector((state) => state.player);
  const [playersChosen, setPlayersChosen] = useState(0);
  console.log(players);

  const onClick = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    debugger
    if (playersChosen >= Number(playersCount)) {
      e.target.checked = !e.target.checked;
      toast.error(`Only allowed to add ${playersCount} players`);
    } else {
      setPlayersChosen(playersChosen + 1);
    }
  };
  return (
    <div>
      PlayerSelection
      {!random && <h3 className="mb-3">Select Players</h3>}
      {!random &&
        players.map((player) => (
          <>
            <InputGroup
              className="mb-2"
              value={player._id}
              onKeyUp={player._id}
              onClick={onClick}
            >
              <InputGroup.Checkbox value={player._id} />
              <InputGroup.Text id="basic-addon3">
                {player.firstName} {player.lastName}
              </InputGroup.Text>
            </InputGroup>
            {/* <input
              key={player.id}
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={player.id}
            />
            <ToggleButton
              type="radio"
              name="radio"
              //   value={radio.value}
              //   checked={radioValue === radio.value}
              //   onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {player.name}
            </ToggleButton> */}
          </>
        ))}
    </div>
  );
}
export default PlayerSelection;
