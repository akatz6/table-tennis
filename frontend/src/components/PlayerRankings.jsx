import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { delPlayer, reset } from "../features/player/playerSlice";
import { toast } from "react-toastify";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function PlayerRankings(player) {
  const {
    _id,
    firstName,
    lastName,
    email,
    image,
    wins,
    loses,
    percentage,
    lastPlayed,
  } = player.player;

  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.player
  );
  const [show, setShow] = useState(false);
  const [delId, setDelId] = useState();
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setDelId(e.target.value);
    setShow(true);
  };

  const deletePlayer = () => {
    dispatch(delPlayer(delId));
    setRowDeleted(true);
  };

  const [rowDeleted, setRowDeleted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && rowDeleted) {
      toast.success("Player Deleted");
      setRowDeleted(false);
      dispatch(reset());
      window.location.reload();
    }
    dispatch(reset());
  }, [
    isError,
    isSuccess,
    message,
    dispatch,
    navigate,
    rowDeleted,
    setRowDeleted,
  ]);

  const updatePlayer = (e) => {
    navigate(`/${e.target.value}`);
  };

  return (
    <>
      <tr>
        <td>
          <img
            className="rounded-circle table-images img-fluid"
            src={`${process.env.REACT_APP_S3_FILE}${image}`}
            alt="Italian Trulli"
          />
        </td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{wins}</td>
        <td>{loses}</td>
        <td>{percentage.toFixed(3)}</td>
        <td>
          {lastPlayed === null
            ? "had not played yet"
            : moment(lastPlayed).format("MMM Do YY")}
        </td>
        {user && (
          <td>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="primary" onClick={updatePlayer} value={_id}>
                Update
              </Button>
              <Button variant="danger" onClick={handleShow} value={_id}>
                Delete
              </Button>
            </div>
          </td>
        )}
      </tr>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Are you sure you want to delete this player?</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deletePlayer}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PlayerRankings;
