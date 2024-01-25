import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {
  API_SERVER,
  deleteVarient,
  getVariants,
} from "./../../rest/ApiService.js";

import DataTable, {defaultThemes} from "react-data-table-component";

import {EditOutlined, DeleteOutlined} from "@ant-design/icons";

export default function UpdateVariants(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isDeleted, setIsDeleted] = useState(false);

  const [dataSource, setDataSource] = useState([]);

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
      name: "Description",
      selector: row => row.description,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Action",
      cell: (row, index) => (
        <DeleteOutlined
          onClick={() => {
            deleteRow(row);
          }}
          style={{color: "red", marginLeft: 12}}
        />
      ),
    },
  ];

  const deleteRow = row => {
    const varientId = row._id;
    const itemId = props.item._id;
    deleteVarient(itemId, varientId, result => {
      // console.log("Varient deleted..");
      setIsDeleted(true);
      setTimeout(() => {
        setIsDeleted(false);
      }, 2000);
      getVarients();
    });
  };

  // const onAddStudent = () => {
  //   const randomNumber = parseInt(Math.random() * 1000);
  //   const newStudent = {
  //     id: randomNumber,
  //     name: "Name " + randomNumber,
  //     email: randomNumber + "@gmail.com",
  //     address: "Address " + randomNumber,
  //   };
  //   setDataSource((pre) => {
  //     return [...pre, newStudent];
  //   });
  // };

  function getVarients() {
    getVariants(props.item._id, result => {
      // console.log("Result is 1 : ", result);

      if (result) {
        // console.log("Result is : ", result);
        setDataSource(result);
      }
    });
  }

  useEffect(() => {
    getVarients();
  }, [props]);
  return (
    <>
      <div
        onClick={handleShow}
        style={{cursor: "pointer", marginBottom: "10px"}}>
        <i
          className="fa fa-trash"
          style={{color: "#0b0e8e", marginRight: "10px"}}
        />
        Variants
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">Delete Variants</Modal.Title>
          <div onClick={handleClose}>
            <i
              className="fa fa-window-close fa-2x"
              style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            {isDeleted ? (
              <div class="alert alert-danger">Deleted successfully</div>
            ) : (
              ""
            )}
            <DataTable
              columns={columns}
              data={dataSource}
              pagination
              fixedHeader
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
