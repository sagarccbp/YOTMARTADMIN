import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {blueDartLocationFinder, generateBDWayBill} from "../../rest/ApiService";

export default function ShippingModal(props) {
  const [show, setShow] = useState(false);
  const [locationDetails, setLocationDetails] = useState();
  const [selectedShippingPartner, setSelectedShippingPartner] = useState();
  console.log(props, "PROPS");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    blueDartLocationFinder(props.item.address.pin, result => {
      setLocationDetails(result);
      console.log("result setcate", result);
    });
  }, []);

  const onClickShippingPartner = () => {
    if (selectedShippingPartner === "BlueDart") {
      generateBDWayBill(result => {
        console.log(result, "WAY");
      });
    }
  };

  return (
    <>
      <div
        onClick={handleShow}
        style={{cursor: "pointer", marginBottom: "10px"}}>
        <i
          className="fa fa-shipping-fast"
          style={{color: "#0b0e8e", marginRight: "10px"}}
        />
        Shipping
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">Shipping Partners</Modal.Title>
          <div onClick={handleClose}>
            <i
              className="fa fa-window-close fa-2x"
              style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          Please Select Shipping Partner
          <div className="shipping-partners-container">
            <div className="shipping-partner-container">
              <input
                type="radio"
                id="bluedart"
                name="shipping_partner"
                value="BlueDart"
                onChange={e => setSelectedShippingPartner(e.target.value)}
              />
               {" "}
              <label className="shipping-partner-label" htmlFor="bluedart">
                Blue Dart
              </label>
              <p className="shipping-partner-delivery-status">
                {locationDetails &&
                locationDetails.GetServicesforPincodeAndProductResult &&
                locationDetails.GetServicesforPincodeAndProductResult.PinCode
                  ? `Delivery is Available to ${locationDetails.GetServicesforPincodeAndProductResult.PinCode} PinCode`
                  : `Delivery is Not Available`}
              </p>
            </div>
            <div className="shipping-partner-container">
              <input
                type="radio"
                id="xpressbees"
                name="shipping_partner"
                value="Xpressbees"
              />
               {" "}
              <label className="shipping-partner-label" htmlFor="xpressbees">
                Xpressbees
              </label>
            </div>
            <div className="shipping-partner-container">
              <input
                type="radio"
                id="dtdc"
                name="shipping_partner"
                value="DTDC"
              />
               {" "}
              <label className="shipping-partner-label" htmlFor="dtdc">
                DTDC
              </label>
            </div>
            <div className="shipping-partner-container">
              <input
                type="radio"
                id="delhivery"
                name="shipping_partner"
                value="Delhivery"
              />
               {" "}
              <label className="shipping-partner-label" htmlFor="delhivery">
                Delhivery
              </label>
            </div>
            <div className="shipping-partner-container">
              <input
                type="radio"
                id="ecomexpress"
                name="shipping_partner"
                value="EcomExpress"
              />
               {" "}
              <label className="shipping-partner-label" htmlFor="ecomexpress">
                Ecom Express
              </label>
            </div>
          </div>
          <Modal.Footer>
            <button
              data-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              className="btn btn-default ml-1"
              style={{background: "#0b0e8e", color: "white"}}
              onClick={onClickShippingPartner}>
              Submit
            </button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
