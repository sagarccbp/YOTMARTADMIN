import React, { Component } from "react";
import EditCategoryForm from "../components/modals/EditCategoryModal";

import { GET_MY_ORDERS } from "../js/ApiEnds";
import { API_SERVER } from "../rest/ApiService";
class OwnersOrdersList extends Component {
  componentDidMount() {
    this.fetchOrders();
  }

  onSelectPageLimit(event) {
    var thenum = event.target.value.replace(/[^0-9]/g, "");
    this.setState(
      {
        pageLimit: thenum,
      },
      () => {
        //this.initPagination();
      }
    );
  }

  fetchOrders() {
    this.setState({ isLoading: true });

    const url =
      API_SERVER + GET_MY_ORDERS + "/" + localStorage.getItem("userId");
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((jsondata) => {
        if (jsondata) {
          console.log(jsondata);
          this.setState(
            {
              data: jsondata.data,
              isLoading: false,
            },
            () => {
              console.log("Data loaded ", this.state.data);
              //this.initPagination();
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

  render() {
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
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Customers Orders</h4>
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
                    {this.state.isLoading ? (
                      <>Loading orders.. Please wait..</>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-bordered table-md">
                          <thead>
                            <tr>
                              <th className="text-center">Name</th>
                              <th className="text-center">Images</th>
                              <th className="text-center">Description</th>
                              <th className="text-center">smallDescription</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    )}
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

export default OwnersOrdersList;
