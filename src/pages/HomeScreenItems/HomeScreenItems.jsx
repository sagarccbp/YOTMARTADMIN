import React, { useState, useEffect } from "react";
import axios from "axios";
import AddHomeScreenItemsModal from "../../components/modals/AddHomeScreenItemsModal";
import DataTable from "react-data-table-component";
import Dialog from "../../components/modals/HomeScreenItemsDelete";
import { getHomeScreenItemsList } from "./../../rest/ApiService.js";

const HomeScreenItems = () => {
  const [search, setSearch] = useState("");
  const [homescreenitems, setHomeScreenItems] = useState([]);
  const [filteredHomeScreenItems, setFilteredHomeScreenItems] = useState([]);

  useEffect(() => {
    getHomeScreenItemsList(result => {
      if (result && result.data) {
        console.log("HSI result", result);
        setHomeScreenItems(result.data);
        setFilteredHomeScreenItems(result.data);
      }
    });
  }, []);

  useEffect(() => {
    // console.log("search info", cate);
    if (homescreenitems) {
      const result = homescreenitems.filter(hsi => {
        if (hsi && hsi.item && hsi.item.name) {
          return hsi.item.name.toLowerCase().match(search.toLowerCase());
        }
      });
      setFilteredHomeScreenItems(result);
      // console.log("search", filteredCategories);
    }
  }, [search]);
  const columns = [
    {
      name: "SL.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "HOME SCREEN ITEMS NAME",
      selector: row => (!row.item ? "No Records" : row.item.name),
      cell: row => <div>{!row.item ? "No Records" : row.item.name}</div>,
      sortable: true,
    },
    {
      name: "LAYOUT TYPE",
      selector: row => (!row.layoutType ? "No Records" : row.layoutType),
      sortable: true,
    },
    {
      name: "ACTION",
      cell: row => (
        <div>
          <Dialog item={row} />
        </div>
      ),
    },
  ];

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Home Screen Items List</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>

            <div className="breadcrumb-item">HomeScreenItems</div>
          </div>
        </div>
        <div className="section-body">
          <div className="row">
            <div className="col-12">
              <div className="card" style={{ border: "none" }}>
                {/* <div className="card-header">
                  <h4>Home Screen Items List</h4>
                  <div className="card-header-form"></div>
                </div> */}
                <div className="card-body">
                  <DataTable
                    title={
                      <h5 className="realfoodcolor">
                        List of Home Screen Items
                      </h5>
                    }
                    className="HomeScreenItems"
                    border
                    columns={columns}
                    data={filteredHomeScreenItems}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    actions={<AddHomeScreenItemsModal />}
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
  );
};

export default HomeScreenItems;
