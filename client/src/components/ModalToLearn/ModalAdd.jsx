import { Button, Form, Modal } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
// { post: { title, header, status, description, url } }
const ModalAdd = () => {
  const resetNewpost = {
    title: "",
    description: "",
    url: "",
  };
  const { showAddModal, setShowAddModal, addPost, setShowToastAdd } =
    useContext(PostContext);
  const [newPost, setNewPost] = useState(resetNewpost);
  const onChangeInput = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };
  const handleClose = () => {
    setShowAddModal(false);
    setNewPost(resetNewpost);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addPost(newPost);
    setShowToastAdd({
      show: true,
      type: success ? "success" : "danger",
      message,
    });
    handleClose();
  };
  return (
    <Modal
      show={showAddModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>Add to learn now !</Modal.Title>
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
              value={newPost.title}
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
              value={newPost.description}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={onChangeInput}
              name="url"
              type="text"
              placeholder="URL to learn"
              value={newPost.url}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Add to learn
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
