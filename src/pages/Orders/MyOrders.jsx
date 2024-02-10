import React from "react";

import {useState, useEffect} from "react";
import {GET_MY_ORDERS} from "../../js/ApiEnds";
import {API_SERVER} from "../../rest/ApiService.js";
import {BsThreeDotsVertical} from "react-icons/bs";
import TrackOrderModal from "../../components/modals/TrackOrderModal";
import {getOrders, getShippingJWTToken} from "../../rest/ApiService.js";
import DataTable from "react-data-table-component";
import {format} from "date-fns";
import UpdateOrderProcess from "../../components/modals/UpdateOrderProcess";
import ShiprocketPlaceOrder from "../shipment/ShiprocketOrder";
import Invoice from "../../components/modals/InvoiceModal";
import ShippingModal from "../../components/modals/ShippingModal";
import OrdersAssign from "../../components/modals/OrdersAssignModel.jsx";

export default function MyOrders() {
  const [newOrders, setNewOrders] = useState([]);
  const [ordersInTransition, setTransitionOrders] = useState([]);
  const [ordersCompleted, setOrderCompleted] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [showOrdersList, setShowOrdersList] = useState([]);
  const [showCancelledList, setCancelledList] = useState([]);
  const [search, setSearch] = useState("");
  const [masterData, setOrders] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [params, setParams] = useState({});
  const [state, setState] = useState({});

  useEffect(() => {
    getOrders(result => {
      console.log("result setcate", result);
      setFilteredList(result.data);
      setOrders(result.data);
    });
  }, []);

  useEffect(() => {
    filterData();
  }, [masterData]);

  useEffect(() => {
    getShippingJWTToken(result => {
      console.log("result setcate", result);
    });
  }, []);
  // useEffect(() => {
  //   blueDartLocationFinder(result => {
  //     console.log("result setcate", result);
  //   });
  // }, []);
  useEffect(() => {
    if (masterData) {
      // console.log("masterData", masterData);
      const result = masterData.filter(ord => {
        if (ord && ord.address && ord.address.name) {
          return ord.address.name.toLowerCase().match(search.toLowerCase());
        }
      });
      // console.log("ord result", result);
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
      // console.log("Order is : ", order);
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
  const columns = [
    {
      name: "SL.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Items",
      selector: row =>
        !row.items[0]._id ? "No Records" : row.items[0]._id.name,
      cell: row => (
        <div>
          {row.items.map((item, itemIndex) => {
            if (!item._id) {
              return null;
            }
            return (
              <div key={itemIndex}>
                {itemIndex + 1}.{item._id.name} (
                {item.varient && item.varient.name
                  ? item.varient.name
                  : "No varient found"}
                )
                <ShiprocketPlaceOrder order={row} item={item} />
              </div>
            );
          })}
        </div>
      ),
      sortable: true,
      grow: 2,
    },
    {
      name: "Payment Mode",
      selector: row => row.paymentMode,
      sortable: true,
    },
    {
      name: "Payable Amt",
      selector: row => row.payableAmount,
      sortable: true,
    },
    {
      name: "Created Date",
      selector: row => row.createdDate,
      cell: row => (
        <div className="d-flex flex-row">
          {getFormattedDate(`${row.createdDate}`)}
        </div>
      ),

      sortable: true,
    },
    {
      name: "Address",
      selector: row => (!row.address ? "No Records" : row.address.name),
      cell: row => (
        <div>
          {!row.address
            ? "No Records"
            : Object.keys(row.address).map((key, keyIndex) => {
                if (
                  key === "_id" ||
                  key === "isDefaultAddress" ||
                  key === "userId" ||
                  key === "__v"
                ) {
                  return null;
                }
                return (
                  <div key={keyIndex}>
                    <b>{key}:</b> {row.address[key]}
                    <br />
                  </div>
                );
              })}
        </div>
      ),
      sortable: true,
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
            style={{padding: "10px", zIndex: "5", position: "relative"}}>
            {/* <OrdersAssign item={row} /> */}
            <ShippingModal item={row} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Customers Orders</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>
            <div className="breadcrumb-item">Orders</div>
          </div>
        </div>
        <div className="section-body">
          <div className="row">
            <div
              style={{cursor: "pointer"}}
              className="col-12 col-md-6 col-lg-2">
              <div style={{cursor: "pointer"}} className="card card-primary">
                <div
                  className="card-header"
                  onClick={() => {
                    setSelectedItem("ALL");
                  }}>
                  <h4>All ({masterData.length}) </h4>
                </div>
              </div>
            </div>
            <div
              style={{cursor: "pointer"}}
              className="col-12 col-md-6 col-lg-2 col-half-offset">
              <div style={{cursor: "pointer"}} className="card card-primary">
                <div
                  className="card-header"
                  onClick={() => {
                    setSelectedItem("NEW");
                  }}>
                  <h4>New ({newOrders.length})</h4>
                </div>
              </div>
            </div>
            {/* <div
              style={{ cursor: "pointer" }}
              className="col-12 col-md-6 col-lg-3 col-half-offset"
            >
              <div className="card card-primary">
                <div
                  className="card-header"
                  style={{ minWidth: "170px" }}
                  onClick={() => {
                    setSelectedItem("COMPLETED");
                  }}
                >
                  <h4>Completed ({ordersCompleted.length})</h4>
                </div>
              </div>
            </div> */}
            {/* <div
              style={{ cursor: "pointer" }}
              className="col-12 col-md-6 col-lg-3 col-half-offset"
            >
              <div className="card card-primary">
                <div
                  className="card-header"
                  style={{ minWidth: "170px" }}
                  onClick={() => {
                    setSelectedItem("TRANSITION");
                  }}
                >
                  <h4>Shipping ({ordersInTransition.length})</h4>
                </div>
              </div>
            </div> */}
            {/* <div
              style={{ cursor: "pointer" }}
              className="col-12 col-md-6 col-lg-2 col-half-offset"
            >
              <div className="card card-primary">
                <div
                  className="card-header"
                  style={{ minWidth: "170px" }}
                  onClick={() => {
                    setSelectedItem("CANCELLED");
                  }}
                >
                  <h4>Cancelled ({showCancelledList.length})</h4>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <div className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <DataTable
                      title={
                        <h5 className="realfoodcolor">
                          List of Customers Orders
                        </h5>
                      }
                      className="MyOrders"
                      columns={columns}
                      data={
                        selectedItem === "ALL"
                          ? masterData
                          : selectedItem === "NEW"
                          ? newOrders
                          : selectedItem === "COMPLETED"
                          ? ordersCompleted
                          : selectedItem === "CANCELLED"
                          ? showCancelledList
                          : selectedItem === "TRANSITION"
                          ? ordersInTransition
                          : selectedItem === "searchs"
                          ? filteredList
                          : masterData
                      }
                      pagination
                      fixedHeader
                      fixedHeaderScrollHeight="400px"
                      subHeader
                      subHeaderComponent={
                        <div>
                          <input
                            type="text"
                            className="w-25 form-control form-control-sm bSearch1 d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block"
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
        </div>
      </div>
    </div>
  );
}
