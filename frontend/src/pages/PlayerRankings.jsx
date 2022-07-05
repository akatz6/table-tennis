function PlayerRankings({
  player: {
    firstName,
    lastName,
    email,
    image,
    wins,
    loses,
    percentage,
    lastPlayed,
  },
}) {
  return (
    <>
      <tr>
        <td>
          <img
            className="rounded-circle table-images"
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
        <td>{lastPlayed === null ? 'had not played yet': lastPlayed}</td>
      </tr>
    </>
  );
}

export default PlayerRankings;
