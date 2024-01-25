import React, {useState, useEffect} from "react";

import Dialog from "../../components/modals/DeleteFormsWithDisease";
import {getForms, getFormsWithDiseases} from "./../../rest/ApiService.js";
import Loader from "../../components/modals/Loader/Loader";
import DataTable from "react-data-table-component";
import {format} from "date-fns";
import AddFormWithDiseaseModal from "../../components/modals/AddFormWithDiseaseModal";

const MapFormsWithDisease = () => {
  const [search, setSearch] = useState("");
  const [formsWithDiseases, setFormsWithDiseases] = useState([]);
  const [filteredFormsWithDiseases, setFilteredFormsWithDiseases] = useState(
    []
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getFormsWithDiseases(result => {
      setFormsWithDiseases(result);
      setFilteredFormsWithDiseases(result.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (formsWithDiseases && formsWithDiseases.data) {
      const result = formsWithDiseases.data.filter(disease => {
        if (disease && disease.name) {
          return disease.name.toLowerCase().match(search.toLowerCase());
        }
      });
      setFilteredFormsWithDiseases(result);
    }
  }, [search]);
  const columns = [
    {
      name: "SL.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Diseases",
      selector: row =>
        row && row.disease && row.disease.name ? row.disease.name : "",
      sortable: true,
    },

    {
      name: "Forms",
      selector: row => (!row ? "No Records" : row.forms),
      sortable: true,
      cell: row => (
        <div>
          {row.forms.map((form, index) => {
            return (
              <div key={index}>
                {form && form.name
                  ? `${index + 1}. ${form.name}`
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
                <h1>Map Forms With Disease</h1>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active">
                    <a href="/">Nutritionist Dashboard</a>
                  </div>
                  <div className="breadcrumb-item">Map Forms With Disease</div>
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
                              List of Forms With Disease
                            </h5>
                          }
                          className="forms"
                          columns={columns}
                          data={filteredFormsWithDiseases}
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

export default MapFormsWithDisease;
