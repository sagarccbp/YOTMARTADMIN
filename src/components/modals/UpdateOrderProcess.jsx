import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { ADD_PRODUCTS } from "../../js/ApiEnds";
import { updateOrder } from "../../rest/ApiService.js";
import { API_SERVER } from "./../../rest/ApiService.js";

export default function UpdateOrderProcess(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setState({
      orderId: props.item._id,
      status: "ORDER_TRANSITION",
    });
  }, [props]);
  const [state, setState] = React.useState({
    orderId: props.item._id,
    status: "ORDER_TRANSITION",
  });

  const updateOrderDetails = (event) => {
    console.log("Update details", state);

    updateOrder(state, (result) => {
      if (result) {
        // window.location.reload();
        window.location.href = `${API_SERVER}myorders`;
      }
      // window.location.reload();
      window.location.href = `${API_SERVER}myorders`;
    });
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(state),
    // };
    // fetch(API_SERVER + "orders/deliveryBoy/changeOrderStatus", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    //     setShow(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  function changeHandler(evt) {
    const value = evt.target.value;
    console.log(value);
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  return (
    <>
      <div
        onClick={handleShow}
        className="btn btn-link text-decoration-none text-dark text-left btn-block"
      >
        Shipped
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-center lh-lg realfoodcolor">
            Are you sure, To Update Order Details to{" "}
            <h3 className="text-success">"SHIPPED"</h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={updateOrderDetails}>
            <div className="form-group">
              <input
                hidden
                type="text"
                name="orderId"
                className="form-control"
                required
                value={state.orderId}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                hidden
                type="text"
                name="status"
                className="form-control"
                required
                value={state.status}
                onChange={changeHandler}
              />
            </div>
            <div className="col-md-12 text-right">
              <button
                style={{ margin: "20px" }}
                type="submti"
                className="btn btn-warning"
              >
                Update Order Status
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
