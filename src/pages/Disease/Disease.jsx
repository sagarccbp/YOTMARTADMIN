import React, {useState, useEffect} from "react";

import AddDiseaseModal from "../../components/modals/AddDiseasesModal";
import Dialog from "../../components/modals/DeleteDisease";
import {getDiseases} from "./../../rest/ApiService.js";
import Loader from "../../components/modals/Loader/Loader";
import DataTable from "react-data-table-component";
import {format} from "date-fns";

const Disease = () => {
  const [search, setSearch] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getDiseases(result => {
      setDiseases(result);
      setFilteredDiseases(result.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (diseases && diseases.data) {
      const result = diseases.data.filter(disease => {
        if (disease && disease.name) {
          return disease.name.toLowerCase().match(search.toLowerCase());
        }
      });
      setFilteredDiseases(result);
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
                <h1>Diseases</h1>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active">
                    <a href="/">Nutritionist Dashboard</a>
                  </div>
                  <div className="breadcrumb-item">Diseases</div>
                </div>
              </div>
              <div className="section-body">
                <div className="row">
                  <div className="col-12">
                    <div className="card" style={{border: "none"}}>
                      {/* <div className="card-header">
                  <h4>Category List</h4>
                  <div className="card-header-form"></div>
                </div> */}
                      <div className="card-body">
                        <DataTable
                          title={
                            <h5 className="realfoodcolor">List of Diseases</h5>
                          }
                          className="disease"
                          columns={columns}
                          data={filteredDiseases}
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="400px"
                          actions={<AddDiseaseModal />}
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

export default Disease;
