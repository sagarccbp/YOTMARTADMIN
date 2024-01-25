import React, {useState, useEffect} from "react";
import AddAllHomeScreenItemsModal from "../../components/modals/AddAllHomeScreenItemsModal";
import DataTable from "react-data-table-component";
import Dialog from "../../components/modals/HomeScreenItemsDelete";
import {getAllHomeScreenItemsList} from "./../../rest/ApiService.js";
import Loader from "../../components/modals/Loader/Loader";

const AllHomeScreenItems = () => {
  const [search, setSearch] = useState("");
  const [homeScreenItems, setHomeScreenItems] = useState([]);
  const [filteredHomeScreenItems, setFilteredHomeScreenItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getAllHomeScreenItemsList(result => {
      if (result) {
        // console.log("HSI result", result);
        setHomeScreenItems(result);
        setFilteredHomeScreenItems(result);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    // console.log("search info", cate);
    if (homeScreenItems) {
      const result = homeScreenItems.filter(hsi => {
        if (hsi && hsi.name) {
          return hsi.name.toLowerCase().match(search.toLowerCase());
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
      name: "DISPLAY TYPE",
      selector: row =>
        !row && !row.displayType ? "No Records" : row.displayType,
      cell: row => (
        <div>{!row && !row.displayType ? "No Records" : row.displayType}</div>
      ),
      sortable: true,
    },
    {
      name: "DISPLAY NAME",
      selector: row => (!row ? "No Records" : row.name),
      sortable: true,
    },
    {
      name: "HOME ITEMS LIST",
      selector: row => (!row ? "No Records" : row.homeItems),
      cell: row => (
        <div>
          {row.homeItems.map((homeItem, index) => {
            return (
              <div key={index}>
                {index + 1}.{" "}
                {homeItem && homeItem.listObject && homeItem.listObject.name
                  ? homeItem.listObject.name
                  : null}
              </div>
            );
          })}
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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="main-content">
            <section className="section">
              <div className="section-header">
                <h1> All Home Screen Items List</h1>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active">
                    <a href="/">Dashboard</a>
                  </div>

                  <div className="breadcrumb-item">AllHomeScreenItems</div>
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
                            <h5 className="realfoodcolor">
                              List of All Home Screen Items
                            </h5>
                          }
                          className="HomeScreenItems"
                          border
                          columns={columns}
                          data={filteredHomeScreenItems}
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="400px"
                          actions={<AddAllHomeScreenItemsModal />}
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

export default AllHomeScreenItems;
