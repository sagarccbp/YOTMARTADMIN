/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import ToggleData from "./ToggleData";
import UserDropdown from "./UserDropdown";

import io from "socket.io-client";
import {API_SERVER} from "../../../rest/ApiService";
import {useLocation} from "react-router-dom";

var socket;

const Header = () => {
  // socket = io(API_SERVER);
  const [isNotification, setIsNotification] = useState(false);

  //   useEffect(() => {
  //   const user = {
  //     _id: localStorage.getItem('userId')
  //   }
  //   socket.emit("setup", user);
  //   socket.on("connected", () => {
  //     console.log("Connected");
  //   });
  // }, [])

  useEffect(() => {
    let location = window.location.href;
    let locationSplit = location.split("/");
    let locationParent = locationSplit[1];
    let WithoutNotification = ["chatbox"];
    // socket.on("message recieved", (newMessageRecieved) => {
    //   console.log("Message recieved..", newMessageRecieved);
    //   if (!WithoutNotification.includes(locationParent)) {
    //     setIsNotification(true);
    //   }
    // });
  });

  const userDetails = {
    userName: localStorage.getItem("name"),
    userImg: "../../../assets/img/avatar/avatar-1.png",
    logoutIcon: "fas fa-sign-out-alt",
    logoutTitle: "Logout",
    userRole: localStorage.getItem("role"),
    datas: [
      {
        link: "/feature/activities",
        icode: "fas fa-bolt",
        title: "Change Password",
      },
    ],
  };
  const NotifyData = {
    toggleName: "notification-toggle",
    iconName: "far fa-envelope",
  };

  return (
    <div>
      <div className="navbar-bg " style={{backgroundColor: "#0b0e8e"}} />
      <nav className="navbar navbar-expand-lg main-navbar">
        <form className="form-inline mr-auto">
          <ul className="navbar-nav mr-3">
            <li>
              <a
                href="#"
                data-toggle="sidebar"
                className="nav-link nav-link-lg">
                <i className="fas fa-bars" />
              </a>
            </li>
          </ul>
        </form>
        <ul className="navbar-nav navbar-right">
          {isNotification ? (
            <li className="dropdown dropdown-list-toggle">
              <a href="/chatbox" className={`nav-link nav-link-lg beep`}>
                <i className="far fa-envelope" />
              </a>
            </li>
          ) : (
            <li className="dropdown dropdown-list-toggle">
              <a href="/chatbox" className={`nav-link nav-link-lg`}>
                <i className="far fa-envelope" />
              </a>
            </li>
          )}
          <UserDropdown userDetail={userDetails} />
        </ul>
      </nav>
    </div>
  );
};

export default Header;
