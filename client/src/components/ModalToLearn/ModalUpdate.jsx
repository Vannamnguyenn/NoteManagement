import { Button, Form, Modal } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
// { post: { title, header, status, description, url } }
const ModalUpdate = ({ post }) => {
  const { setShowUpdateModal, updatePost, showUpdateModal, setShowToastAdd } =
    useContext(PostContext);
  const [updatedPost, setUpdatedPost] = useState(post);

  const onChangeInput = (event) => {
    setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => setUpdatedPost(post), [post]);
  const { title, description, url, status } = updatedPost;

  const handleClose = () => {
    setShowUpdateModal(false);
    setUpdatedPost(post);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowToastAdd({
      show: true,
      type: success ? "success" : "danger",
      message,
    });
    handleClose();
  };
  return (
    <Modal
      show={showUpdateModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>Change process !</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              onChange={onChangeInput}
              className="mb-3"
              name="title"
              type="text"
              placeholder="title"
              required
              aria-describedby="title-help"
              value={title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={onChangeInput}
              className="mb-3"
              rows={3}
              name="description"
              placeholder="Description"
              as="textarea"
              value={description}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={onChangeInput}
              name="url"
              type="text"
              placeholder="URL to learn"
              value={url}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={onChangeInput}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Update
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalUpdate;
