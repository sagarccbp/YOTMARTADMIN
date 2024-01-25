import React, {useState, useEffect} from "react";
import axios from "axios";
import AddBannersModal from "../../components/modals/AddBannersModal";
import AddCategoriesModal from "../../components/modals/AddCategoriesModal";
import EditCategoryForm from "../../components/modals/EditCategoryModal";
import Dialog from "../../components/modals/CategoryDelete";
import {getCategories} from "./../../rest/ApiService.js";
import Loader from "../../components/modals/Loader/Loader";
import DataTable from "react-data-table-component";

const CategoriesPage = () => {
  const [search, setSearch] = useState("");
  const [cate, setCate] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getCategories(result => {
      setCate(result);
      setFilteredCategories(result.categories);
      setLoading(false);
      // console.log("result.categories", result.categories);
    });
  }, []);

  useEffect(() => {
    if (cate && cate.categories) {
      const result = cate.categories.filter(cat => {
        if (cat && cat.name) {
          return cat.name.toLowerCase().match(search.toLowerCase());
        }
      });
      setFilteredCategories(result);
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
      grow: 2,
    },
    {
      name: "Image",
      selector: row => row.image,
      cell: row => (
        <div className="row">
          <div className="m-1">
            <a
              className="social-icon-link github"
              href={row.image.x_l_large.url}
              target="_blank"
              rel="noopener"
              aria-label="Github"
            >
              <img
                src={row.image.x_l_large.url}
                style={{
                  height: "25px",
                  width: "100%",
                  border: "1px solid gray",
                }}
              />
            </a>
          </div>
          <div className="m-1">
            <a
              className="social-icon-link github"
              href={row.image.l_large.url}
              target="_blank"
              rel="noopener"
              aria-label="Github"
            >
              <img
                src={row.image.l_large.url}
                style={{
                  height: "25px",
                  width: "100%",
                  border: "1px solid gray",
                }}
              />
            </a>
          </div>
          <div className="m-1">
            <a
              className="social-icon-link github"
              href={row.image.l_medium.url}
              target="_blank"
              rel="noopener"
              aria-label="Github"
            >
              <img
                src={row.image.l_medium.url}
                style={{
                  height: "25px",
                  width: "100%",
                  border: "1px solid gray",
                }}
              />
            </a>
          </div>
          <div className="m-1">
            <a
              className="social-icon-link github"
              href={row.image.l_small.url}
              target="_blank"
              rel="noopener"
              aria-label="Github"
            >
              <img
                src={row.image.l_small.url}
                style={{
                  height: "25px",
                  width: "100%",
                  border: "1px solid gray",
                }}
              />
            </a>
          </div>
          <div className="m-1">
            <a
              className="social-icon-link github"
              href={row.image.x_sm.url}
              target="_blank"
              rel="noopener"
              aria-label="Github"
            >
              <img
                src={row.image.x_sm.url}
                style={{
                  height: "25px",
                  width: "100%",
                  border: "1px solid gray",
                }}
              />
            </a>
          </div>
        </div>
      ),
      grow: 3,
    },
    {
      name: "Description",
      selector: row => row.description,
      sortable: true,
      wrap: true,
    },
    {
      name: "Small Description",
      selector: row => row.smallDescription,
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",
      cell: row => (
        <div className="d-flex flex-row">
          <EditCategoryForm item={row} />
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
                <h1>Categories</h1>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active">
                    <a href="/">Dashboard</a>
                  </div>
                  <div className="breadcrumb-item">Categories</div>
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
                            <h5 className="realfoodcolor">
                              List of Categories
                            </h5>
                          }
                          className="category"
                          columns={columns}
                          data={filteredCategories}
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="400px"
                          actions={<AddCategoriesModal />}
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

export default CategoriesPage;
