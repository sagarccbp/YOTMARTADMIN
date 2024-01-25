import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {updateShipRocketId} from "../../rest/ApiService";

export default function ShiprocketPlaceOrder(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [shipRocketId, setShipRocketId] = useState("");

  const changeHandler = e => {
    const value = e.target.value;
    setShipRocketId(value);
  };

  function updateOrderId(e) {
    e.preventDefault();

    updateShipRocketId(
      props.order._id,
      props.item._id._id,
      shipRocketId,
      props.item.quantity,
      result => {
        window.location.reload();
      }
    );
  }

  return (
    <>
      <div
        onClick={handleShow}
        className="btn btn-default btn-sm btn-block realfoodbgcolor realfoodcolorw"
        style={{width: "120px"}}>
        Update Order ID
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">
            Update Order Details
          </Modal.Title>
          <div onClick={handleClose}>
            <i class="fa fa-window-close fa-2x" style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>

        <Modal.Body>
          <label htmlFor="mobile">Paste Order ID</label>
          <form className="needs-validation" onSubmit={updateOrderId}>
            <input
              type="text"
              className="form-control"
              name="orderId"
              tabIndex="2"
              required
              onChange={changeHandler}
            />
            <br />
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-default btn-lg btn-block realfoodbgcolor realfoodcolorw"
                tabIndex="4">
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
