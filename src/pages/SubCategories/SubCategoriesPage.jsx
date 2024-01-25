import React, {useState, useEffect} from "react";
import axios from "axios";
import AddSubCategoriesModal from "../../components/modals/AddSubCategoriesModal";
import EditSubCategoryForm from "../../components/modals/EditSubCategoryForm";
import Dialog from "../../components/modals/SubCategoryDelete";
import {getSubCategories} from "./../../rest/ApiService.js";
import Loader from "../../components/modals/Loader/Loader";

import DataTable from "react-data-table-component";

const SubCategoriesPage = () => {
  const [search, setSearch] = useState("");
  const [cate, setCate] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getSubCategories(result => {
      setCate(result);
      setFilteredCategories(result.subCategory);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // console.log("search info", cate);
    if (cate && cate.subCategory) {
      const result = cate.subCategory.filter(cat => {
        if (cat && cat.name) {
          return cat.name.toLowerCase().match(search.toLowerCase());
        }
      });
      setFilteredCategories(result);
      console.log("search", filteredCategories);
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
      cell: row => row.name,
      sortable: true,
    },
    {
      name: "Image",
      selector: row => row.name,
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
          <EditSubCategoryForm item={row} />
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
                <h1>Subcategories</h1>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active">
                    <a href="/">Dashboard</a>
                  </div>
                  <div className="breadcrumb-item">Subcategories</div>
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
                              List of Subcategories
                            </h5>
                          }
                          className="subcategory"
                          columns={columns}
                          data={filteredCategories}
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="400px"
                          actions={<AddSubCategoriesModal />}
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

export default SubCategoriesPage;
