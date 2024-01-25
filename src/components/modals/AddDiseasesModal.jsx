import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";

import {addDiseases} from "../../rest/ApiService";

export default function AddDiseaseModal() {
  const [show, setShow] = useState(false);
  const [disease, setDisease] = useState("");
  const [error, setError] = useState(false);
  const reload = () => window.location.reload();
  const handleClose = () => {
    setShow(false);
    setDisease("");
    reload();
  };
  const handleShow = () => setShow(true);

  const onChangeDiseaseName = e => {
    setDisease(e.target.value);
    setError(false);
  };

  const createDiseases = event => {
    event.preventDefault();
    var regEx = /^[A-Za-z][A-za-z\s]*$/;
    if (disease == " " || disease.length == 0 || !disease.match(regEx)) {
      setError(true);
    } else {
      if (disease) {
        const body = {
          name: disease,
        };
        addDiseases(body, result => {
          if (result) {
            window.location.reload();
          }
        });
      }
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">Add Disease</Modal.Title>
          <div onClick={handleClose}>
            <i class="fa fa-window-close fa-2x" style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>

        <Modal.Body>
          <form className="form-data" onSubmit={createDiseases}>
            <div className="form-group">
              <label>Enter Disease Name</label>
              <input
                type="text"
                name="name"
                required
                className="form-control mb-4"
                value={disease}
                onChange={onChangeDiseaseName}
                placeholder="Disease Name"
              />
              {(error && disease.length <= 0) ||
              (error && !disease.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                <label className="text-danger">
                  Please fill the details correctly..
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-12 text-right">
              <button
                type="submit"
                className="btn btn-default"
                style={{background: "#0b0e8e", color: "white"}}>
                Add Disease
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
