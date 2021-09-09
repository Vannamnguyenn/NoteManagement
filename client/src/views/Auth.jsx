import React, { useContext } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Auth = ({ authRoute }) => {
  let body;
  const { authState } = useContext(AuthContext);

  if (authState.authLoading)
    body = (
      <div className="d-flex justify-content-center mt-3">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else if (authState.isAuthenticated) return <Redirect to="/dashboard" />;
  body = (
    <>
      {authRoute === "login" && <Login />}
      {authRoute === "register" && <Register />}
    </>
  );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learn it</h1>
          <h5 className="mb-4">Keep track of your learn</h5>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
