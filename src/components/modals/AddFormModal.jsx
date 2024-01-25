import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {addForms, getQuestions} from "../../rest/ApiService";
import Loader from "../../components/modals/Loader/Loader";
import Multiselect from "multiselect-react-dropdown";

export default function AddFormModal() {
  const [show, setShow] = useState(false);

  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState([]);
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
    getQuestions(result => {
      setQuestions(result.data);
    });
  }, []);

  const onChangeFormName = e => {
    setFormName(e.target.value);
  };

  const onSelect = selectedItemList => {
    setShowErrorMessage(false);
    let questionIds = [];
    selectedItemList.map(selectedItem => {
      if (selectedItem && selectedItem._id) {
        questionIds.push(selectedItem._id);
      }
    });
    setQuestionId(questionIds);
  };

  const onRemove = (selectedValue, removedItem) => {
    let filteredQuestionId = questionId.filter(
      quesId => quesId !== removedItem._id
    );
    setQuestionId(filteredQuestionId);
  };

  const submitForm = event => {
    event.preventDefault();

    var regEx = /^[A-Za-z][A-za-z?\s]*$/;
    var regEx1 = /^[A-Za-z0-9][A-za-z0-9_,-.\s]*$/;
    if (formName == " " || formName.length == 0 || !formName.match(regEx)) {
      setError(true);
    } else {
      if (formName && questionId && questionId.length > 0) {
        const body = {
          name: formName,
          questions: questionId,
        };
        addForms(body, result => {
          if (result) {
            window.location.reload();
          }
        });
      } else {
        setShowErrorMessage(true);
        setErrorMessage("Please select at least One Question");
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">Add Form</Modal.Title>
              <div onClick={handleClose}>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{color: "#0b0e8e"}}></i>
              </div>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={submitForm}>
                <div className="form-group mb-2">
                  <label>Enter Form Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    value={formName}
                    onChange={onChangeFormName}
                    placeholder="Enter Form Name"
                  />
                  {error && formName.length <= 0 ? (
                    <lable className="text-danger">
                      Please fill the details correctly..
                    </lable>
                  ) : error &&
                    !formName.match(/^[A-Za-z][A-Za-z_%,-.?\s]*$/) ? (
                    <lable className="text-danger">
                      Please fill the details correctly..
                    </lable>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label>Select Questions</label>
                  <Multiselect
                    style={{
                      backgroundColor: " #fdfdff",
                      borderColor: " #e4e6fc",
                      border: "1px solid #ced4da",
                      borderRadius: ".25rem",
                      transition:
                        "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                    }}
                    onSelect={onSelect}
                    options={questions}
                    displayValue="question"
                    onRemove={onRemove}
                    placeholder="Select Questions"
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
