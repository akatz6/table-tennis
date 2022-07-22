import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updatePlayer, getPlayer, reset } from "../features/player/playerSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import S3 from "react-aws-s3";

const config = {
  bucketName: "aaron-table-tennis",
  region: "us-west-2",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
};

function EditPlayer() {
  const params = useParams();
  const dispatch = useDispatch();

  const { firstName, lastName, email, image } = useSelector(
    (state) => state.player.player
  );

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.player
  );

  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
    image,
  });

  const [formDataPrev, setFormDataPrev] = useState({
    firstName,
    lastName,
    email,
    image,
  });

  const [pic, changePicture] = useState("");
  const [imageInfo, setImageInfo] = useState(null);
  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Player Updated");
      ref.current.value = "";
      dispatch(reset());
    }
    const { id } = params;
    dispatch(getPlayer(id));
    changePicture(`${process.env.REACT_APP_S3_FILE}${image}`);
    setFormData({ id, firstName, lastName, email, image });
    setFormDataPrev({ firstName, lastName, email, image });
  }, [
    params,
    dispatch,
    image,
    setFormData,
    firstName,
    lastName,
    email,
    setFormDataPrev,
    isError,
    isSuccess,
    message,
  ]);
  const ref = useRef();
  const onSubmit = async (e) => {
    e.preventDefault();

    if (JSON.stringify(formDataPrev) === JSON.stringify(formData)) {
      return;
    }
    if (formData.image && formData.image !== image) {
      const ReactS3Client = new S3(config);
      await ReactS3Client.uploadFile(imageInfo, formData.image);
    }
    dispatch(updatePlayer(formData));
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeImage = (e) => {
    const [file] = e.target.files;
    changePicture(URL.createObjectURL(file));
    setImageInfo(e.target.files[0]);
    const name = `${Date.now()}${e.target.files[0].name}`;
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: name,
    }));
  };

  return (
    <div>
      <h1>Update player</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName || ""}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName || ""}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email || ""}
            onChange={onChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3 d-flex" controlId="formImage">
          <div className="size='6' sm='3">
            <img
              style={{ margin: "0 auto", height: "200px", width: "90%" }}
              className="rounded-circle table-images img-fluid"
              src={`${pic}`}
              alt="Italian Trulli"
            />
          </div>
          <div className="size='6' sm='3" style={{ width: "100%" }}>
            <Form.Label>Update the Image</Form.Label>
            <input
              type="file"
              name="image"
              className="form-control"
              ref={ref}
              onChange={onChangeImage}
              accept="image/png, image/jpeg"
            />
          </div>
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditPlayer;
