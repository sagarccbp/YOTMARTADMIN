import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {Link, NavLink} from "react-router-dom";
import {Data} from "./data";
import {makePhonePe} from "../../../rest/ApiService";
import {LoginComponent} from "../../../pages/LoginComponent";
// import SidebarGlobal from "../../../js/SidebarGlobal";

export const SideBar = () => {
  // const userDetails = JSON.parse(localStorage.getItem("user"));
  // const [loggedInUser, setLoggedInUser] = useState({});
  // const [show, setShow] = useState(false);

  // const [isLoading, setLoading] = useState(false);
  // const handleClose = () => {
  //   setShow(false);
  //   // reload();
  // };
  // const reload = () => window.location.reload();
  // const handleShow = () => setShow(true);
  // console.log(userDetails);
  // useEffect(() => {
  //   setLoggedInUser(userDetails);
  // }, []);

  // useEffect(() => {
  //   const timeId = setTimeout(() => {
  //     setShow(true);
  //     setLoading(false);
  //   }, 5000);

  //   return () => clearTimeout(timeId);
  // }, []);

  // const adminPay = e => {
  //   e.preventDefault();
  //   console.log("ADMINPAY");
  // };

  return (
    <>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">Take Subscription</Modal.Title>
          <div onClick={handleClose}>
            <i
              className="fa fa-window-close fa-2x"
              style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>

        <Modal.Body>
          <h1>PAYMENT</h1>
          <button
            onClick={e => {
              adminPay(e);
            }}
            type="button">
            PAY
          </button>
        </Modal.Body>
      </Modal> */}
      <div className="main-sidebar">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <Link to="/"> YOTMART </Link>{" "}
          </div>{" "}
          <div className="sidebar-brand sidebar-brand-sm">
            <Link to="/"> YOT </Link>{" "}
          </div>{" "}
          <ul className="sidebar-menu mb-5">
            {" "}
            {Data.menus.map((menu, iMenu) => {
              let comp;
              if (menu.header) {
                comp = (
                  <li key={iMenu} className="menu-header">
                    {" "}
                    {menu.name}{" "}
                  </li>
                );
              } else if (menu.dropdown) {
                if (menu.active) {
                  comp = (
                    <li key={iMenu} className="nav-item dropdown active">
                      <a href="#" className="nav-link has-dropdown">
                        <i className={menu.icon} /> <span> {menu.name} </span>
                      </a>{" "}
                      <ul className="dropdown-menu">
                        {" "}
                        {menu.children.map((submenu, iSubmenu) => {
                          let subComp;
                          if (submenu.active) {
                            if (submenu.beep) {
                              subComp = (
                                <li key={iSubmenu} className="active">
                                  <NavLink
                                    activeStyle={{
                                      color: " #0b0e8e",
                                      fontWeight: "600",
                                    }}
                                    exact
                                    className="beep beep-sidebar"
                                    to={submenu.url}>
                                    {" "}
                                    {submenu.name}{" "}
                                  </NavLink>{" "}
                                </li>
                              );
                            } else {
                              subComp = (
                                <li key={iSubmenu}>
                                  <NavLink
                                    activeStyle={{
                                      color: " #0b0e8e",
                                      fontWeight: "600",
                                    }}
                                    exact
                                    to={submenu.url}>
                                    {" "}
                                    {submenu.name}{" "}
                                  </NavLink>{" "}
                                </li>
                              );
                            }
                          } else if (submenu.beep) {
                            subComp = (
                              <li key={iSubmenu}>
                                <NavLink
                                  activeStyle={{
                                    color: " #0b0e8e",
                                    fontWeight: "600",
                                  }}
                                  exact
                                  className="beep beep-sidebar"
                                  to={submenu.url}>
                                  {" "}
                                  {submenu.name}{" "}
                                </NavLink>{" "}
                              </li>
                            );
                          } else {
                            subComp = (
                              <li key={iSubmenu}>
                                <NavLink
                                  activeStyle={{
                                    color: " #0b0e8e",
                                    fontWeight: "600",
                                  }}
                                  exact
                                  to={submenu.url}>
                                  {" "}
                                  {submenu.name}{" "}
                                </NavLink>{" "}
                              </li>
                            );
                          }

                          return subComp;
                        })}{" "}
                      </ul>{" "}
                    </li>
                  );
                } else {
                  comp = (
                    <li key={iMenu} className="nav-item dropdown">
                      <a href="#" className="nav-link has-dropdown">
                        <i className={menu.icon} /> <span> {menu.name} </span>
                      </a>{" "}
                      <ul className="dropdown-menu">
                        {" "}
                        {menu.children.map((submenu, iSubmenu) => {
                          let subComp;
                          if (submenu.active) {
                            if (submenu.beep) {
                              subComp = (
                                <li key={iSubmenu} className="active">
                                  <NavLink
                                    activeStyle={{
                                      color: " #0b0e8e",
                                      fontWeight: "600",
                                    }}
                                    exact
                                    className="beep beep-sidebar"
                                    to={submenu.url}>
                                    {" "}
                                    {submenu.name}{" "}
                                  </NavLink>{" "}
                                </li>
                              );
                            } else {
                              subComp = (
                                <li key={iSubmenu} className="active">
                                  <NavLink
                                    activeStyle={{
                                      color: " #0b0e8e",
                                      fontWeight: "600",
                                    }}
                                    exact
                                    to={submenu.url}>
                                    {" "}
                                    {submenu.name}{" "}
                                  </NavLink>{" "}
                                </li>
                              );
                            }
                          } else if (submenu.beep) {
                            subComp = (
                              <li key={iSubmenu}>
                                <NavLink
                                  activeStyle={{
                                    color: " #0b0e8e",
                                    fontWeight: "600",
                                  }}
                                  exact
                                  className="beep beep-sidebar"
                                  to={submenu.url}>
                                  {" "}
                                  {submenu.name}{" "}
                                </NavLink>{" "}
                              </li>
                            );
                          } else {
                            subComp = (
                              <li key={iSubmenu}>
                                <NavLink
                                  activeStyle={{
                                    color: " #0b0e8e",
                                    fontWeight: "600",
                                  }}
                                  exact
                                  to={submenu.url}>
                                  {" "}
                                  {submenu.name}{" "}
                                </NavLink>{" "}
                              </li>
                            );
                          }

                          return subComp;
                        })}{" "}
                      </ul>{" "}
                    </li>
                  );
                }
              } else if (menu.active) {
                //
                comp = (
                  <li key={iMenu} className="s">
                    <NavLink
                      activeStyle={{
                        color: " #0b0e8e",
                        fontWeight: "600",
                      }}
                      exact
                      to={menu.url}>
                      <i className={menu.icon} /> <span> {menu.name} </span>
                    </NavLink>{" "}
                  </li>
                );
              } else {
                //Single Component
                comp = (
                  <li key={iMenu}>
                    <NavLink
                      activeStyle={{
                        color: " #0b0e8e",
                        fontWeight: "600",
                      }}
                      exact
                      to={menu.url}>
                      <i className={menu.icon} /> <span> {menu.name} </span>
                    </NavLink>{" "}
                  </li>
                );
              }

              return comp;
            })}{" "}
          </ul>{" "}
          <div className="mt-4 mb-4 p-3 hide-sidebar-mini"></div>{" "}
        </aside>{" "}
      </div>
    </>
  );
};

export default SideBar;
