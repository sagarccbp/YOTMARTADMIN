import React, {useState, useEffect} from "react";

import AddFormModal from "../../components/modals/AddFormModal";
import Dialog from "../../components/modals/DeleteForm";
import {getForms} from "./../../rest/ApiService.js";
import Loader from "../../components/modals/Loader/Loader";
import DataTable from "react-data-table-component";
import {format} from "date-fns";

const Forms = () => {
  const [search, setSearch] = useState("");
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getForms(result => {
      setForms(result);
      setFilteredForms(result.data);
      console.log(result.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (forms && forms.data) {
      const result = forms.data.filter(form => {
        if (form && form.name) {
          return form.name.toLowerCase().match(search.toLowerCase());
        }
      });
      setFilteredForms(result);
    }
  }, [search]);
  const columns = [
    {
      name: "SL.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
    },

    {
      name: "Questions",
      selector: row => (!row ? "No Records" : row.questions),
      sortable: true,
      cell: row => (
        <div>
          {row.questions.map((question, index) => {
            return (
              <div key={index}>
                {question && question.question
                  ? `${index + 1}. ${question.question}`
                  : "No Records"}
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
                <h1>Forms</h1>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active">
                    <a href="/">Nutritionist Dashboard</a>
                  </div>
                  <div className="breadcrumb-item">Forms</div>
                </div>
              </div>
              <div className="section-body">
                <div className="row">
                  <div className="col-12">
                    <div className="card" style={{border: "none"}}>
                      <div className="card-body">
                        <DataTable
                          title={
                            <h5 className="realfoodcolor">List of Forms</h5>
                          }
                          className="forms"
                          columns={columns}
                          data={filteredForms}
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="400px"
                          actions={<AddFormModal />}
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

export default Forms;
