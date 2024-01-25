import React, {useState, useEffect} from "react";

import Dialog from "../../components/modals/DeleteQuestion";
import {getAllVendors, getAllSuppliers} from "./../../rest/ApiService.js";
import Loader from "../../components/modals/Loader/Loader";
import DataTable from "react-data-table-component";
import {format} from "date-fns";
import AddSupplierModal from "../../components/modals/AddSupplierModal.jsx";

const Suppliers = () => {
  const [search, setSearch] = useState("");

  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAllSuppliers(result => {
      setVendors(result);
      setFilteredVendors(result.user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (vendors && vendors.user) {
      const result = vendors.user.filter(vendor => {
        if (vendor && vendor.fullName) {
          return vendor.fullName.toLowerCase().match(search.toLowerCase());
        }
      });
      setFilteredVendors(result);
    }
  }, [search]);
  const columns = [
    {
      name: "SL.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Vendor Name",
      selector: row => row.fullName,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: row => row.mobileNumber,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => (!row ? "No Records" : row.email),
      sortable: true,
    },

    {
      name: "Created Time",
      selector: row => format(new Date(`${row.createdDate}`), "dd/MM/yyyy"),
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
                <h1>Suppliers</h1>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active">
                    <a href="/">Vendors Dashboard</a>
                  </div>
                  <div className="breadcrumb-item">Suppliers</div>
                </div>
              </div>
              <div className="section-body">
                <div className="row">
                  <div className="col-12">
                    <div className="card" style={{border: "none"}}>
                      <div className="card-body">
                        <DataTable
                          title={
                            <h5 className="realfoodcolor">List of Suppliers</h5>
                          }
                          className="questions"
                          columns={columns}
                          data={filteredVendors}
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="400px"
                          actions={<AddSupplierModal />}
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

export default Suppliers;
