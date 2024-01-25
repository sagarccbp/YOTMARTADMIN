import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";

// import {addVarients} from "../../rest/ApiService";

export default function AddVariants(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("invoice props", props);
  return (
    <>
      <div
        onClick={handleShow}
        style={{cursor: "pointer", marginBottom: "10px"}}>
        <i
          className="fa fa-print"
          style={{color: "#0b0e8e", marginRight: "10px"}}
        />
        Invoice
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">Invoice</Modal.Title>
          <div onClick={handleClose}>
            <i
              className="fa fa-window-close fa-2x"
              style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          Invoice details
          <br />
          Item id {!props.item ? "No Records" : props.item._id}
          <br />
          <Modal.Footer>
            <button
              data-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              className="btn btn-default ml-1"
              style={{background: "#0b0e8e", color: "white"}}
              onClick="">
              Print
            </button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
