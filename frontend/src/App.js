import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import AddPlayer from "./pages/AddPlayer";
import EditPlayer from "./pages/EditPlayer";
import PlayerSelection from "./pages/PlayerSelection";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<EditPlayer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-player" element={<PrivateRoute />}>
            <Route path="/add-player" element={<AddPlayer />} />
          </Route>
          <Route path="/select-players" element={<PrivateRoute />}>
            <Route path="/select-players" element={<PlayerSelection />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
