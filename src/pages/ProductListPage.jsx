import React, { Component } from "react";
import EditProductForm from "../components/modals/EditProductModal";

import { ADD_PRODUCTS, GET_MY_OWN_PRODUCTS, UPLOADS } from "../js/ApiEnds";
import { API_SERVER } from "../rest/ApiService";
import Pagination from "../js/pagination/utility";
class ProductListPage extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      isLoading: true,
      filteredData: [],
      pages: [],
      currentPage: 1,
      pageLimit: 5,
      paginationData: [],
    };
    this.fetchAllProducts.bind(this);
    this.filterData = this.filterData.bind(this);
    this.onSelectPageLimit = this.onSelectPageLimit.bind(this);
  }

  componentDidMount() {
    this.fetchAllProducts();
  }

  onSelectPageLimit(event) {
    var thenum = event.target.value.replace(/[^0-9]/g, "");
    this.setState(
      {
        pageLimit: thenum,
      },
      () => {
        this.initPagination();
      }
    );
  }

  filterData(event) {
    var query = event.target.value;
    if (this.state.data.items) {
      var items = this.state.data.items;

      if (query) {
        var myFilteredData = items.filter((product) => {
          return product.name.includes(query);
        });

        this.setState(
          {
            filteredData: myFilteredData,
          },
          () => {
            console.log("Filtered data : ", this.state.filteredData);
          }
        );
      } else {
        this.setState(
          {
            filteredData: [],
          },
          () => {
            console.log("Filtered data : ", this.state.filteredData);
          }
        );
      }
    }
  }

  fetchAllProducts() {
    this.setState({ isLoading: true });
    const url =
      API_SERVER + GET_MY_OWN_PRODUCTS + "/" + localStorage.getItem("userId");
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((jsondata) => {
        console.log(jsondata + " User Data found here.. ");
        if (jsondata && jsondata.items) {
          console.log(jsondata);
          this.setState(
            {
              data: jsondata,
              isLoading: false,
            },
            () => {
              this.initPagination();
            }
          );
        }
      })
      .catch((error) => {
        console.log(this.state.paginationData);
        this.setState({
          isLoading: false,
        });
      });
  }

  initPagination() {
    const paginationData = this.state.data.items.slice(0, this.state.pageLimit);
    console.log(this.state.pageStart, this.state.pageEnd);
    this.setState({
      paginationData: paginationData,
    });
  }

  render() {
    return (
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Product List</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active">
                <a href="/">Dashboard</a>
              </div>
              <div className="breadcrumb-item">
                <a href="/products">Add Product</a>
              </div>
              <div className="breadcrumb-item">List</div>
            </div>
          </div>
          <div className="section-body">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Product List</h4>
                    <div className="card-header-form">
                      <form>
                        <div className="input-group">
                          <select
                            onChange={this.onSelectPageLimit}
                            style={{
                              paddingRight: "20px",
                              paddingRight: "20px",
                              marginRight: "20px",
                            }}
                          >
                            <option>Default Page Limit ( 5 )</option>
                            <option>10</option>
                            <option>15</option>
                          </select>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            onChange={this.filterData}
                          />
                          <div className="input-group-btn">
                            <button className="btn btn-primary">
                              <i className="fas fa-search"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      {!(
                        this.state.paginationData &&
                        this.state.paginationData.length > 0
                      ) ? (
                        <div className="card">
                          <div className="card-header">
                            <div className="card-body">
                              <div className="jumbotron text-center">
                                <h2>No Data found</h2>
                                <div className="breadcrumb-item">
                                  <a href="/products">
                                    Click here to Add Product
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <table className="table table-bordered table-md">
                          <thead>
                            <tr>
                              <th className="text-center">Name</th>
                              <th className="text-center">Price</th>
                              <th className="text-center">Discount</th>
                              <th className="text-center">Images</th>
                              <th className="text-center">Description</th>
                              <th className="text-center">Small Description</th>
                              <th className="text-center">
                                Shipping Information
                              </th>
                              <th className="text-center">Return Notes</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.filteredData.length > 0
                              ? this.state.filteredData.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="text-center">
                                        {item.name}
                                      </td>
                                      <td className="text-center">
                                        {item.price}
                                      </td>
                                      <td className="text-center">
                                        {item.discount}
                                      </td>
                                      <td className="text-left">
                                        {item.image.map((myImage, index) => {
                                          return (
                                            <>
                                              <a
                                                class="social-icon-link github"
                                                href={myImage}
                                                target="_blank"
                                                rel="noopener"
                                                aria-label="Github"
                                              >
                                                {myImage}
                                              </a>
                                              <br />
                                            </>
                                          );
                                        })}
                                      </td>
                                      <td className="text-left">
                                        {item.description}
                                      </td>
                                      <td className="text-left">
                                        {item.smallDescription}
                                      </td>
                                      <td className="text-left">
                                        {item.shippingInfo}
                                      </td>
                                      <td className="text-left">
                                        {item.returnNotes}
                                      </td>
                                      <td
                                        onClick={() => {}}
                                        className="text-center"
                                      >
                                        <EditProductForm item={item} />
                                      </td>
                                    </tr>
                                  );
                                })
                              : this.state.paginationData.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="text-center">
                                        {item.name}
                                      </td>
                                      <td className="text-center">
                                        {item.price}
                                      </td>
                                      <td className="text-center">
                                        {item.discount}
                                      </td>

                                      <td className="text-left">
                                        {item.image.map((myImage, index) => {
                                          return (
                                            <>
                                              <a
                                                class="social-icon-link github"
                                                href={myImage}
                                                target="_blank"
                                                rel="noopener"
                                                aria-label="Github"
                                              >
                                                {myImage}
                                              </a>
                                              <br />
                                            </>
                                          );
                                        })}
                                      </td>

                                      <td className="text-left">
                                        {item.description}
                                      </td>
                                      <td className="text-left">
                                        {item.smallDescription}
                                      </td>
                                      <td className="text-left">
                                        {item.shippingInfo}
                                      </td>
                                      <td className="text-left">
                                        {item.returnNotes}
                                      </td>
                                      <td
                                        onClick={() => {}}
                                        className="text-center"
                                      >
                                        <EditProductForm item={item} />
                                      </td>
                                    </tr>
                                  );
                                })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                  <div className="card-footer text-right">
                    <nav className="d-inline-block">
                      <ul className="pagination mb-0">
                        {this.state.data.items ? (
                          <Pagination
                            currentPage={this.state.currentPage}
                            total={this.state.data.items.length}
                            limit={this.state.pageLimit}
                            onPageChange={(page) => {
                              var upperBond = this.state.pageLimit * page;
                              var lowerBond = upperBond - this.state.pageLimit;
                              console.log(lowerBond, upperBond);
                              this.setState({
                                currentPage: page,
                                paginationData: this.state.data.items.slice(
                                  lowerBond,
                                  upperBond
                                ),
                              });
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ProductListPage;
