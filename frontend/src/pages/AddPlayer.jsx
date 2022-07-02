import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/player/playerSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function AddPlayer() {
  // const location = useLocation();
  // const { name } = location.state;
  // console.log(location);
  // console.log(name);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [file, setFile] = useState();

  const { firstName, lastName, email, image } = formData;
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.player
  );

  const dispatch = useDispatch();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeImage = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("New Player Added");
      dispatch(reset());
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
    };
    const fd = new FormData();
    fd.append("image", file);
    fd.append("userData", JSON.stringify(userData));
    dispatch(register(fd));
  };

  return (
    <div>
      <h1>Register a new player</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={onChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Add an Image</Form.Label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={onChangeImage}
            accept="image/png, image/jpeg"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPlayer;
