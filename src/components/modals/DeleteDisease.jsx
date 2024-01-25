import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";

import {API_SERVER} from "../../rest/ApiService";
export default function DeleteDisease(props) {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteDisease = categoryId => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    fetch(
      API_SERVER + "nutritionist/disease/" + props.item._id + "/delete",
      requestOptions
    )
      .then(response => response.json())
      .then(data => {
        window.scrollTo({top: 0, behavior: "smooth"});
        setShow(false);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div onClick={handleShow} style={{marginLeft: "10px"}}>
        <i
          className="fa fa-trash"
          style={{color: "#0b0e8e", cursor: "pointer"}}
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">
            Are you sure, Want to delete Disease?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="col-md-12 text-center">
            <button
              onClick={handleClose}
              type="button"
              className="btn btn-success">
              Close
            </button>

            <button
              style={{margin: "20px"}}
              type="button"
              className="btn btn-danger"
              onClick={() => deleteDisease(props._id)}>
              Delete
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
