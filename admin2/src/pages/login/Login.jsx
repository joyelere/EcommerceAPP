import { useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    login(dispatch, credentials);
  };

  return (
    <div className="body-sty">
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h3>LOGIN</h3>
              <p>Please enter your credentials to login.</p>
            </div>
          </div>
          <form className="login-form">
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
            />
            <button onClick={handleClick} disabled={isFetching}>login</button>
            {error && <span>{error.message}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
