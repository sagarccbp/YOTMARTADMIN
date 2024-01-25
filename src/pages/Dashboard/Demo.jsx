import React, { Component } from "react";
import $ from "jquery";
import { getOrders, getItems } from "../../rest/ApiService.js";
import { ChartShow } from "./ChartShow/ChartShow";
import FlagEcom from "./Flag/FlagEcom";
import { flagData } from "./Data";
import { Link, NavLink } from "react-router-dom";
import { format } from "date-fns";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [newOrders, setNewOrders] = useState([]);
  const [ordersInTransition, setTransitionOrders] = useState([]);
  const [ordersCompleted, setOrderCompleted] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [showOrdersList, setShowOrdersList] = useState([]);
  const [showCancelledList, setCancelledList] = useState([]);
  const [search, setSearch] = useState("");
  const [masterData, setOrders] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [params, setParams] = useState({});
  const [state, setState] = useState({});
  useEffect(() => {
    getOrders(result => {
      console.log("result setcate", result);
      setFilteredList(result.data);
      setOrders(result.data);
    });
    getItems(result => {
      setFilteredCategories(result.items);
    });
  }, []);

  useEffect(() => {
    filterData();
  }, [masterData]);

  useEffect(() => {
    if (masterData) {
      console.log("masterData", masterData);
      const result = masterData.filter(ord => {
        if (ord && ord.address && ord.address.name) {
          return ord.address.name.toLowerCase().match(search.toLowerCase());
        }
      });
      console.log("ord result", result);
      setFilteredList(result);
      setSelectedItem("searchs");
    }
  }, [search]);
  useEffect(() => {
    if (selectedItem === "ALL") {
      setShowOrdersList(masterData);
    } else if (selectedItem === "NEW") {
      setShowOrdersList(newOrders);
    } else if (selectedItem === "COMPLETED") {
      setShowOrdersList(ordersCompleted);
    } else if (selectedItem === "CANCELLED") {
      setShowOrdersList(showCancelledList);
    } else if (selectedItem === "TRANSITION") {
      setShowOrdersList(ordersInTransition);
    }
  }, [selectedItem]);

  function getFormattedDate(date) {
    const cdate = new Date(`${date}`);
    return format(cdate, "dd-MM-yyyy kk:mm:ss");
  }

  const filterData = () => {
    for (let i = 0; i < masterData.length; i++) {
      const order = masterData[i];
      console.log("Order is : ", order);
      var orderStatusArray = order.orderStatus;
      let orderStatus = orderStatusArray.slice(-1).pop();
      if (orderStatus === "ORDER_INITIATED") {
        setNewOrders(current => [...current, order]);
      } else if (orderStatus === "ORDER_TRANSITION") {
        setTransitionOrders(current => [...current, order]);
      } else if (orderStatus === "ORDER_COMPLETED") {
        setOrderCompleted(current => [...current, order]);
      } else if (orderStatus === "ORDER_CANCELLED") {
        setCancelledList(current => [...current, order]);
      }
    }
  };
  useEffect(() => {
    ChartShow();
    if ($("#top-5-scroll").length) {
      $("#top-5-scroll")
        .css({
          height: 315,
        })
        .niceScroll();
    }
    $("#products-carousel").owlCarousel({
      items: 3,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 5000,
      loop: true,
      responsive: {
        0: {
          items: 2,
        },
        768: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });
  });
  return (
    <div className="main-content">
      <section className="section">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card card-statistic-2">
              <div className="card-stats">
                <div className="card-stats-title">Order Statistics</div>
                <div className="card-stats-items">
                  <div className="card-stats-item">
                    <div className="card-stats-item-count">
                      {newOrders.length}
                    </div>
                    <div className="card-stats-item-label">Pending</div>
                  </div>
                  <div className="card-stats-item">
                    <div className="card-stats-item-count">
                      {ordersInTransition.length}
                    </div>
                    <div className="card-stats-item-label">Shipping</div>
                  </div>
                  <div className="card-stats-item">
                    <div className="card-stats-item-count">
                      {ordersCompleted.length}
                    </div>
                    <div className="card-stats-item-label">Completed</div>
                  </div>
                </div>
              </div>
              <div className="card-icon shadow-default realfoodbgcolor">
                <i className="fas fa-archive"></i>
              </div>
              <div className="card-wrap">
                <div className="card-header">
                  <h4>Total Orders</h4>
                </div>
                <div className="card-body">{masterData.length}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card card-statistic-2">
              <div className="card-chart">
                <canvas id="balance-chart" height="80"></canvas>
              </div>
              <div className="card-icon shadow-primary bg-primary">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="card-wrap">
                <div className="card-header">
                  <h4>No of Products</h4>
                </div>
                <div className="card-body">{filteredCategories.length}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card card-statistic-2">
              <div className="card-chart">
                <canvas id="sales-chart" height="80"></canvas>
              </div>
              <div className="card-icon shadow-primary bg-primary">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <div className="card-wrap">
                <div className="card-header">
                  <h4>No of Customers</h4>
                </div>
                <div className="card-body">4,732</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h4>Budget vs Sales</h4>
              </div>
              <div className="card-body">
                <canvas id="myChart" height="158"></canvas>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card gradient-bottom">
              <div className="card-header">
                <h4>Top 5 Products</h4>
                <div className="card-header-action dropdown">
                  <a
                    href="#"
                    data-toggle="dropdown"
                    className="btn btn-danger dropdown-toggle"
                  >
                    Month
                  </a>
                  <ul className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <li className="dropdown-title">Select Period</li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Today
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Week
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item active">
                        Month
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body" id="top-5-scroll">
                <ul className="list-unstyled list-unstyled-border">
                  <li className="media">
                    <img
                      className="mr-3 rounded"
                      width="55"
                      src="../assets/img/products/product-3-50.png"
                      alt="product"
                    />
                    <div className="media-body">
                      <div className="float-right">
                        <div className="font-weight-600 text-muted text-small">
                          86 Sales
                        </div>
                      </div>
                      <div className="media-title">oPhone S9 Limited</div>
                      <div className="mt-1">
                        <div className="budget-price">
                          <div
                            className="budget-price-square bg-primary"
                            data-width="64%"
                          ></div>
                          <div className="budget-price-label">$68,714</div>
                        </div>
                        <div className="budget-price">
                          <div
                            className="budget-price-square bg-danger"
                            data-width="43%"
                          ></div>
                          <div className="budget-price-label">$38,700</div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="media">
                    <img
                      className="mr-3 rounded"
                      width="55"
                      src="../assets/img/products/product-4-50.png"
                      alt="product"
                    />
                    <div className="media-body">
                      <div className="float-right">
                        <div className="font-weight-600 text-muted text-small">
                          67 Sales
                        </div>
                      </div>
                      <div className="media-title">iBook Pro 2018</div>
                      <div className="mt-1">
                        <div className="budget-price">
                          <div
                            className="budget-price-square bg-primary"
                            data-width="84%"
                          ></div>
                          <div className="budget-price-label">$107,133</div>
                        </div>
                        <div className="budget-price">
                          <div
                            className="budget-price-square bg-danger"
                            data-width="60%"
                          ></div>
                          <div className="budget-price-label">$91,455</div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="media">
                    <img
                      className="mr-3 rounded"
                      width="55"
                      src="../assets/img/products/product-1-50.png"
                      alt="product"
                    />
                    <div className="media-body">
                      <div className="float-right">
                        <div className="font-weight-600 text-muted text-small">
                          63 Sales
                        </div>
                      </div>
                      <div className="media-title">Headphone Blitz</div>
                      <div className="mt-1">
                        <div className="budget-price">
                          <div
                            className="budget-price-square bg-primary"
                            data-width="34%"
                          ></div>
                          <div className="budget-price-label">$3,717</div>
                        </div>
                        <div className="budget-price">
                          <div
                            className="budget-price-square bg-danger"
                            data-width="28%"
                          ></div>
                          <div className="budget-price-label">$2,835</div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="media">
                    <img
                      className="mr-3 rounded"
                      width="55"
                      src="../assets/img/products/product-3-50.png"
                      alt="product"
                    />
                    <div className="media-body">
                      <div className="float-right">
                        <div className="font-weight-600 text-muted text-small">
                          28 Sales
                        </div>
                      </div>
                      <div className="media-title">oPhone X Lite</div>
                      <div className="mt-1">
                        <div className="budget-price">
                          <div
                            className="budget-price-square bg-primary"
                            data-width="45%"
                          ></div>
                          <div className="budget-price-label">$13,972</div>
                        </div>
                        <div className="budget-price">
                          <div
                            className="budget-price-square bg-danger"
                            data-width="30%"
                          ></div>
                          <div className="budget-price-label">$9,660</div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="media">
                    <img
                      className="mr-3 rounded"
                      width="55"
                      src="../assets/img/products/product-5-50.png"
                      alt="product"
                    />
                    <div className="media-body">
                      <div className="float-right">
                        <div className="font-weight-600 text-muted text-small">
                          19 Sales
                        </div>
                      </div>
                      <div className="media-title">Old Camera</div>
                      <div className="mt-1">
                        <div className="budget-price">
                          <div
                            className="budget-price-square bg-primary"
                            data-width="35%"
                          ></div>
                          <div className="budget-price-label">$7,391</div>
                        </div>
                        <div className="budget-price">
                          <div
                            className="budget-price-square bg-danger"
                            data-width="28%"
                          ></div>
                          <div className="budget-price-label">$5,472</div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card-footer pt-3 d-flex justify-content-center">
                <div className="budget-price justify-content-center">
                  <div
                    className="budget-price-square bg-primary"
                    data-width="20"
                  ></div>
                  <div className="budget-price-label">Selling Price</div>
                </div>
                <div className="budget-price justify-content-center">
                  <div
                    className="budget-price-square bg-danger"
                    data-width="20"
                  ></div>
                  <div className="budget-price-label">Budget Price</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Best Products</h4>
              </div>
              <div className="card-body">
                <div className="owl-carousel owl-theme" id="products-carousel">
                  <div>
                    <div className="product-item pb-3">
                      <div className="product-image">
                        <img
                          alt="image"
                          src="../assets/img/products/product-4-50.png"
                          className="img-fluid"
                        />
                      </div>
                      <div className="product-details">
                        <div className="product-name">iBook Pro 2018</div>
                        <div className="product-review">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <div className="text-muted text-small">67 Sales</div>
                        <div className="product-cta">
                          <a href="#" className="btn btn-primary">
                            Detail
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="product-item">
                      <div className="product-image">
                        <img
                          alt="image"
                          src="../assets/img/products/product-3-50.png"
                          className="img-fluid"
                        />
                      </div>
                      <div className="product-details">
                        <div className="product-name">oPhone S9 Limited</div>
                        <div className="product-review">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half"></i>
                        </div>
                        <div className="text-muted text-small">86 Sales</div>
                        <div className="product-cta">
                          <a href="#" className="btn btn-primary">
                            Detail
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="product-item">
                      <div className="product-image">
                        <img
                          alt="image"
                          src="../assets/img/products/product-1-50.png"
                          className="img-fluid"
                        />
                      </div>
                      <div className="product-details">
                        <div className="product-name">Headphone Blitz</div>
                        <div className="product-review">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="far fa-star"></i>
                        </div>
                        <div className="text-muted text-small">63 Sales</div>
                        <div className="product-cta">
                          <a href="#" className="btn btn-primary">
                            Detail
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Top Countries</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <FlagEcom data={flagData} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h4>Invoices</h4>
                <div className="card-header-action">
                  <a href="#" className="btn btn-danger">
                    View More <i className="fas fa-chevron-right"></i>
                  </a>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive table-invoice">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th>Invoice ID</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Action</th>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">INV-87239</a>
                        </td>
                        <td className="font-weight-600">Kusnadi</td>
                        <td>
                          <div className="badge badge-warning">Unpaid</div>
                        </td>
                        <td>July 19, 2018</td>
                        <td>
                          <a href="#" className="btn btn-primary">
                            Detail
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">INV-48574</a>
                        </td>
                        <td className="font-weight-600">Hasan Basri</td>
                        <td>
                          <div className="badge badge-success">Paid</div>
                        </td>
                        <td>July 21, 2018</td>
                        <td>
                          <a href="#" className="btn btn-primary">
                            Detail
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">INV-76824</a>
                        </td>
                        <td className="font-weight-600">Muhamad Nuruzzaki</td>
                        <td>
                          <div className="badge badge-warning">Unpaid</div>
                        </td>
                        <td>July 22, 2018</td>
                        <td>
                          <a href="#" className="btn btn-primary">
                            Detail
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">INV-84990</a>
                        </td>
                        <td className="font-weight-600">Agung Ardiansyah</td>
                        <td>
                          <div className="badge badge-warning">Unpaid</div>
                        </td>
                        <td>July 22, 2018</td>
                        <td>
                          <a href="#" className="btn btn-primary">
                            Detail
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">INV-87320</a>
                        </td>
                        <td className="font-weight-600">
                          Ardian Rahardiansyah
                        </td>
                        <td>
                          <div className="badge badge-success">Paid</div>
                        </td>
                        <td>July 28, 2018</td>
                        <td>
                          <a href="#" className="btn btn-primary">
                            Detail
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-hero">
              <div className="card-header">
                <div className="card-icon">
                  <i className="far fa-question-circle"></i>
                </div>
                <h4>14</h4>
                <div className="card-description">Customers need help</div>
              </div>
              <div className="card-body p-0">
                <div className="tickets-list">
                  <a href="#" className="ticket-item">
                    <div className="ticket-title">
                      <h4>My order hasn't arrived yet</h4>
                    </div>
                    <div className="ticket-info">
                      <div>Laila Tazkiah</div>
                      <div className="bullet"></div>
                      <div className="text-primary">1 min ago</div>
                    </div>
                  </a>
                  <a href="#" className="ticket-item">
                    <div className="ticket-title">
                      <h4>Please cancel my order</h4>
                    </div>
                    <div className="ticket-info">
                      <div>Rizal Fakhri</div>
                      <div className="bullet"></div>
                      <div>2 hours ago</div>
                    </div>
                  </a>
                  <a href="#" className="ticket-item">
                    <div className="ticket-title">
                      <h4>Do you see my mother?</h4>
                    </div>
                    <div className="ticket-info">
                      <div>Syahdan Ubaidillah</div>
                      <div className="bullet"></div>
                      <div>6 hours ago</div>
                    </div>
                  </a>
                  <NavLink
                    activeStyle={{
                      color: "#6777ef",
                      borderBottom: "solid 3px #6777ef",
                      marginLeft: "1em",
                    }}
                    exact
                    to="feature/tickets"
                    className="ticket-item ticket-more"
                  >
                    View All <i className="fas fa-chevron-right"></i>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
