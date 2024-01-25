import React, {useState, useEffect} from "react";

import AddQuestionsModal from "../../components/modals/AddQuestionsModal";
import Dialog from "../../components/modals/DeleteQuestion";
import {getQuestions} from "./../../rest/ApiService.js";
import Loader from "../../components/modals/Loader/Loader";
import DataTable from "react-data-table-component";
import {format} from "date-fns";

const Questions = () => {
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getQuestions(result => {
      setQuestions(result);
      setFilteredQuestions(result.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (questions && questions.data) {
      const result = questions.data.filter(question => {
        if (question && question.question) {
          return question.question.toLowerCase().match(search.toLowerCase());
        }
      });
      setFilteredQuestions(result);
    }
  }, [search]);
  const columns = [
    {
      name: "SL.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Questions",
      selector: row => row.question,
      sortable: true,
    },
    {
      name: "Answer Type",
      selector: row => row.answerType.replace("_", " "),
      sortable: true,
    },
    {
      name: "Answer Hint",
      selector: row => (!row ? "No Records" : row.answerHint),
      sortable: true,
      cell: row => (
        <div>
          {row.answerHint.split(",").map((ansHint, index) => {
            return (
              <div key={index}>
                {ansHint ? `${index + 1}. ${ansHint}` : "No Records"}
              </div>
            );
          })}
        </div>
      ),
    },

    {
      name: "Created Time",
      selector: row => format(new Date(`${row.createdAt}`), "dd/MM/yyyy"),
      sortable: true,
    },
    {
      name: "Action",
      cell: row => (
        <div className="d-flex flex-row">
          <Dialog item={row} />
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
                <h1>Questions</h1>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active">
                    <a href="/">Nutritionist Dashboard</a>
                  </div>
                  <div className="breadcrumb-item">Questions</div>
                </div>
              </div>
              <div className="section-body">
                <div className="row">
                  <div className="col-12">
                    <div className="card" style={{border: "none"}}>
                      <div className="card-body">
                        <DataTable
                          title={
                            <h5 className="realfoodcolor">List of Questions</h5>
                          }
                          className="questions"
                          columns={columns}
                          data={filteredQuestions}
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="400px"
                          actions={<AddQuestionsModal />}
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

export default Questions;
