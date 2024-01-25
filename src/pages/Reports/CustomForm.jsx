import React, {useState, useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";

export default function CustomReports(props) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const handleChange = e => {
    const value = e.target.value;
    setFromDate({
      ...fromDate,
      [e.target.name]: value,
    });
    setToDate({
      ...toDate,
      [e.target.name]: value,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(fromDate, toDate);
  };
  return (
    <div className="row pl-3">
      <form onSubmit={handleSubmit}>
        <div className="d-inline-flex">
          <div className="mr-3">
            <h6>From Date</h6>

            <Form.Control
              autoFocus
              type="date"
              name="fromDate"
              onChange={handleChange}></Form.Control>
          </div>
          <div>
            <h6>To Date</h6>
            <Form.Control
              type="date"
              name="toDate"
              onChange={handleChange}></Form.Control>
          </div>

          <div className="col-auto mt-4">
            <button
              type="submit"
              className="btn btn-lg btn-default"
              style={{background: "#0b0e8e", color: "white"}}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
