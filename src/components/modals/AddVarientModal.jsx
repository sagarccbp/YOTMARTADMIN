import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";

import {addVarients} from "../../rest/ApiService";

export default function AddVariants(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [iserror, setIsError] = useState(false);
  const [inputVarr, setInputVarr] = useState([]);
  const [inputVarient, setInputVarient] = useState({
    name: "",
    discount: "",
    description: "",
    price: "",
    isStockAvailable: true,
  });
  function varientNumber(e) {
    if (e.target.value.match("^[0-9]*$") != null) {
      setInputVarient({
        ...inputVarient,
        [e.target.name]: e.target.value,
      });
    } else {
      setInputVarient("");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      // toast("Please enter positive number");
    }
  }
  function varientText(e) {
    var regEx1 = /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/;
    if (e.target.value.match(regEx1)) {
      setInputVarient({
        ...inputVarient,
        [e.target.name]: e.target.value,
      });
    } else {
      setInputVarient("");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      // toast("Please enter positive number");
    }
  }
  const handleDelete = name => {
    var index = inputVarr
      .map(function (e) {
        return e.name;
      })
      .indexOf(name);
    inputVarr.splice(index, 1);
    setInputVarient(inputVarr => inputVarr + 1);
  };
  function addvarientText() {
    if (
      inputVarient &&
      inputVarient.name &&
      inputVarient.description &&
      inputVarient.price &&
      inputVarient.discount &&
      parseInt(inputVarient.price) >= parseInt(inputVarient.discount)
    ) {
      setInputVarr([
        ...inputVarr,
        {
          name: inputVarient.name,
          description: inputVarient.description,
          price: inputVarient.price,
          isStockAvailable: true,
          discount: inputVarient.discount,
        },
      ]);
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      //toast("Please fill all the details to add new varient");
    }
    setInputVarient({
      ...inputVarient,
      name: "",
      discount: "",
      description: "",
      price: "",
      isStockAvailable: "",
    });
  }

  const addVarient = () => {
    addVarients(props.item._id, inputVarr, result => {
      debugger;
      if (result) {
        window.location.reload();
      }
    });
  };
  return (
    <>
      <div
        onClick={handleShow}
        style={{cursor: "pointer", marginBottom: "10px"}}>
        <i
          className="fa fa-plus-circle"
          style={{color: "#0b0e8e", marginRight: "10px"}}
        />
        Variants
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">Add Variants</Modal.Title>
          <div onClick={handleClose} style={{cursor: "pointer"}}>
            <i
              className="fa fa-window-close fa-2x"
              style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
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
                  Name
                </th>
                <th
                  scope="col"
                  className="p-1 text-center"
                  style={{height: "15px"}}>
                  Discount
                </th>
                <th
                  scope="col"
                  className="p-1 text-center"
                  style={{height: "15px"}}>
                  Description
                </th>
                <th
                  scope="col"
                  className="p-1 text-center"
                  style={{height: "15px"}}>
                  Price
                </th>
                {/* <th
                          scope="col"
                          className="p-1 text-center"
                          style={{ height: "15px" }}
                        >
                          IS Stock Available
                        </th> */}
                <th
                  scope="col"
                  className="p-1 text-center"
                  style={{height: "15px"}}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {inputVarr && inputVarr.length > 0
                ? inputVarr.map(vitem => (
                    <tr>
                      <td className="p-1 text-center" style={{height: "15px"}}>
                        {vitem.name}
                      </td>
                      <td className="p-1 text-center" style={{height: "15px"}}>
                        {vitem.discount}
                      </td>
                      <td className="p-1 text-center" style={{height: "15px"}}>
                        {vitem.description}
                      </td>
                      <td className="p-1 text-center" style={{height: "15px"}}>
                        {vitem.price}
                      </td>

                      <td className="p-1 text-center" style={{height: "15px"}}>
                        <div>
                          <a
                            className="btn btn-default"
                            style={{
                              background: "#ffffff",
                              color: "white",
                              margin: "0px",
                              padding: "0px",
                            }}
                            onClick={() => handleDelete(vitem.name)}>
                            <i
                              className="fa fa-trash fa-lg"
                              style={{
                                color: "#0b0e8e",
                                margin: "0px",
                                padding: "0px",
                              }}
                            />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                : ""}

              <tr>
                <td>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-sm p-1 text-center"
                    value={inputVarient.name}
                    placeholder="Name"
                    onChange={varientText}
                  />
                </td>
                <td>
                  <div className="d-flex justify-content-center">
                    <div>
                      <input
                        type="number"
                        min="0"
                        max={inputVarient.price}
                        name="discount"
                        className="form-control form-control-sm p-1 text-center"
                        placeholder="discount"
                        value={inputVarient.discount}
                        onChange={varientNumber}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    className="form-control form-control-sm p-1 text-center"
                    value={inputVarient.description}
                    placeholder="Description"
                    onChange={varientText}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    className="form-control form-control-sm p-1 text-center"
                    value={inputVarient.price}
                    placeholder="Price"
                    onChange={varientNumber}
                  />
                </td>

                <td className="text-center">
                  <div>
                    <a
                      className="btn btn-default"
                      style={{
                        background: "#ffffff",
                        color: "white",
                        margin: "0px",
                        padding: "0px",
                      }}
                      onClick={addvarientText}>
                      <i
                        className="fa fa-plus-circle fa-2x"
                        style={{
                          color: "#0b0e8e",
                          margin: "0px",
                          padding: "0px",
                        }}
                      />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {iserror && inputVarient.name == "" ? (
            <div class="alert text-danger m-2 p-0">
              Please validate the variants value.
            </div>
          ) : iserror && inputVarient.discount <= inputVarient.price ? (
            <div class="alert text-danger m-2 p-0">
              Please Check the discount price, Discount price should be lesser
              than acutal price
            </div>
          ) : iserror && inputVarient.description == "" ? (
            <div class="alert text-danger m-2 p-0">
              Please validate the variants value.
            </div>
          ) : iserror && inputVarient.discount <= inputVarient.price ? (
            <div class="alert text-danger m-2 p-0">
              Please validate the variants value.
            </div>
          ) : iserror ? (
            <div className="alert text-danger m-2 p-0">
              Please fill all the variant details correctly.
            </div>
          ) : (
            ""
          )}
          <Modal.Footer>
            <button
              data-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              className="btn btn-default ml-1"
              style={{background: "#0b0e8e", color: "white"}}
              onClick={addVarient}>
              Submit
            </button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
