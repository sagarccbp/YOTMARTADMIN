import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {useHistory} from "react-router-dom";
import {createAccount, createNewAddress} from "../../rest/ApiService";
import Loader from "../../components/modals/Loader/Loader";
import {ToastContainer, toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function AddVendorModal() {
  const [show, setShow] = useState(false);
  const [inputVarr, setInputVarr] = useState([]);
  const [areaManagerUserId, setAreaManagerUserId] = useState("");
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
  const initialStateOfAddress = {
    isDefaultAddress: false,
    houseNumber: Number,
    userId: "",
    name: "",
    contactNumber: "",
    pin: Number,
    city: "",
    area: "",
    district: "",
    state: "",
    alternativeMobileNumber: Number,
    landMark: "",
  };
  const [userData, setUserData] = useState(state);
  const [showMessage, setShowMessage] = useState("");
  const [showAddress, setShowAddress] = useState(true);
  const [stateAddress, setStateAddress] = useState(initialStateOfAddress);
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
  function changeHandlerAddress(evt) {
    console.log(areaManagerUserId, "Area");
    const value = evt.target.value;
    console.log(stateAddress, "ADDRESS");
    if (evt.target.name === "contactNumber" || evt.target.pin === "pin") {
      setStateAddress({
        ...stateAddress,
        [evt.target.name]: parseInt(value),
      });
    } else {
      setStateAddress({
        ...stateAddress,
        [evt.target.name]: value,
      });
    }
  }

  useEffect(() => {
    console.log(stateAddress, "ADMINADDRESS");
    console.log(areaManagerUserId);
  }, [stateAddress, areaManagerUserId]);

  const signUp = event => {
    event.preventDefault();
    if (userData) {
      createAccount(userData, result => {
        console.log(result);
        if (result.error) {
          setShowMessage("User credentials not matching");
        } else if (result.message) {
          setAreaManagerUserId(result.user._id);
          setShowMessage(result.message);
          setUserData({
            role: "VENDOR",
            fullName: "",
            email: "",
            mobileNumber: "",
            password: "",
          });
          setShowAddress(false);
          // toast("Successfully Created the Area Manager Account");
          //   return (window.location.href = "/");
        }
      });
    }
  };

  const submitAddress = event => {
    event.preventDefault();
    console.log(stateAddress);
    createNewAddress(stateAddress, areaManagerUserId, result => {
      if (result.message) {
        console.log(result);
        setStateAddress(initialStateOfAddress);
        toast("Successfully Created the Area Manager Account and Address");
      }
    });
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
      <Modal size="xl" show={show} onHide={handleClose}>
        {isLoading ? (
          <Loader />
        ) : showAddress ? (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">
                Create Area Manager Account
              </Modal.Title>
              <div onClick={handleClose}>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{color: "#0b0e8e"}}></i>
              </div>
            </Modal.Header>

            <Modal.Body>
              {/* <div className="card card-primary"> */}
              {/* <div className="card-header">
              <h4>Create Vendor Account</h4>
            </div> */}

              {/* <p className="text-muted">
                We will send a password through a registered mobile number
              </p> */}

              <form onSubmit={signUp}>
                <div className="card-body">
                  <div className="row">
                    {/* <div className="col-lg-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="roles">Select Role</label>
                    <select
                      name="role"
                      id="roles"
                      className="form-control"
                      value={userData.role}
                      onChange={changeHandler}>
                      <option value="VENDOR">Producer</option>
                    </select>
                    <div className="invalid-feedback realfoodcolor">
                      Please fill in your mobile number
                    </div>
                  </div>
                </div> */}
                    <div className="col-lg-6 col-sm-12">
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
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
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
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
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
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
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
                    </div>
                  </div>
                  {/* <div className="row">
               
              </div> */}

                  {/* </div> */}
                  {/* <div className="form-group"> */}
                  <div className="col-md-12 text-right">
                    <button
                      type="submit"
                      className="btn btn-default btn-lg btn-block realfoodbgcolor realfoodcolorw"
                      tabindex="4">
                      Submit
                    </button>
                  </div>
                  {/* </div> */}
                  {/* <div className="float-right">
                  <a href="/auth/login" className="text-small">
                    Returning customer? Sign in
                  </a>
                </div> */}
                </div>
              </form>
              <ToastContainer />

              {/* </div> */}
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">
                Add Area Manager Address
              </Modal.Title>
              <div onClick={handleClose}>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{color: "#0b0e8e"}}></i>
              </div>
            </Modal.Header>

            <Modal.Body>
              {/* <div className="card card-primary"> */}
              {/* <div className="card-header">
                <h4>Create Vendor Account</h4>
              </div> */}

              {/* <p className="text-muted">
                  We will send a password through a registered mobile number
                </p> */}

              <form onSubmit={submitAddress}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control"
                          value={stateAddress.name}
                          onChange={changeHandlerAddress}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="mobileNumberAddress">
                          Mobile Number
                        </label>
                        <input
                          type="number"
                          id="mobileNumberAddress"
                          name="contactNumber"
                          required
                          className="form-control"
                          value={stateAddress.contactNumber}
                          onChange={changeHandlerAddress}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="pincode">Pincode</label>
                        <input
                          id="pincode"
                          type="number"
                          name="pin"
                          required
                          className="form-control"
                          value={stateAddress.pin}
                          onChange={changeHandlerAddress}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="city">City/Village</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          className="form-control"
                          value={stateAddress.city}
                          onChange={changeHandlerAddress}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className=" col-sm-12">
                      <div className="form-group">
                        <label htmlFor="addressLine1">Address</label>
                        <textarea
                          type="textarea"
                          rows="2"
                          placeholder="Address (D No, Area and Street)"
                          className="form-control"
                          name="area"
                          value={stateAddress.area}
                          onChange={changeHandlerAddress}
                        />
                      </div>
                    </div>
                    {/* <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="addressOne">Address Line 2</label>
                        <input
                          type="text"
                          id="addressOne"
                          name="addressOne"
                          required
                          className="form-control"
                          // style={{width: "calc(50% - 10px)"}}
                          // value={inputVarient.header}
                          // placeholder="Header"
                          // onChange={varientText}
                        />
                      </div>
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="district">District</label>
                        <input
                          type="text"
                          name="district"
                          required
                          className="form-control"
                          value={stateAddress.district}
                          onChange={changeHandlerAddress}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          required
                          className="form-control"
                          value={stateAddress.state}
                          onChange={changeHandlerAddress}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="landMark">Land Mark</label>
                        <input
                          type="text"
                          name="landMark"
                          className="form-control"
                          value={stateAddress.landMark}
                          onChange={changeHandlerAddress}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="alternative">
                          Alternative Mobile Number
                        </label>
                        <input
                          type="number"
                          id="alternative"
                          name="alternativeMobileNumber"
                          required
                          className="form-control"
                          value={stateAddress.alternativeMobileNumber}
                          onChange={changeHandlerAddress}
                        />
                      </div>
                    </div>
                  </div>

                  {/* </div> */}
                  {/* <div className="form-group"> */}
                  <div className="col-md-12 text-right">
                    <button
                      type="submit"
                      className="btn btn-default btn-lg btn-block realfoodbgcolor realfoodcolorw"
                      tabindex="4">
                      Submit
                    </button>
                  </div>
                  {/* </div> */}
                  {/* <div className="float-right">
                    <a href="/auth/login" className="text-small">
                      Returning customer? Sign in
                    </a>
                  </div> */}
                </div>
              </form>
              <ToastContainer />

              {/* </div> */}
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}
