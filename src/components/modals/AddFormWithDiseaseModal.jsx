import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {
  addForms,
  getDiseases,
  getForms,
  addFormsWithDisease,
} from "../../rest/ApiService";
import Loader from "./Loader/Loader";
import Multiselect from "multiselect-react-dropdown";

export default function AddFormWithDiseaseModal() {
  const [show, setShow] = useState(false);

  const [diseases, setDiseases] = useState([]);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState("");
  const [forms, setForms] = useState([]);
  const [selectedFormIds, setSelectedFormIds] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowErrorMessage(false);
    reload();
  };
  const reload = () => window.location.reload();
  const handleShow = () => setShow(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    getDiseases(result => {
      setDiseases(result.data);
      console.log(result.data, "DISI");
    });
  }, []);
  useEffect(() => {
    getForms(result => {
      setForms(result.data);
    });
  }, []);

  const onSelectDisease = selectedItemList => {
    setSelectedDiseaseId(selectedItemList[0]._id);
  };
  const onSelectForms = selectedItemList => {
    setShowErrorMessage(false);
    let formIds = [];
    selectedItemList.map(selectedItem => {
      if (selectedItem && selectedItem._id) {
        formIds.push(selectedItem._id);
      }
    });
    setSelectedFormIds(formIds);
  };
  const onRemove = (selectedValue, removedItem) => {
    let filteredFormIds = selectedFormIds.filter(
      formId => formId !== removedItem._id
    );
    setSelectedFormIds(filteredFormIds);
  };

  useEffect(() => {
    console.log(selectedFormIds, "FORMS");
    console.log(selectedDiseaseId, "DISEASEID");
  }, [selectedFormIds, selectedDiseaseId]);

  const submitForm = event => {
    event.preventDefault();

    if (selectedDiseaseId && selectedFormIds && selectedFormIds.length > 0) {
      const body = {
        disease: selectedDiseaseId,
        forms: selectedFormIds,
      };
      addFormsWithDisease(body, result => {
        if (result) {
          window.location.reload();
        }
      });
    } else {
      setShowErrorMessage(true);
      setErrorMessage("Please select Disease and  at least One Form");
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">
                Add Form With Disease
              </Modal.Title>
              <div onClick={handleClose}>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{color: "#0b0e8e"}}></i>
              </div>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={submitForm}>
                <div className="form-group">
                  <label>Select Disease</label>
                  <Multiselect
                    style={{
                      backgroundColor: " #fdfdff",
                      borderColor: " #e4e6fc",
                      border: "1px solid #ced4da",
                      borderRadius: ".25rem",
                      transition:
                        "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                    }}
                    onSelect={onSelectDisease}
                    singleSelect="true"
                    options={diseases}
                    displayValue="name"
                    // onRemove={onRemove}
                    placeholder="Select Disease"
                  />
                </div>

                <div className="form-group">
                  <label>Select Forms</label>
                  <Multiselect
                    style={{
                      backgroundColor: " #fdfdff",
                      borderColor: " #e4e6fc",
                      border: "1px solid #ced4da",
                      borderRadius: ".25rem",
                      transition:
                        "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                    }}
                    onSelect={onSelectForms}
                    options={forms}
                    displayValue="name"
                    onRemove={onRemove}
                    placeholder="Select Forms"
                  />
                </div>

                <div className="col-md-12 text-center  d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-default"
                    style={{background: "#0b0e8e", color: "white"}}>
                    Add Form
                  </button>
                  {showErrorMessage ? (
                    <div className="form-group">
                      {" "}
                      <label>*{errorMessage}</label>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </form>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}
