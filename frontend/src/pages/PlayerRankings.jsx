import Button from "react-bootstrap/Button";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { delPlayer, reset } from "../features/player/playerSlice";
import { toast } from "react-toastify";

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

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.player
  );

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
    console.log(e.target.value);
    navigate(`/${e.target.value}`);
  };

  const deletePlayer = (e) => {
    dispatch(delPlayer(e.target.value));
    setRowDeleted(true);
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
        <td>{percentage}</td>
        <td>{lastPlayed === null ? "had not played yet" : lastPlayed}</td>
        <td>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="primary" onClick={updatePlayer} value={_id}>
              Update
            </Button>
            <Button variant="danger" onClick={deletePlayer} value={_id}>
              Delete
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default PlayerRankings;
