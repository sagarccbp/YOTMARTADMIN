import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {useHistory} from "react-router-dom";
import {createAccount} from "../../rest/ApiService";
import Loader from "../../components/modals/Loader/Loader";
import {ToastContainer, toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function AddSupplierModal() {
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
    role: "ADMIN",
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
            role: "ADMIN",
            fullName: "",
            email: "",
            mobileNumber: "",
            password: "",
          });
          toast("Successfully Created the Supplier Account");
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
      <Modal size="xl" show={show} onHide={handleClose}>
        {isLoading ? (
          <Loader />
        ) : (
          // <>
          //   <Modal.Header>
          //     <Modal.Title className="realfoodcolor">
          //       Create Supplier Account
          //     </Modal.Title>
          //     <div onClick={handleClose}>
          //       <i
          //         className="fa fa-window-close fa-2x"
          //         style={{color: "#0b0e8e"}}></i>
          //     </div>
          //   </Modal.Header>

          //   <Modal.Body>
          //     <div className="card card-primary">
          //       {/* <div className="card-header">
          //         <h4>Create Vendor Account</h4>
          //       </div> */}

          //       <div className="card-body">
          //         {/* <p className="text-muted">
          //           We will send a password through a registered mobile number
          //         </p> */}
          //         <form onSubmit={signUp}>
          //           {/* <div className="form-group">
          //             <label htmlFor="cars">Select Role</label>

          //             <select
          //               name="role"
          //               id="roles"
          //               className="form-control"
          //               value={userData.role}
          //               onChange={changeHandler}>
          //               <option value="ADMIN">Supplier</option>
          //             </select>
          //             <div className="invalid-feedback realfoodcolor">
          //               Please fill in your mobile number
          //             </div>
          //           </div>
          //           <div className="form-group">
          //             <label htmlFor="mobile">Mobile Number</label>
          //             <input
          //               id="mobileNumber"
          //               type="tel"
          //               pattern="^[0-9]*$"
          //               className="form-control"
          //               name="mobileNumber"
          //               value={userData.mobileNumber}
          //               tabIndex="2"
          //               required
          //               onChange={changeHandler}
          //             />
          //             <div className="invalid-feedback realfoodcolor">
          //               Please fill in your mobile number
          //             </div>
          //           </div>
          //           <div className="form-group">
          //             <label htmlFor="mobile">Email</label>
          //             <input
          //               id="email"
          //               type="email"
          //               className="form-control"
          //               name="email"
          //               tabIndex="2"
          //               value={userData.email}
          //               required
          //               onChange={changeHandler}
          //             />
          //             <div className="invalid-feedback realfoodcolor">
          //               Please fill in your Email
          //             </div>
          //           </div>
          //           <div className="form-group">
          //             <label htmlFor="mobile">Name</label>
          //             <input
          //               id="name"
          //               type="text"
          //               className="form-control"
          //               name="fullName"
          //               tabIndex="2"
          //               value={userData.fullName}
          //               required
          //               onChange={changeHandler}
          //             />
          //             <div className="invalid-feedback realfoodcolor">
          //               Please fill in your Name
          //             </div>
          //           </div>
          //           <div className="form-group">
          //             <label htmlFor="mobile">Password</label>
          //             <input
          //               id="password"
          //               type="password"
          //               className="form-control"
          //               name="password"
          //               value={userData.password}
          //               tabIndex="2"
          //               required
          //               onChange={changeHandler}
          //             />
          //             <div className="invalid-feedback realfoodcolor">
          //               Please fill in your Password
          //             </div>
          //           </div>
          //           <div className="form-group">
          //             <button
          //               type="submit"
          //               className="btn btn-default btn-lg btn-block realfoodbgcolor realfoodcolorw"
          //               tabindex="4">
          //               Create Account
          //             </button>
          //           </div>
          //           {/* <div className="float-right">
          //             <a href="/auth/login" className="text-small">
          //               Returning customer? Sign in
          //             </a>
          //           </div> */} */}
          //         </form>
          //         <ToastContainer />
          //       </div>
          //     </div>
          //   </Modal.Body>
          // </>
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">
                Create Producer Account
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
                  <p>
                    <a
                      data-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      className="btn btn-default ml-1"
                      style={{background: "#2f3293", color: "white"}}
                      // onClick={onClickAddVariants}
                    >
                      Add Addresses
                    </a>
                  </p>
                  <div className="collapse" id="collapseExample">
                    {/* {inputVarr && inputVarr.length > 0 ? ( */}
                    <div className="card card-body p-0">
                      <table className="table table-sm">
                        <thead
                          style={{
                            backgroundColor: "#ffe6b3",
                            borderLeft: "1px solid #e5e5e5",
                          }}>
                          <tr>
                            <th
                              scope="col"
                              className="p-1 text-center"
                              style={{height: "15px"}}>
                              SL No.
                            </th>
                            <th
                              scope="col"
                              className="p-1 text-center"
                              style={{height: "15px"}}>
                              Addresses
                            </th>

                            <th
                              scope="col"
                              className="p-1 text-center"
                              style={{height: "15px"}}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {inputVarr && inputVarr.length > 0
                              ? inputVarr.map((vitem, index) => ( */}
                          <tr>
                            <td
                              className="p-1 text-center"
                              style={{height: "15px"}}>
                              1
                            </td>
                            <td
                              className="p-1 text-center"
                              style={{height: "15px"}}>
                              Sagar,9849252590,534123,penugonda,D
                              no:2-175/4,deva village,penugonda mandal,west
                              godavari district,andhrapradesh,near bus
                              stand,9030189967
                            </td>

                            <td
                              className="p-1 text-center"
                              style={{height: "15px"}}>
                              <div
                                // onClick={() => handleDelete(vitem.name)}
                                alt="Delete Address">
                                <i
                                  className="fa fa-trash"
                                  style={{
                                    color: "#2f3293",
                                    marginRight: "10px",
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                          {/* ))
                              : ""} */}
                        </tbody>
                      </table>
                    </div>
                    {/* ) : null} */}

                    {/* <div
                      className="add-variants-container"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        marginBottom: "20px",
                        margin: "20px",
                        height: "250px",
                        overflow: "auto",
                      }}> */}
                    <div className="row">
                      <div className="col-lg-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            className="form-control"
                            // style={{width: "calc(50% - 10px)"}}
                            // value={inputVarient.header}
                            // placeholder="Header"
                            // onChange={varientText}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="mobileNumber">Mobile Number</label>
                          <input
                            type="number"
                            id="mobileNumber"
                            name="mobileNumber"
                            required
                            className="form-control"
                            // style={{width: "calc(50% - 10px)"}}
                            // value={inputVarient.header}
                            // placeholder="Header"
                            // onChange={varientText}
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
                            name="pincode"
                            required
                            className="form-control"
                            // style={{width: "calc(50% - 10px)"}}
                            // value={inputVarient.header}
                            // placeholder="Header"
                            // onChange={varientText}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="city">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            className="form-control"
                            // style={{width: "calc(50% - 10px)"}}
                            // value={inputVarient.header}
                            // placeholder="Header"
                            // onChange={varientText}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="addressLine1">Address Line 1</label>
                          <input
                            type="text"
                            name="addressLine1"
                            required
                            className="form-control"
                            // style={{width: "calc(50% - 10px)"}}
                            // value={inputVarient.header}
                            // placeholder="Header"
                            // onChange={varientText}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-12">
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
                      </div>
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
                            // style={{width: "calc(50% - 10px)"}}
                            // value={inputVarient.header}
                            // placeholder="Header"
                            // onChange={varientText}
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
                            // style={{width: "calc(50% - 10px)"}}
                            // value={inputVarient.header}
                            // placeholder="Header"
                            // onChange={varientText}
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
                            // style={{width: "calc(50% - 10px)"}}
                            // value={inputVarient.header}
                            // placeholder="Header"
                            // onChange={varientText}
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
                            name="alternative"
                            required
                            className="form-control"
                            // style={{width: "calc(50% - 10px)"}}
                            // value={inputVarient.header}
                            // placeholder="Header"
                            // onChange={varientText}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div
                        className="btn btn-default text-center"
                        style={{
                          background: "#2f3293",
                          color: "white",
                          width: "calc(20%)",
                          marginBottom: "20px",
                        }}>
                        Add Address
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
                      Create Account
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
