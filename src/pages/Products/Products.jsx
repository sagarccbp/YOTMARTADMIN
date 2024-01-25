import React, {useState, useEffect} from "react";
import axios from "axios";
import AddBannersModal from "../../components/modals/AddBannersModal";
import AddProductsModal from "../../components/modals/AddProductsModal";
import EditProductForm from "../../components/modals/EditProductModal";
import EditProductImagesModal from "../../components/modals/EditProductImagesModal";
import Dialog from "../../components/modals/ProductDelete";
import UpdateVariants from "../../components/modals/UpdateVariants";
import DataTable, {defaultThemes} from "react-data-table-component";
import {getItems, API_SERVER, API_KEY} from "../../rest/ApiService";
import AddVariants from "../../components/modals/AddVarientModal";
import {
  CATEGORIES,
  ADD_PRODUCTS,
  SUBCATEGORIES_OF_CATEGORY,
  UPLOADS,
  USER,
} from "../../js/ApiEnds";
import Loader from "../../components/modals/Loader/Loader";

const Products = () => {
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cate, setCate] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getItems(result => {
      setCate(result);
      console.log("result setcate", result);
      setFilteredCategories(result.items);
      setLoading(false);
    });
    console.log("Authorization", localStorage.getItem("Authorization"));
    // console.log("userId", localStorage.getItem("userId"));
  }, []);
  // console.log("process.env.REACT_APP_API_KEY", process.env.REACT_APP_API_KEY);
  useEffect(() => {
    const url =
      API_SERVER +
      CATEGORIES +
      "/" +
      USER +
      "/" +
      localStorage.getItem("userId");
    // console.log("localStorage.getItem(userId)", localStorage.getItem("userId"));

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
        API_KEY: API_KEY,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(jsondata => {
        setCategories(jsondata.categories);
        // console.log(jsondata.categories);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (cate && cate.items) {
      const result = cate.items.filter(cat => {
        // console.log("price details", cat.price);

        if (cat && cat.name && cat.price) {
          return (
            cat.name.toLowerCase().includes(search.toLowerCase()) ||
            cat.price.toString().includes(search)
          );
        }
      });
      setFilteredCategories(result);
      // console.log("search", filteredCategories);
    }
  }, [search]);
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
  };
  const columns = [
    {
      name: "Sl.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
      fixed: true,
      grow: 2,
    },
    {
      name: "Categories and Sub-categories",
      selector: row => row.categories,
      cell: row => (
        <div>
          <span style={{color: "#0b0e8e"}}>Categories: </span>
          {row.categories.length > 0
            ? row.categories.map((fruit, index) => (
                <div className="m-1" key={index}>
                  {fruit.name}
                  <br />
                </div>
              ))
            : "No data"}
          <span style={{color: "#0b0e8e"}}>Sub-categories: </span>

          {row.subCategories.length > 0
            ? row.subCategories.map((fruit, index) => (
                <div className="m-1" key={index}>
                  {fruit.name}
                  <br />
                </div>
              ))
            : "No data"}
        </div>
      ),
      grow: 3,
    },
    {
      name: "Price",
      selector: row => row.price,
      sortable: true,
    },
    {
      name: "Discount",
      selector: row => row.discount,
      sortable: true,
    },
    {
      name: "Image",
      selector: row =>
        !row.image || row.image.length == 0 ? "no images" : row.image,
      cell: row => (
        <div className="d-flex">
          {!row.image || row.image.length == 0
            ? "No images"
            : row.image.map((fruit, index) => (
                <div key={index}>
                  <div className="" key={index}>
                    <div className="m-1">
                      <a
                        className="social-icon-link github"
                        href={
                          !row.image ||
                          !row.image[index] ||
                          !row.image[index].x_l_large ||
                          !row.image[index].x_l_large.url
                            ? "no data"
                            : row.image[index].x_l_large.url
                        }
                        target="_blank"
                        rel="noopener"
                        aria-label="Github">
                        <img
                          align="left"
                          src={
                            !row.image ||
                            !row.image[index] ||
                            !row.image[index].x_l_large ||
                            !row.image[index].x_l_large.url
                              ? "no data"
                              : row.image[index].x_l_large.url
                          }
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
                        href={
                          !row.image ||
                          !row.image[index] ||
                          !row.image[index].l_large ||
                          !row.image[index].l_large.url
                            ? "no data"
                            : row.image[index].l_large.url
                        }
                        target="_blank"
                        rel="noopener"
                        aria-label="Github">
                        <img
                          align="left"
                          src={
                            !row.image ||
                            !row.image[index] ||
                            !row.image[index].l_large ||
                            !row.image[index].l_large.url
                              ? "no data"
                              : row.image[index].l_large.url
                          }
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
                        href={
                          !row.image ||
                          !row.image[index] ||
                          !row.image[index].l_medium ||
                          !row.image[index].l_medium.url
                            ? "no data"
                            : row.image[index].l_medium.url
                        }
                        target="_blank"
                        rel="noopener"
                        aria-label="Github">
                        <img
                          align="left"
                          src={
                            !row.image ||
                            !row.image[index] ||
                            !row.image[index].l_medium ||
                            !row.image[index].l_medium.url
                              ? "no data"
                              : row.image[index].l_medium.url
                          }
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
                        href={
                          !row.image ||
                          !row.image[index] ||
                          !row.image[index].l_small ||
                          !row.image[index].l_small.url
                            ? "no data"
                            : row.image[index].l_small.url
                        }
                        target="_blank"
                        rel="noopener"
                        aria-label="Github">
                        <img
                          align="left"
                          src={
                            !row.image ||
                            !row.image[index] ||
                            !row.image[index].l_small ||
                            !row.image[index].l_small.url
                              ? "no data"
                              : row.image[index].l_small.url
                          }
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
                        href={
                          !row.image ||
                          !row.image[index] ||
                          !row.image[index].x_sm ||
                          !row.image[index].x_sm.url
                            ? "no data"
                            : row.image[index].x_sm.url
                        }
                        target="_blank"
                        rel="noopener"
                        aria-label="Github">
                        <img
                          align="left"
                          src={
                            !row.image ||
                            !row.image[index] ||
                            !row.image[index].x_sm ||
                            !row.image[index].x_sm.url
                              ? "no data"
                              : row.image[index].x_sm.url
                          }
                          style={{
                            height: "25px",
                            width: "100%",
                            border: "1px solid gray",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <br />
                </div>
              ))}
        </div>
      ),
      grow: 4,
    },
    {
      name: "Description",
      selector: row => row.description,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Small Description",
      selector: row => row.smallDescription,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Shipping Information",
      selector: row => row.shippingInfo,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Return Notes",
      selector: (row, index) => row.returnNotes,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Action",
      cell: (row, index) => (
        <div className="d-flex flex-row">
          <button
            className="btn dropdown-toggle btn-default"
            type="button"
            id="dropdownMenuButton4"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{background: "#0b0e8e", color: "white"}}></button>
          <div
            className="dropdown-menu w-100 btn-xs text-left"
            style={{padding: "10px"}}>
            <EditProductForm item={row} />
            <AddVariants item={row} />
            <UpdateVariants item={row} />
            <EditProductImagesModal item={row} />
            <Dialog item={row} />
          </div>
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
                <h1>Products</h1>
                <div className="section-header-breadcrumb">
                  <div className="breadcrumb-item active">
                    <a href="/">Dashboard</a>
                  </div>
                  <div className="breadcrumb-item">Products</div>
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
                        {/* <span className="realfoodcolor Table-heading">
                    List of Products
                  </span> */}
                        <DataTable
                          minHeight="400px"
                          title={
                            <h5 className="realfoodcolor">List of Products</h5>
                          }
                          className="product"
                          columns={columns}
                          data={filteredCategories}
                          pagination
                          fixedHeader
                          customStyles={customStyles}
                          fixedHeaderScrollHeight="400px"
                          actions={<AddProductsModal />}
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

export default Products;
