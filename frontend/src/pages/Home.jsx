import { getPlayers, reset } from "../features/player/playerSlice";
import { useState, useEffect } from "react";
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

  if (!players.length) {
    return (
      <div>
        <h1>No Players have been added yet</h1>
      </div>
    );
  } else {
    return (
      <div>
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
              <th>Options</th>
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
