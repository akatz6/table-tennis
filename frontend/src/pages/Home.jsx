import { getPlayers } from "../features/player/playerSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  // const obj = {
  //     name :"aaron"
  // }
  const dispatch = useDispatch();
  // let test = 0;

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  const { players } = useSelector((state) => state.player);
  console.log(players);

  return (
    <div>
      <h1>Register a new user</h1>

      {/* <Link to="/add-player" state={obj}>
        Player
      </Link> */}
    </div>
  );
}

export default Home;
