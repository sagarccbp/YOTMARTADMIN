import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {addQuestions} from "../../rest/ApiService";
import Loader from "../../components/modals/Loader/Loader";
import Multiselect from "multiselect-react-dropdown";

export default function AddQuestionsModal() {
  const [show, setShow] = useState(false);

  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState("");
  const [hint, setHint] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
    reload();
  };
  const reload = () => window.location.reload();
  const handleShow = () => setShow(true);

  const [error, setError] = useState(false);

  const answerTypeOptions = [
    {
      optionValue: "TEXT_AREA",
      optionKey: "Text Area",
    },
    {
      optionValue: "RADIO_BUTTON",
      optionKey: "Radio Button",
    },
    {
      optionValue: "DROP_DOWN",
      optionKey: "Drop Down",
    },
    {
      optionValue: "CHECK_BOX",
      optionKey: "Check Box",
    },
  ];

  const onChangeQuestion = e => {
    setQuestion(e.target.value);
    console.log(e.target.value);
  };
  const onChangeHint = e => {
    setHint(e.target.value);
    console.log(e.target.value);
  };
  const onSelect = selectedItemList => {
    setAnswerType(selectedItemList[0].optionValue);
  };

  const submitQuestion = event => {
    event.preventDefault();
    var regEx = /^[A-Za-z][A-za-z?\s]*$/;
    var regEx1 = /^[A-Za-z0-9][A-za-z0-9_,-.\s]*$/;
    if (
      question == " " ||
      question.length == 0 ||
      !question.match(regEx)
      //   hint == " " ||
      //   hint.length == 0 ||
      //   !hint.match(regEx1)
    ) {
      setError(true);
    } else {
      if (question && answerType) {
        const body = {
          question: question,
          answerType: answerType,
          answerHint: hint,
        };
        addQuestions(body, result => {
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">Add Question</Modal.Title>
              <div onClick={handleClose}>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{color: "#0b0e8e"}}></i>
              </div>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={submitQuestion}>
                <div className="form-group mb-2">
                  <label>Enter Question</label>
                  <textarea
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    value={question}
                    onChange={onChangeQuestion}
                    placeholder="Enter Question"
                  />
                  {error && question.length <= 0 ? (
                    <lable className="text-danger">
                      Please fill the details correctly..
                    </lable>
                  ) : error &&
                    !question.match(/^[A-Za-z][A-Za-z_%,-.?\s]*$/) ? (
                    <lable className="text-danger">
                      Please fill the details correctly..
                    </lable>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label>Select Answer Type</label>
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
                    options={answerTypeOptions}
                    displayValue="optionKey"
                    // onRemove={onRemove}
                    singleSelect="true"
                    placeholder="Select Answer Type"
                  />
                  {/* {error && selectedCategories.length <= 0 ? (
                    <lable className="text-danger">
                      Please fill the details correctly..
                    </lable>
                  ) : (
                    ""
                  )} */}
                </div>
                {answerType === "RADIO_BUTTON" ||
                answerType === "CHECK_BOX" ||
                answerType === "DROP_DOWN" ? (
                  <div className="form-group mb-2">
                    <label>Enter the options with comma separated</label>
                    <textarea
                      type="text"
                      name="name"
                      className="form-control"
                      required
                      value={hint}
                      onChange={onChangeHint}
                      placeholder="Enter Hint"
                    />
                    {/* {error && hint.length <= 0 ? (
                      <lable className="text-danger">
                        Please fill the details correctly..
                      </lable>
                    ) : error &&
                      !hint.match(/^[A-Za-z0-9][A-za-z0-9_,-.\s]*$/) ? (
                      <lable className="text-danger">
                        Please fill the details correctly..
                      </lable>
                    ) : (
                      ""
                    )} */}
                  </div>
                ) : null}

                <div className="col-md-12 text-center  d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-default"
                    style={{background: "#0b0e8e", color: "white"}}>
                    Add Question
                  </button>
                </div>
              </form>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}
