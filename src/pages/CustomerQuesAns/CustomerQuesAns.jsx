import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import AddFormModal from "../../components/modals/AddFormModal";
import Dialog from "../../components/modals/DeleteForm";
import {
  getForms,
  getCustomerQuesAns,
  getSingleFormQuesAns,
  updateStatus,
} from "../../rest/ApiService.js";
import Loader from "../../components/modals/Loader/Loader";
import DataTable from "react-data-table-component";
import {format} from "date-fns";
import AddFormWithDiseaseModal from "../../components/modals/AddFormWithDiseaseModal";
import PrepareDietChartModal from "../../components/modals/PrepareDietChartModel";

const CustomerQuesAns = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState([]);
  const [customerQuesAns, setCustomerQuesAns] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [filteredCustomerQuesAns, setFilteredCustomerQuesAns] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState();
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const reload = () => window.location.reload();
  const getFormData = (answerId, formId) => {
    getSingleFormQuesAns(answerId, formId, result => {
      console.log("single form", result.forms[0]);
      if (result && result.forms && result.forms.length > 0) {
        setFormData(result.forms[0]);
        handleShow();
      }
    });
  };

  // useEffect(() => {
  //   if(status){
  //     updateStatus()
  //   }
  // }, [status]);

  const onChangeStatus = (e, answerId) => {
    let value = e.target.value;
    let body = {status: value};
    updateStatus(answerId, body, result => {
      console.log("update status", result, "answer id ", answerId);
      if (result.message === "Status changed successfully") {
        reload();
      }
    });
  };

  useEffect(() => {
    getCustomerQuesAns(result => {
      setCustomerQuesAns(result);
      setFilteredCustomerQuesAns(result);
      console.log(result, "DTAA");
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (customerQuesAns && customerQuesAns) {
      const result = customerQuesAns.filter(quesAns => {
        if (
          quesAns &&
          quesAns._id &&
          quesAns._id.user &&
          quesAns._id.user.fullName
        ) {
          return quesAns._id.user.fullName
            .toLowerCase()
            .match(search.toLowerCase());
        }
      });
      setFilteredCustomerQuesAns(result);
    }
  }, [search]);
  const columns = [
    {
      name: "SL.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: row => row.user.fullName,
      sortable: true,
    },
    {
      name: "Disease Name",
      selector: row =>
        row && row.disease && row.disease.name ? row.disease.name : "",
      sortable: true,
    },
    {
      name: "Forms",
      selector: row => row.forms,
      sortable: true,
      cell: row => (
        <div key={row._id}>
          {row && row.forms.length > 0
            ? row.forms.map((form, index) => {
                return (
                  <div key={form.formId}>
                    <div onClick={() => getFormData(row._id, form.formId)}>{`${
                      index + 1
                    }. ${form.formName}`}</div>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header>
                        <Modal.Title className="realfoodcolor">
                          Customer Questions And Answers
                        </Modal.Title>

                        <div onClick={handleClose}>
                          <i
                            className="fa fa-window-close fa-2x"
                            style={{color: "#0b0e8e"}}></i>
                        </div>
                      </Modal.Header>
                      <Modal.Body>
                        <div>
                          {formData &&
                          formData.answers &&
                          formData.answers.length > 0
                            ? formData.answers.map((answer, index) => {
                                return (
                                  <div key={answer._id}>
                                    <div>
                                      {answer && answer.question
                                        ? `${index + 1}. ${answer.question}`
                                        : "No Records"}
                                    </div>
                                    <div>
                                      {answer && answer.answer
                                        ? `Ans. ${answer.answer}`
                                        : "No Records"}
                                    </div>
                                  </div>
                                );
                              })
                            : ""}
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                );
              })
            : ""}
        </div>
      ),
    },

    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "Update Status",
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <div>
          {row.status === "NEW" ? (
            <select
              onChange={e => {
                onChangeStatus(e, row._id);
              }}>
              <option>Select</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DIET_BIENG_PREPARED">Diet Being Prepared</option>
              <option value="DIET_SENT">Diet Sent</option>
            </select>
          ) : (
            ""
          )}
          {row.status === "IN_PROGRESS" ? (
            <select
              onChange={e => {
                onChangeStatus(e, row._id);
              }}>
              <option>Select</option>

              <option value="DIET_BIENG_PREPARED">Diet Being Prepared</option>
              <option value="DIET_SENT"> Diet Sent</option>
            </select>
          ) : (
            ""
          )}
          {row.status === "DIET_BIENG_PREPARED" ? (
            <select
              onChange={e => {
                onChangeStatus(e, row._id);
              }}>
              <option>Select</option>

              <option value="DIET_SENT">Diet Sent</option>
            </select>
          ) : (
            ""
          )}
          {row.status === "DIET_SENT" ? (
            <select disabled>
              <option>Select</option>
            </select>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      name: "Action",
      cell: row => (
        <div className="d-flex flex-row">
          <PrepareDietChartModal item={row} />
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="main-content">
            <section className="section">
              <div className="section-header">
                <h1>Customer Ques & Ans</h1>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active">
                    <a href="/">Nutritionist Dashboard</a>
                  </div>
                  <div className="breadcrumb-item">Customer Ques & Ans</div>
                </div>
              </div>
              <div className="section-body">
                <div className="row">
                  <div className="col-12">
                    <div className="card" style={{border: "none"}}>
                      <div className="card-body">
                        <DataTable
                          title={
                            <h5 className="realfoodcolor">
                              List of Customer Ques & Ans
                            </h5>
                          }
                          className="forms"
                          columns={columns}
                          data={filteredCustomerQuesAns}
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="400px"
                          actions={<AddFormWithDiseaseModal />}
                          subHeader
                          subHeaderComponent={
                            <div>
                              <input
                                type="text"
                                className="w-25 form-control form-control-sm Search1 d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block"
                                placeholder="Type to search..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                              />
                              <input
                                type="text"
                                className="w-25 form-control form-control-sm Search2 d-block d-sm-none"
                                placeholder="Type to search..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                              />
                            </div>
                          }
                          subHeaderAlign="left"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerQuesAns;
