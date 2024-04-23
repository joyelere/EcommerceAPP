import axios from "axios";
import { loginFailure, loginStart, loginSuccess, logOut } from "./userRedux";
import { jwtDecode } from "jwt-decode";

// Function to check if the token has expired
const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  return decodedToken.exp < currentTime;
};

// Check token expiration when app loads or on page refresh
export const checkTokenExpiration = (token) => (dispatch) => {
  if (isTokenExpired(token)) {
    dispatch(logOut());
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

// Logout action
export const logout = () => (dispatch) => {
  dispatch(logOut({ message: "Token expired" }));
};
