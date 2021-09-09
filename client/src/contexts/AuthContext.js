import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router";
import { AUTH_API, LOCAL_STORAGE_TOKEN_NAME } from "../constants/authConstant";
import { authReducer } from "../Reducer/authReducer";
import { setAuthToken } from "../untils/setAuthToken";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const history = useHistory();
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // call api login
  const login = async (data) => {
    try {
      const response = await axios.post(`${AUTH_API}/auth/login`, data);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.successToken
        );
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      return error.message;
    }
  };
  // log out func
  const logout = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    } catch (error) {
      return error.response;
    }
  };
  // func call api register user
  const register = async (data) => {
    try {
      const response = await axios.post(`${AUTH_API}/auth/register`, data);
      if (response.data.access) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      return error.message;
    }
  };

  // loadAuth
  const loadUser = async () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    if (token) setAuthToken(token);
    try {
      const data = await axios.get(`${AUTH_API}/auth`);
      if (data)
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: data.data.user,
          },
        });
    } catch (error) {
      console.log(error);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      setAuthToken(null);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);
  // context data
  const authContextData = { login, authState, register, logout };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
