import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { delPlayer, reset } from "../features/player/playerSlice";
import { toast } from "react-toastify";
import moment from "moment";

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
              <Button variant="danger" onClick={deletePlayer} value={_id}>
                Delete
              </Button>
            </div>
          </td>
        )}
      </tr>
    </>
  );
}

export default PlayerRankings;
