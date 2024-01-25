import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {ADD_PRODUCTS} from "../../js/ApiEnds";
import {API_SERVER} from "../../rest/ApiService";

export default function TrackOrderModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setState({
      orderId: props.item._id,
    });
  }, [props]);
  const [state, setState] = React.useState({
    Order_id: props.item._id,
  });
  //   console.log(" details", props.item._id);

  const TrackOrderDetails = event => {
    console.log(alert("TrackOrderDetails function"));
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
        className="btn btn-link text-decoration-none text-dark text-left btn-block">
        Track Order
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">
            Track Order Details
          </Modal.Title>
          <div onClick={handleClose}>
            <i class="fa fa-window-close fa-2x" style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={TrackOrderDetails}>
            <div className="form-group">
              <input
                readOnly
                type="text"
                name="orderId"
                className="form-control"
                required
                value={state.orderId}
                onChange={changeHandler}
              />
            </div>

            <div className="col-md-12 text-right">
              <button
                style={{margin: "20px"}}
                type="submti"
                className="btn btn-warning">
                Track Order
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
