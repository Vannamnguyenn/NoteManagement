import React, { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { PostContext } from "../../contexts/PostContext";

const ActionButtons = ({ url, _id }) => {
  const { deletePost, getAPost, setShowUpdateModal, setShowToastAdd } =
    useContext(PostContext);
  const handleUpdate = () => {
    getAPost(_id);
    setShowUpdateModal(true);
  };
  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" height="32" />
      </Button>
      <Button className="post-button" onClick={handleUpdate}>
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button
        className="post-button"
        onClick={async () => {
          const { success, message } = await deletePost(_id);
          setShowToastAdd({
            show: true,
            type: success ? "success" : "danger",
            message,
          });
        }}
      >
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtons;
