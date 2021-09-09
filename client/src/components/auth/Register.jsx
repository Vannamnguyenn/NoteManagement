import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../Alert/Alert";

const Register = () => {
  const [formRegister, setFormRegister] = useState({
    username: "",
    password: "",
    retypePassword: "",
  });
  const { register } = useContext(AuthContext);
  const [alertMessages, setalertMessages] = useState(null);

  const onChangeInput = (event) => {
    setFormRegister({
      ...formRegister,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (formRegister.password !== formRegister.retypePassword) {
      return setalertMessages({
        type: "danger",
        message: "Password is not match !",
      });
    }
    const { success, message } = await register(formRegister);
    if (!success)
      return setalertMessages({
        type: "danger",
        message: message,
      });
  };
  return (
    <>
      <AlertMessage info={alertMessages} />
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            onChange={onChangeInput}
            required
            type="text"
            placeholder="Enter username"
            name="username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            onChange={onChangeInput}
            required
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            onChange={onChangeInput}
            required
            type="password"
            placeholder="Retype Password"
            name="retypePassword"
          />
        </Form.Group>

        <Button type="submit" variant="success" size="sm" className="mt-2">
          Register
        </Button>
      </Form>
      <p className="mt-2">
        Already have an account ?
        <Link to="/login">
          <Button variant="info" size="sm" className="ms-2">
            Login now
          </Button>
        </Link>
      </p>
    </>
  );
};

export default Register;
