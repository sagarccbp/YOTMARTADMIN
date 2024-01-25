import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Dialog from "../../components/modals/BannerDelete";
import AddBannerModal from "../../components/modals/AddBannersModal";
import { getBannerList } from "../../rest/ApiService.js";

const Banners = () => {
  const [search, setSearch] = useState("");
  const [banner, setBanner] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);

  useEffect(() => {
    getBannerList(result => {
      console.log("HSI result", result, result.data.item);
      setBanner(result.data);
      setFilteredBanners(result.data);
    });
  }, []);

  useEffect(() => {
    if (banner) {
      console.log("search banner", banner);

      const result = banner.filter(bann => {
        if (bann && bann.item && bann.item.name) {
          return bann.item.name.toLowerCase().match(search.toLowerCase());
        }
      });
      console.log("search banner result", result);

      setFilteredBanners(result);
    }
  }, [search]);
  const columns = [
    {
      name: "SL.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "BANNERS NAME",
      selector: row => (!row.item ? "No Reocrds" : row.item.name),
      cell: row => <div>{!row.item ? "No Records" : row.item.name}</div>,
      sortable: true,
    },
    {
      name: "LAYOUT TYPE",
      selector: row => row.layoutType,
      sortable: true,
    },
    {
      name: "ACTION",
      cell: row => (
        <div>
          <Dialog item={row} />
        </div>
      ),
    },
  ];

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Banners List</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>

            <div className="breadcrumb-item">Banners</div>
          </div>
        </div>
        <div className="section-body">
          <div className="row">
            <div className="col-12">
              <div className="card" style={{ border: "none" }}>
                {/* <div className="card-header">
                  <h4>Banners List</h4>
                  <div className="card-header-form"></div>
                </div> */}
                <div className="card-body">
                  <DataTable
                    className="banners"
                    title={<h5 className="realfoodcolor">List of Banners</h5>}
                    border
                    striped
                    columns={columns}
                    data={filteredBanners}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    actions={<AddBannerModal />}
                    subHeader
                    header
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
  );
};

export default Banners;
