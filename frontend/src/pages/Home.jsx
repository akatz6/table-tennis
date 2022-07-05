import { getPlayers } from "../features/player/playerSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlayerRankings from "./PlayerRankings";
import Table from "react-bootstrap/Table";

function Home() {
  // const obj = {
  //     name :"aaron"
  // }
  //  {
  //    /* <Link to="/add-player" state={obj}>
  //     Player
  //   </Link> */
  //  }
  const dispatch = useDispatch();
  // let test = 0;

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);
  const sitf =
    "https://aaron-table-tennis.s3.us-west-2.amazonaws.com/1657040333058Screen+Shot+2022-07-01+at+1.30.09+PM.png";
  const { players } = useSelector((state) => state.player);
  console.log(players);

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
              <th>lastPlayed</th>
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
