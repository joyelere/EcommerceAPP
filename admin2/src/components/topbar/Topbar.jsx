import React from "react";
import "./topbar.css";
// import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { logout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function Topbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to={"/"} className="custom-link">
            <span className="logo">luwafyadmin</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Link to={""} className="custom-link" onClick={handleLogout}>
              <span>LOGOUT</span>
            </Link>
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
