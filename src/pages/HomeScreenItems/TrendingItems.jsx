import React, {useState, useEffect} from "react";
import axios from "axios";
import AddTrendingItems from "../../components/modals/AddTrendingItems";
import DataTable from "react-data-table-component";
import Dialog from "../../components/modals/TrendingItemsDelete";
import {getTrendingCollections} from "./../../rest/ApiService.js";

const TrendingItems = () => {
  const [search, setSearch] = useState("");
  const [trendingCollections, setTrendingCollections] = useState([]);
  const [filteredTrendingCollections, setFilteredTrendingCollections] =
    useState([]);

  useEffect(() => {
    getTrendingCollections(result => {
      if (result) {
        console.log("TC result", result);
        setTrendingCollections(result);
        setFilteredTrendingCollections(result);
      }
    });
  }, []);

  useEffect(() => {
    // console.log("search info", cate);
    if (trendingCollections) {
      const result = trendingCollections.filter(tc => {
        if (tc && tc.type) {
          return tc.type.toLowerCase().match(search.toLowerCase());
        }
      });
      setFilteredTrendingCollections(result);
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
      name: "TRENDING COLLECTIONS NAME",
      selector: row => (!row.name ? "No Records" : row.name),
      cell: row => <div>{!row.name ? "No Records" : row.name}</div>,
      sortable: true,
    },
    {
      name: "LAYOUT TYPE",
      selector: row => (!row.type ? "No Records" : row.type),
      sortable: true,
    },
    {
      name: "IMAGE",
      selector: row => (!row.image ? "No Records" : row.image),
      cell: row => (
        <div>
          <img
            src={!row.image ? "No Records" : row.image}
            alt="trendingcollections"
            style={{
              height: "25px",
              width: "100%",
              border: "1px solid gray",
            }}
          />
        </div>
      ),
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
          <h1>Trending Items List</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>

            <div className="breadcrumb-item">Trending Items</div>
          </div>
        </div>
        <div className="section-body">
          <div className="row">
            <div className="col-12">
              <div className="card" style={{border: "none"}}>
                {/* <div className="card-header">
                  <h4>Home Screen Items List</h4>
                  <div className="card-header-form"></div>
                </div> */}
                <div className="card-body">
                  <DataTable
                    title={
                      <h5 className="realfoodcolor">List of Trending Items</h5>
                    }
                    className="TrendingItems"
                    border
                    columns={columns}
                    data={filteredTrendingCollections}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    actions={<AddTrendingItems />}
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

export default TrendingItems;
