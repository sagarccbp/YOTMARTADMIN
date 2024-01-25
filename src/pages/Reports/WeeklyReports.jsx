import React, {useState, useEffect} from "react";
import Chart from "react-apexcharts";
import axios from "axios";

import {getWeeklyReports} from "../../rest/ApiService.js";
import DataTable from "react-data-table-component";
import {format} from "date-fns";

export default function MonthlyReports() {
  const [search, setSearch] = useState("");
  const [masterData, setOrders] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [statistics, setStatistics] = useState([]);

  var today = new Date();
  var lastdate = new Date(`${today}`);
  lastdate.setDate(lastdate.getDate() - 7);
  var fDate = format(lastdate, "yyyy-MM-dd");
  var sdate = format(today, "yyyy-MM-dd");
  const [state, setState] = useState({
    currentDate: sdate,
    sevenDaysAgo: fDate,
  });
  const [options, setObjects] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
    fill: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    // grid: {
    //   row: {
    //     colors: ["#F44336", "#E91E63", "#9C27B0"],
    //   },
    //   colomn: {
    //     colors: ["#F44336", "#E91E63", "#9C27B0"],
    //   },
    // },
    legend: {
      fontSize: "14px",
      fontFamily: "Nunito, Segoe UI, arial",
      labels: {
        Colors: "#E91E63",
        useSeriesColors: true,
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Total Amount/day",
      data: [],
      colors: "#f44336",
    },
    {
      name: "Number Of Orders/day",
      data: [],
      colors: "#E91E63",
    },
  ]);

  useEffect(() => {
    const rPrice = [];
    const rOrders = [];
    const rDate = [];
    getWeeklyReports(result => {
      setStatistics(result.data.statistics);
      // console.log("result setcate", result.data.statistics);
      setFilteredList(result.data.orders);
      setOrders(result.data.orders);

      result.data.statistics.map((item, itemIndexx) => {
        // console.log("item", item);
        rPrice.push(item.totalPrice);
        rOrders.push(item.numberOfOrders);

        const rday = item._id.day + "-" + item._id.month + "-" + item._id.year;
        rDate.push(rday);
      });
      setObjects({
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          name: "Date",
          categories: rDate,
        },
      });
      setSeries([
        {
          name: "Total Amount/day",
          data: rPrice,
        },
        {
          name: "Number Of Orders/day",
          data: rOrders,
        },
      ]);
    });
  }, []);

  useEffect(() => {
    // console.log("masterData info", masterData);
    if (masterData) {
      const result = masterData.filter(ord => {
        // console.log("ord", ord);

        // if (ord && ord.items[0] && ord.items[0]._id && ord.items[0]._id.name) {
        if (ord && ord.paymentMode) {
          // console.log("ord", ord);
          // console.log("masterData ord.customer", ord);
          // return ord.address.name.toLowerCase().match(search.toLowerCase());
          return ord.paymentMode.toLowerCase().includes(search.toLowerCase());
        }
      });
      // console.log("masterData result", result);
      setFilteredList(result);
    }
  }, [search]);

  function getFormattedDate(date) {
    const cdate = new Date(`${date}`);
    return format(cdate, "dd-MM-yyyy kk:mm:ss");
  }

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
          {!row.items
            ? "No Records"
            : row.items.map((item, itemIndex) => {
                if (!item._id) {
                  return null;
                }
                return (
                  <div key={itemIndex}>
                    {itemIndex + 1}.{item._id.name}
                  </div>
                );
              })}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Address",
      selector: row => (!row.address ? "No Records" : row.address.name),
      cell: row => (
        <div className="row">
          <div className="col-12">
            <b>{!row.address ? "No Records" : row.address.name}</b>
          </div>
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
                    {key} :{row.address[key]}
                  </div>
                );
              })}
          <br />
          PhoneNo: {!row.address ? "No Records" : row.address.contactNumber}
        </div>
      ),
      sortable: true,
    },
    // {
    //   name: "Order Status",
    //   selector: row => row.orderStatus,
    //   cell: row => (
    //     <div>
    //       {row.orderStatus.map((status, itemIndex) => {
    //         return (
    //           <div key={itemIndex}>
    //             <i
    //               className="ion ion-arrow-right-c"
    //               style={{ color: "green" }}
    //             ></i>

    //             {status}
    //           </div>
    //         );
    //       })}
    //       {/* {row.items[0]._id.name}-Rs{row.items[0]._id.price} */}
    //     </div>
    //   ),
    //   sortable: true,
    // },
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
  ];

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Weekly Reports</h1>
          <h6 style={{marginBottom: "-0.5rem", marginLeft: "10px"}}>
            From Date:&nbsp;{state.sevenDaysAgo}
            &nbsp;&nbsp;To Date:&nbsp;{state.currentDate}
          </h6>

          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>
            <div className="breadcrumb-item">WeeklyReports</div>
          </div>
        </div>
        <div className="section-body">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4>Amount and Orders statistics</h4>
                  <div className="card-header-form"></div>
                </div>
                <div className="card-body">
                  <Chart
                    options={options}
                    series={series}
                    type="bar"
                    width="400"
                    height="300"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4>Amount and Orders statistics</h4>
                  <div className="card-header-form"></div>
                </div>
                <div className="card-body">
                  <Chart
                    options={options}
                    series={series}
                    type="area"
                    width="400"
                    height="300"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <DataTable
                    title={<h5 className="realfoodcolor">Weekly Reports</h5>}
                    className="WeeklyReports"
                    columns={columns}
                    data={filteredList}
                    pagination
                    fixedHeader
                    export
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
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
