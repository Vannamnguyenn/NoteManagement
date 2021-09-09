import React, { useContext, useEffect } from "react";
import { OverlayTrigger, Toast, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import addIcon from "../assets/plus-circle-fill.svg";
import ModalAdd from "../components/ModalToLearn/ModalAdd";
import ModalUpdate from "../components/ModalToLearn/ModalUpdate";
import SinglePost from "../components/Posts/SinglePost";
import { PostContext } from "../contexts/PostContext";

const Dashboard = () => {
  const {
    setShowAddModal,
    showToastAdd: { show, type, message },
    setShowToastAdd,
  } = useContext(PostContext);
  const {
    posts: { posts, post, isLoadingPosts },
    getAllPosts,
  } = useContext(PostContext);
  const listPost = posts;
  useEffect(() => {
    getAllPosts();
  }, []);

  let body = null;
  if (isLoadingPosts) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (listPost && listPost.length === 0) {
    body = (
      <>
        <Card className="mt-4 me-4 ms-4 ">
          <Card.Header className="text-center" as="h1">
            Hello welcome you
          </Card.Header>
          <Card.Body className="text-center">
            <Card.Title>Welcome to learnIt</Card.Title>
            <Card.Text>
              Click to the button below to track your fist skill to learn
            </Card.Text>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              Learn it
            </Button>
          </Card.Body>
        </Card>
        <Button
          className="btn-floating"
          onClick={setShowAddModal.bind(this, true)}
        >
          <img src={addIcon} width="60" height="60" alt="" />
        </Button>
      </>
    );
  } else if (listPost) {
    body = (
      <>
        <Row className="row-cols-1  row-cols-md-3 g-4 mx-auto mt-3">
          {listPost.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add new to learn !</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddModal.bind(this, true)}
          >
            <img src={addIcon} width="60" height="60" alt="" />
          </Button>
        </OverlayTrigger>
        <Toast
          show={show}
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
          }}
          className={`bg-${type} text-white`}
          delay={3000}
          autohide
          onClose={() =>
            setShowToastAdd({ show: false, type: null, message: "" })
          }
        >
          <Toast.Body>
            <strong>{message}</strong>
          </Toast.Body>
        </Toast>
      </>
    );
  }
  return (
    <div>
      {" "}
      {post && <ModalUpdate post={post} />}
      <ModalAdd />
      {body}
    </div>
  );
};

export default Dashboard;
