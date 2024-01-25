import React, {useState, useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {getReports, getCustomReports} from "../../rest/ApiService.js";
import Form from "react-bootstrap/Form";
import CustomForm from "./CustomForm";
import Chart from "react-apexcharts";
import axios from "axios";
import DataTable from "react-data-table-component";
import {format} from "date-fns";
import {BsExclamationSquareFill} from "react-icons/bs";

export default function CustomReports() {
  const [search, setSearch] = useState("");
  const [masterData, setOrders] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const [options, setObjects] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["There are no records to display"],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "order data",
      data: [],
    },
  ]);
  const getReportData = data => {
    const fromDate = data.fromDate;
    const toDate = data.toDate;
    // console.log("child data1", fromDate);
    // console.log("child data2", toDate);
    const rPrice = [];
    const rOrders = [];
    const rReportId = [];
    const rDate = [];
    let rConcateDate = [];
    getCustomReports(fromDate, toDate, result => {
      setStatistics(result.data.statistics);
      // console.log("result statistics", result.data.statistics);
      setFilteredList(result.data.orders);
      setOrders(result.data.orders);
      result.data.statistics.map((item, itemIndexx) => {
        // console.log("item", item);
        rPrice.push(item.totalPrice);

        rOrders.push(item.numberOfOrders);
        const rDay = item._id.day + "-" + item._id.month + "-" + item._id.year;
        rDate.push(rDay);
        // console.log("item._id", rDay);
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
      console.log("options", options, series);
    });
  };

  useEffect(() => {
    // console.log("masterData info", masterData);
    if (masterData) {
      const result = masterData.filter(ord => {
        if (ord && ord.paymentMode) {
          return ord.paymentMode.toLowerCase().match(search.toLowerCase());
        }
      });
      setFilteredList(result);
    } else {
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
          {row.items.map((item, itemIndex) => {
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
      grow: 2,
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
    // {
    //   name: "Order Status",
    //   selector: row => row.orderStatus,
    //   cell: row => (
    //     <div>
    //       {row.orderStatus.map((status, itemIndex) => {
    //         return (
    //           <div key={itemIndex}>
    //             {status}
    //             <br />
    //             <i
    //               className="ion ion-arrow-right-c"
    //               style={{ color: "green" }}
    //             ></i>
    //           </div>
    //         );
    //       })}
    //       {/* {row.items[0]._id.name}-Rs{row.items[0]._id.price} */}
    //     </div>
    //   ),
    //   sortable: true,
    //   grow: 2,
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
          <h1>Custom Reports</h1>

          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>
            <div className="breadcrumb-item">CustomReports</div>
          </div>
        </div>
        <div className="section-header">
          <CustomForm onSubmit={getReportData} />
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
                  {/* {console.log("design", options, series)} */}
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
                    title={<h5 className="realfoodcolor">Reports Orders</h5>}
                    className="CustomReports"
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
