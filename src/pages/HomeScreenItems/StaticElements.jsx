import React, {useState, useEffect} from "react";
import AddStaticElements from "../../components/modals/AddStaticElements";
import DataTable from "react-data-table-component";
import Dialog from "../../components/modals/StaticElementsDelete";
import {getStaticElements} from "./../../rest/ApiService.js";

const StaticElements = () => {
  const [search, setSearch] = useState("");
  const [staticElements, setStaticElements] = useState([]);
  const [filteredStaticElements, setFilteredStaticElements] = useState([]);

  useEffect(() => {
    getStaticElements(result => {
      if (result && result.items) {
        // console.log("HSI result", result);
        setStaticElements(result.items);
        setFilteredStaticElements(result.items);
      }
    });
  }, []);

  useEffect(() => {
    // console.log("search info", cate);
    if (staticElements) {
      // console.log("staticElements", staticElements);
      const result = staticElements.filter(se => {
        // console.log("se.items.name beda", se);
        if (se && se.name) {
          return se.name.toLowerCase().match(search.toLowerCase());
        }
      });
      setFilteredStaticElements(result);
      // console.log("search", filteredStaticElements);
    }
  }, [search]);
  const columns = [
    {
      name: "SL.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "STATIC ELEMENTS NAME",
      selector: row => (!row.name ? "No Records" : row.name),
      cell: row => <div>{!row.name ? "No Records" : row.name}</div>,
      sortable: true,
    },
    {
      name: "DESCRIPTION",
      selector: row => (!row.description ? "No Records" : row.description),
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
          <h1>Static Elements</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>

            <div className="breadcrumb-item">Static Elements</div>
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
                      <h5 className="realfoodcolor">List of Static Elements</h5>
                    }
                    className="StaticElements"
                    border
                    columns={columns}
                    data={filteredStaticElements}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    actions={<AddStaticElements />}
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

export default StaticElements;
