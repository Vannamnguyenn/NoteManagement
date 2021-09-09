export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_POSTS":
      return {
        ...state,
        posts: payload,
        isLoadingPost: false,
      };
    case "GET_A_POST":
      return {
        ...state,
        post: payload,
      };
    case "GET_ALL_FAIL":
      return {
        ...state,
        posts: payload,
        isLoadingPost: false,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload._id),
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === payload._id) return payload;
          return post;
        }),
      };
    default:
      break;
  }
};
