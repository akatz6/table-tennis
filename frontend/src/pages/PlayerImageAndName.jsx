function PlayerImageAndName(player) {
 
  const {firstName, lastName, image} = player.player;
  return (
    <div style={{ margin: "10%" }}>
      <img
        className="rounded-circle game-images img-fluid"
        src={`${process.env.REACT_APP_S3_FILE}${image}`}
        alt="Italian Trulli"
      />
      <p style={{ marginTop: "10px", textAlign:"center" }}>
        {firstName} {lastName}
      </p>
    </div>
  );
}
export default PlayerImageAndName