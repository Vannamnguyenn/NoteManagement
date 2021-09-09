import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logoutIcon from "../../assets/logout.svg";
import learnItLogo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const {
    authState: {
      user: { username },
    },
    logout,
  } = useContext(AuthContext);
  console.log(logout);
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <Navbar
        expand="lg"
        bg="primary"
        variant="dark"
        className="shadow"
        className="ps-3 pe-3"
      >
        <Navbar.Brand
          className="fw-bolder text-white"
          as={Link}
          to="/dashboard"
        >
          <img
            src={learnItLogo}
            alt="IT"
            width="32"
            height="32"
            className="me-2"
          />
          LearnIt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-class" />
        <Navbar.Collapse id="basic-navbar-class" className="ps-3 pe-3">
          <Nav className="me-auto">
            <Nav.Link
              className="fw-bolder text-white"
              to="/dashboard"
              as={Link}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link className="fw-bolder text-white" to="/about" as={Link}>
              About
            </Nav.Link>
          </Nav>
          <Nav.Link className="text-white" disabled>
            <p style={{ marginBottom: "0" }}>
              <b>Welcome {username}</b>
            </p>
          </Nav.Link>
          <Button
            variant="secondary"
            className="fw-bolder text-white"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="" width="32" height="32" />
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
