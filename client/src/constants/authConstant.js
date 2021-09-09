export const AUTH_API =
  process.env.NODE_ENV !== "production"
    ? "https://glacial-river-91159.herokuapp.com/api"
    : "urlDeploy";
export const LOCAL_STORAGE_TOKEN_NAME = "learn-mern";
