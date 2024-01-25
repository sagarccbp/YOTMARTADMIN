import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

import AddBannersModal from "../../components/modals/AddBannersModal";
import AddProductsModal from "../../components/modals/AddProductsModal";
import EditProductForm from "../../components/modals/EditProductModal";
import Dialog from "../../components/modals/ProductDelete";
import { API_SERVER, getItems } from "./../../rest/ApiService.js";
import DataTable from "react-data-table-component";

export default function AddProduct() {
  const [search, setSearch] = useState("");
  const [cate, setCate] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [sampleArray, setSampleArray] = useState([]);

  useEffect(() => {
    getItems((result) => {
      setCate(result);
      console.log("result setcate", result);
      setFilteredCategories(result.items);
    });
  }, []);

  useEffect(() => {
    // console.log("search info", cate);
    if (cate && cate.items) {
      const result = cate.items.filter((cat) => {
        return cat.name.toLowerCase().match(search.toLowerCase());
      });
      setFilteredCategories(result);
      // console.log("search", filteredCategories);
    }
  }, [search]);
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Discount",
      selector: (row) => row.discount,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => row.name,
      cell: (row) => (
        <div>
          {row.image.map((fruit, index) => (
            <div>
              <a
                className="social-icon-link github"
                href={row.image[index]}
                target="_blank"
                rel="noopener"
                aria-label="Github"
              >
                <img
                  src={row.image[index]}
                  style={{ height: "50px", width: "100%" }}
                />
              </a>
              <br />
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Small Description",
      selector: (row) => row.smallDescription,
      sortable: true,
    },
    {
      name: "Shipping Information",
      selector: (row) => row.shippingInfo,
      sortable: true,
    },
    {
      name: "Return Notes",
      selector: (row) => row.returnNotes,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex flex-row">
          <EditProductForm item={row} />
          <Dialog item={row} />
        </div>
      ),
    },
  ];

  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
      yaxis: {
        categories: [21, 22, 23, 24, 25, 26, 27, 28, 29],
      },
    },
    series: [
      {
        name: "Number of Orders",
        data: [30, 40, 45],
      },
      {
        name: "Total Price",
        data: [300, 400, 450],
      },
    ],
  });
  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Weekly Reports</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>
            <div className="breadcrumb-item">WeeklyReports</div>
          </div>
        </div>
        <div className="section-body">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-12">
              <div className="card">
                <Chart
                  options={state.options}
                  series={state.series}
                  type="bar"
                  width="500"
                />
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
