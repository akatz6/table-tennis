import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { registerGame} from "../features/game/gameSlice";
import { getPlayers } from "../features/player/playerSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Gi3DHammer } from "react-icons/gi";
import Modal from "react-bootstrap/Modal";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [gameSelection, setGameSelection] = useState({
    playersCount: 0,
    points: 1,
    random: false,
    teamOne: [],
    teamTwo: [],
  });

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch, setGameSelection]);

  const { user } = useSelector((state) => state.auth);
  const { players } = useSelector((state) => state.player);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setGameSelection((prevState) =>({
      ...prevState,
      random: false
    }));
    dispatch(registerGame(gameSelection));
    setShow(true);
  };
  const submitPlayers = (e) => {
    e.preventDefault();
    dispatch(registerGame(gameSelection));
    navigate("/redirect");
    setShow(false);
  };
  const onChange = (e) => {
    setGameSelection((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeRandom = (e) => {
    setGameSelection((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Link to="/">Home</Link>
          <ul>
            {user && players.length > 2 && (
              <li>
                <Button variant="primary" onClick={handleShow}>
                  <Gi3DHammer />
                  Plan Match
                </Button>
              </li>
            )}
            {user ? (
              <>
                <li>
                  <Link className="btn btn-info" to="/add-player">
                    <FaPlus />
                    Add Player
                  </Link>
                </li>
                <li>
                  <Button variant="success" onClick={onLogout}>
                    <FaSignOutAlt />
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <FaSignInAlt />
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <FaUser />
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Game Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Players</Form.Label>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Button
              variant="primary"
              name="playersCount"
              value="2"
              onClick={onChange}
            >
              1 X 1
            </Button>
            {players.length >= 4 && (
              <Button
                className="ms-5"
                name="playersCount"
                onClick={onChange}
                variant="primary"
                value="4"
              >
                2 X 2
              </Button>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              name="points"
              min="1"
              max="10"
              placeholder="1"
              onChange={onChange}
            />
          </Form.Group>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                name="random"
                label="Random Players"
                onClick={onChangeRandom}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitPlayers}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Header;
