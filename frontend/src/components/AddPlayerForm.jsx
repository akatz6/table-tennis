import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/player/playerSlice";
import { toast } from "react-toastify";
import { uploadImage } from "../commonJSFiles/imageCode";


function AddPlayerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageName: "",
  });
  const ref = useRef();

  const [image, setImage] = useState();

  const { firstName, lastName, email, imageName } = formData;
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
    setImage(e.target.files[0]);
    const name = `${Date.now()}${e.target.files[0].name}`;
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: name,
    }));
  };

  useEffect(() => {
    if (isError || message) {
      console.log(message);
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("New Player Added");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        imageName: "",
      });
      ref.current.value = "";
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, formData]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!imageName) {
      toast.error("Please add image");
      return;
    }

    await uploadImage(image, imageName);

    const userData = {
      firstName,
      lastName,
      email,
      imageName,
    };
    dispatch(register(userData));
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
            value={firstName}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
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
            name="imageName"
            className="form-control"
            ref={ref}
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

export default AddPlayerForm;
