import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {useHistory} from "react-router-dom";
import {createAccount} from "../../rest/ApiService";
import Loader from "../../components/modals/Loader/Loader";
import {ToastContainer, toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function AddVendorModal() {
  const [show, setShow] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
    reload();
  };
  const reload = () => window.location.reload();
  const handleShow = () => setShow(true);

  const [error, setError] = useState(false);
  const history = useHistory();
  const state = {
    role: "VENDOR",
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
  };
  const [userData, setUserData] = useState(state);
  const [showMessage, setShowMessage] = useState("");

  function changeHandler(evt) {
    const value = evt.target.value;
    console.log(userData, "ADDRESS");
    if (evt.target.name === "mobileNumber") {
      setUserData({
        ...userData,
        [evt.target.name]: value,
      });
    } else {
      setUserData({
        ...userData,
        [evt.target.name]: value,
      });
    }
  }

  const signUp = event => {
    event.preventDefault();
    if (userData) {
      createAccount(userData, result => {
        console.log(result);
        if (result.error) {
          setShowMessage("User credentials not matching");
        } else if (result.message) {
          setShowMessage(result.message);
          setUserData({
            role: "VENDOR",
            fullName: "",
            email: "",
            mobileNumber: "",
            password: "",
          });
          toast("Successfully Created the Vendor Account");
          //   return (window.location.href = "/");
        }
      });
    }
  };

  return (
    <>
      <div
        onClick={handleShow}
        className="btn btn-default ml-1"
        style={{background: "#0b0e8e", color: "white"}}>
        <i className="fas fa-plus m-0">
          <span className="ml-1">Add</span>
        </i>
      </div>
      <Modal show={show} onHide={handleClose}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">
                Create Vendor Account
              </Modal.Title>
              <div onClick={handleClose}>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{color: "#0b0e8e"}}></i>
              </div>
            </Modal.Header>

            <Modal.Body>
              <div className="card card-primary">
                {/* <div className="card-header">
                  <h4>Create Vendor Account</h4>
                </div> */}

                <div className="card-body">
                  {/* <p className="text-muted">
                    We will send a password through a registered mobile number
                  </p> */}
                  <form onSubmit={signUp}>
                    <div className="form-group">
                      <label htmlFor="cars">Select Role</label>

                      <select
                        name="role"
                        id="roles"
                        className="form-control"
                        value={userData.role}
                        onChange={changeHandler}>
                        <option value="VENDOR">Vendor</option>
                      </select>
                      <div className="invalid-feedback realfoodcolor">
                        Please fill in your mobile number
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Mobile Number</label>
                      <input
                        id="mobileNumber"
                        type="tel"
                        pattern="^[0-9]*$"
                        className="form-control"
                        name="mobileNumber"
                        value={userData.mobileNumber}
                        tabIndex="2"
                        required
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback realfoodcolor">
                        Please fill in your mobile number
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        tabIndex="2"
                        value={userData.email}
                        required
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback realfoodcolor">
                        Please fill in your Email
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Name</label>
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="fullName"
                        tabIndex="2"
                        value={userData.fullName}
                        required
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback realfoodcolor">
                        Please fill in your Name
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Password</label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        value={userData.password}
                        tabIndex="2"
                        required
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback realfoodcolor">
                        Please fill in your Password
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-default btn-lg btn-block realfoodbgcolor realfoodcolorw"
                        tabindex="4">
                        Create Account
                      </button>
                    </div>
                    {/* <div className="float-right">
                      <a href="/auth/login" className="text-small">
                        Returning customer? Sign in
                      </a>
                    </div> */}
                  </form>
                  <ToastContainer />
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}
