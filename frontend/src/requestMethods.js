import axios from "axios";
// import { useSelector } from "react-redux";

export const getUserToken = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return currentUser?.access_token;
};

const TOKEN = getUserToken();


export const userRequest = axios.create({
  headers: { token: `Bearer ${TOKEN}` },
});


// // Custom hook to retrieve the user token from Redux state
// export const useUserToken = () => {
//   const currentUser = useSelector((state) => state.user.currentUser);
//   return currentUser?.access_token;
// };

// export const useUserRequest = () => {
//   // Retrieve token using the custom hook
//   const TOKEN = useUserToken();

//   return axios.create({
//     headers: { token: `Bearer ${TOKEN}` },
//   });
// };
