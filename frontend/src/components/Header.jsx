import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import Button from "react-bootstrap/Button";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/')
  }

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Link to="/">Home</Link>
          <ul>
            {user ? (
              <li>
                <Button variant="success" onClick={onLogout}>
                  <FaSignOutAlt />
                  Logout
                </Button>
              </li>
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
    </div>
  );
}

export default Header;
