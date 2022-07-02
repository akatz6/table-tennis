import { Link } from "react-router-dom";

function Home() {

    const obj = {
        name :"aaron"
    }
  return (
    <div>
      <h1>Register a new user</h1>

      <Link to="/add-player" state={obj}>
        Player
      </Link>
    </div>
  );
}

export default Home;
