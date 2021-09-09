import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { AUTH_API } from "../constants/authConstant";
import { postReducer } from "../Reducer/postReducer";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [posts, dispatch] = useReducer(postReducer, {
    post: {},
    posts: [],
    isLoadingPost: true,
  });

  const [showToastAdd, setShowToastAdd] = useState({
    show: false,
    type: null,
    message: null,
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // get all post
  const getAllPosts = async () => {
    try {
      const data = await axios.get(`${AUTH_API}/posts`);
      if (data.data.success)
        dispatch({
          type: "GET_ALL_POSTS",
          payload: data.data.posts,
        });
      return data.data;
    } catch (error) {
      dispatch({
        type: "GET_ALL_FAIL",
      });
    }
  };
  // add post
  const addPost = async (post) => {
    try {
      post.status = "TO LEARN";
      const data = await axios.post(`${AUTH_API}/posts`, post);
      if (data.data.success)
        dispatch({
          type: "ADD_POST",
          payload: data.data.post,
        });
      return data.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { type: "danger", message: "Error when add to learn !" };
    }
  };
  // update post
  const updatePost = async (post) => {
    try {
      const data = await axios.put(`${AUTH_API}/posts/${post._id}`, post);
      dispatch({
        type: "UPDATE_POST",
        payload: data.data.post,
      });
      return data.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { type: "danger", message: "Error when update to learn !" };
    }
  };
  // get a post
  const getAPost = async (id) => {
    const post = posts.posts.find((post) => post._id === id);
    dispatch({ type: "GET_A_POST", payload: post });
  };
  // delete a post
  const deletePost = async (id) => {
    try {
      const data = await axios.delete(`${AUTH_API}/posts/${id}`);
      dispatch({
        type: "DELETE_POST",
        payload: data.data.deletePost,
      });
      return data.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { type: "danger", message: "Error when delete to learn !" };
    }
  };
  const dataExport = {
    posts,
    getAllPosts,
    showAddModal,
    setShowAddModal,
    addPost,
    setShowToastAdd,
    showToastAdd,
    deletePost,
    getAPost,
    updatePost,
    showUpdateModal,
    setShowUpdateModal,
  };

  return (
    <PostContext.Provider value={dataExport}>{children}</PostContext.Provider>
  );
};

export default PostContextProvider;
