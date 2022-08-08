import { getPlayers, reset } from "../features/player/playerSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlayerRankings from "./PlayerRankings";
import Table from "react-bootstrap/Table";


function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlayers());
    dispatch(reset());
  }, [dispatch]);
  const { players } = useSelector((state) => state.player);
  const { user } = useSelector((state) => state.auth);
  if (!players.length) {
    return (
      <div>
        <h1>No Players have been added yet</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Table Tennis Rankings</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Picture</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Wins</th>
              <th>Loses</th>
              <th>Percentage</th>
              <th>Last Played</th>
              {user && <th>Options</th>}
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <PlayerRankings key={player._id} player={player} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Home;
