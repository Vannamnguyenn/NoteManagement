import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect, Route } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Header from "../Navbar/Navbar";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authState } = useContext(AuthContext);
  if (authState.authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isAuthenticated ? (
          <>
            <Header />
            <Component {...props} {...rest} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
