import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Multiselect from "multiselect-react-dropdown";
import {
  addBanners,
  getCategories,
  getItems,
  getSubCategories,
} from "../../rest/ApiService";

// import {
//   CATEGORIES,
//   ADD_PRODUCTS,
//   SUBCATEGORIES_OF_CATEGORY,
//   UPLOADS,
//   USER,
// } from "../js/ApiEnds";

export default function AddBannerModal() {
  const [show, setShow] = useState(false);
  // const [preview, setPreview] = useState();
  const [dropDownValues, setDropDownValues] = useState([]);
  const [layoutType, selectLayoutType] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [setBanners, setBannerItems] = useState([]);

  const onSelectDropDown = (selectedValue, selectedList) => {
    setBannerItems(selectedValue);
  };

  const selectBannerType = e => {
    const value = e.target.value;
    if (value === "Choose") {
      setDropDownValues([]);
      return;
    }
    selectLayoutType(value);
    if (value === "ITEMS") {
      getItems(result => {
        console.log(result, "ITEMS");
        setDropDownValues(result.items);
      });
    } else if (value === "SUB_CATEGORIES") {
      getSubCategories(result => {
        console.log(result, "SUB_CATEGORIES");
        setDropDownValues(result.subCategory);
      });
    } else if (value === "CATEGORIES") {
      getCategories(result => {
        console.log(result, "CATEGORIES");
        setDropDownValues(result.categories);
      });
    }
  };

  const createBanners = event => {
    event.preventDefault();
    // window.alert("create banner");
    console.log("setbanners", setBanners);
    if (setBanners && setBanners.length > 0) {
      let items = [];
      for (let i = 0; i < setBanners.length; i++) {
        const banner = setBanners[i];
        let item = {
          item: banner._id,
          layoutType: layoutType,
        };
        items.push(item);
      }
      const body = {
        items: items,
      };
      addBanners(body, result => {
        if (result) {
          window.location.reload();
          // window.alert("create banner reload");
        }
      });
    }
  };

  return (
    <>
      <div
        onClick={handleShow}
        className="btn btn-default ml-1"
        style={{background: "#0b0e8e", color: "white"}}>
        <i className="fas fa-plus m-0">
          <span className="ml-1">Add</span>
        </i>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">Add Banner</Modal.Title>
          <div onClick={handleClose}>
            <i class="fa fa-window-close fa-2x" style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>

        <Modal.Body>
          <form className="form-data" onSubmit={createBanners}>
            <div className="form-group">
              <label>Select Banner Type</label>

              <select className="form-control" onChange={selectBannerType}>
                <option value={"Choose"}>Choose Type</option>
                <option value={"CATEGORIES"}>Category</option>
                <option value={"SUB_CATEGORIES"}>Sub Category</option>
                <option value={"ITEMS"}>Items</option>
              </select>
            </div>
            {dropDownValues && dropDownValues.length > 0 ? (
              <div className="form-group">
                <label>Select Items</label>

                <Multiselect
                  onSelect={onSelectDropDown}
                  options={dropDownValues}
                  displayValue="name"
                />
              </div>
            ) : (
              ""
            )}

            <div className="col-md-12 text-right">
              <button
                type="submit"
                className="btn btn-default"
                style={{background: "#0b0e8e", color: "white"}}>
                Add Banner
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
