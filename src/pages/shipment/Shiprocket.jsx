import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";

export default function ShipRocket() {
  const columns = [
    {
      name: "SL.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      wrap: true,
    },
    {
      name: "Small Description",
      selector: (row) => row.smallDescription,
      sortable: true,
      wrap: true,
    },
  ];

  const filteredCategories = useState([
    {
      name: "Test 1",
      description: "Test DEscription",
      smallDescription: "Small Description",
    },
    {
      name: "Test 1",
      description: "Test DEscription",
      smallDescription: "Small Description",
    },
    {
      name: "Test 1",
      description: "Test DEscription",
      smallDescription: "Small Description",
    },
  ]);

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Ship Rocket Settings</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>
            <div className="breadcrumb-item">Ship rocket</div>
          </div>
        </div>
        <div className="section-body">
          <div className="row">
            <div className="col-12">
              <div className="card" style={{ border: "none" }}>
                <div className="card-body">
                  <DataTable
                    data={filteredCategories}
                    columns={columns}
                    fixedHeaderScrollHeight="400px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
