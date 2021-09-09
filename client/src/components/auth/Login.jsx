import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../Alert/Alert";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;
  const { login } = useContext(AuthContext);
  const [alertMessage, setalertMessage] = useState(null);
  const inputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = await login(loginForm);

      if (success === false) {
        setalertMessage({
          type: "danger",
          message,
        });
        setTimeout(() => setalertMessage(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AlertMessage info={alertMessage} />
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Control
            required
            onChange={inputChange}
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            required
            onChange={inputChange}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          />
        </Form.Group>

        <Button type="submit" variant="success" size="sm" className="mt-2">
          Login
        </Button>
      </Form>
      <p className="mt-2">
        Don't have account ?
        <Link to="/register">
          <Button variant="info" size="sm" className="ms-2">
            Register now
          </Button>
        </Link>
      </p>
    </>
  );
};

export default Login;
