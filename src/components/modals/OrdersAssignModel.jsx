import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {getAllVendors} from "../../rest/ApiService";
// import {addVarients} from "../../rest/ApiService";

export default function OrdersAssign(props) {
  const [show, setShow] = useState(false);
  const [vendors, setVendors] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getAllVendors(result => {
      setVendors(result.user);
      console.log(result.user);
    });
  }, []);
  console.log("invoice props", props);
  return (
    <>
      {vendors && vendors.length > 0
        ? vendors.map(vendor => {
            return (
              <div key={vendor}>
                <div
                  onClick={handleShow}
                  style={{cursor: "pointer", marginBottom: "10px"}}>
                  {/* <i
          className="fa fa-print"
          style={{color: "#0b0e8e", marginRight: "10px"}}
        /> */}
                  {vendor.fullName}
                </div>
                <Modal size="lg" show={show} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title className="realfoodcolor">
                      Order Assigned
                    </Modal.Title>
                    <div onClick={handleClose}>
                      <i
                        className="fa fa-window-close fa-2x"
                        style={{color: "#0b0e8e"}}></i>
                    </div>
                  </Modal.Header>
                  <Modal.Body>
                    Order Assigned Details
                    <br />
                    Item id {!props.item ? "No Records" : props.item._id}
                    <br />
                    Vendor Name{" "}
                    {!vendor.fullName ? "No Records" : vendor.fullName}
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
                        Ok
                      </button>
                    </Modal.Footer>
                  </Modal.Body>
                </Modal>
              </div>
            );
          })
        : ""}
    </>
  );
}
