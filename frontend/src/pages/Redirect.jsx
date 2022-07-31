import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/select-players");
  }, [navigate]);
  return <div></div>;
}
export default Redirect;
