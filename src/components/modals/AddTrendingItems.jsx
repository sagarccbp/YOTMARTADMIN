import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import {
  CATEGORIES,
  ADD_PRODUCTS,
  // SUBCATEGORIES_OF_CATEGORY,
  SUB_CATEGORIES,
  // UPLOADS,
  USER,
} from "../../js/ApiEnds";

import {
  API_SERVER,
  addTrendingItems,
  // API_KEY,
} from "./../../rest/ApiService.js";
// import {optionsForElement} from "dropzone";

export default function AddTrendingItems() {
  const [show, setShow] = useState(false);
  // const [preview, setPreview] = useState();
  // const [dropDownValues, setDropDownValues] = useState([]);
  // const [layoutType, selectLayoutType] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [subCategories, setSubCategories] = useState([]);
  const selectCategoryRef = useRef();
  // const [images, setImages] = useState([]);
  // const [params, setParams] = useState({});

  const onSelect = (selectedItemList, selectedItem) => {
    setSelectedCategories(selectedItemList);
    fetchApiData(selectedItem, false);
  };
  const onRemove = (selectedList, removedItem) => {
    setSelectedCategories(selectedList);
    fetchApiData(removedItem, true);
  };

  const fetchApiData = () => {
    const urlItems =
      API_SERVER +
      ADD_PRODUCTS +
      "/" +
      USER +
      "/" +
      localStorage.getItem("userId");
    const urlCategories =
      API_SERVER +
      CATEGORIES +
      "/" +
      USER +
      "/" +
      localStorage.getItem("userId");
    const urlSubCategories =
      API_SERVER +
      SUB_CATEGORIES +
      "/" +
      USER +
      "/" +
      localStorage.getItem("userId");
    const getUrlItems = axios.get(urlItems, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        // API_KEY: API_KEY,
      },
    });
    const getUrlCategories = axios.get(urlCategories, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        //API_KEY: API_KEY,
      },
    });
    const getUrlSubCategories = axios.get(urlSubCategories, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        //API_KEY: API_KEY,
      },
    });
    axios.all([getUrlItems, getUrlCategories, getUrlSubCategories]).then(
      axios.spread((...allData) => {
        if (allData.length > 0) {
          const Idata = [];
          const Cdata = [];
          const SCdata = [];
          const fd = [];
          // const Litems = [""];
          if (allData[0].length > 0) {
          }
          allData[0].data.items.map((item, itemIndexx) => {
            Idata.push(item);
          });

          const Litems = [{layoutType: "ITEMS"}];
          const bMap = Litems.reduce(
            (map, item) => map.set(item._id, item.layoutType),
            new Map()
          );
          const ifinalData = Idata.map(item =>
            Object.assign(
              {
                layoutType: bMap.get(item.layoutType),
              },
              item
            )
          );
          fd.push(...ifinalData);
          allData[1].data.categories.map((item, itemIndexx) => {
            Cdata.push(item);
          });
          const cLitems = [{layoutType: "CATEGORIES"}];
          const cbMap = cLitems.reduce(
            (map, item) => map.set(item._id, item.layoutType),
            new Map()
          );
          const cfinalData = Cdata.map(item =>
            Object.assign(
              {
                layoutType: cbMap.get(item.layoutType),
              },
              item
            )
          );
          fd.push(...cfinalData);
          allData[2].data.subCategory.map((item, itemIndexx) => {
            SCdata.push(item);
          });
          const scLitems = [{layoutType: "SUB_CATEGORIES"}];
          const scbMap = scLitems.reduce(
            (map, item) => map.set(item._id, item.layoutType),
            new Map()
          );
          const scfinalData = SCdata.map(item =>
            Object.assign(
              {
                layoutType: scbMap.get(item.layoutType),
              },
              item
            )
          );
          fd.push(...scfinalData);
          setCategories(fd);
          console.log("Tdata", fd);
        }
      })
    );
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  const createTrendingItems = event => {
    event.preventDefault();

    if (selectedCategories && selectedCategories.length > 0) {
      let items = [];
      for (let i = 0; i < selectedCategories.length; i++) {
        const TrendingItems = selectedCategories[i];
        let item = "";
        console.log("TrendingItems.layoutType", TrendingItems.layoutType);
        if (
          TrendingItems.layoutType === "SUB_CATEGORIES" ||
          TrendingItems.layoutType === "CATEGORIES"
        ) {
          item = {
            item: TrendingItems._id,
            type: TrendingItems.layoutType,
            name: TrendingItems.name,
            image: TrendingItems.image,
          };
        } else {
          item = {
            item: TrendingItems._id,
            type: TrendingItems.layoutType,
            name: TrendingItems.name,
            image: TrendingItems.image[0],
          };
        }

        items.push(item);
      }
      const body = {
        items: items,
      };
      console.log("hsitest", body.items);
      addTrendingItems(body, result => {
        if (result) {
          window.location.reload();
          // window.alert("create banner reload");
        }
      });
    }
  };

  // function changeHandler(evt) {
  //   console.log(
  //     evt.target.value,
  //     " values changed here are .. ",
  //     evt.target.name
  //   );
  //   const value = evt.target.value;
  //   setParams({
  //     ...params,
  //     [evt.target.name]: value,
  //   });
  // }

  // function onImageChange(e) {
  //   console.log("Hi");
  //   setImages([...e.target.files]);
  // }

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
          <Modal.Title className="realfoodcolor">
            Add Trending Items
          </Modal.Title>
          <div onClick={handleClose}>
            <i
              className="fa fa-window-close fa-2x"
              style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={createTrendingItems}>
            <div className="card-body">
              <div className="form-group">
                <label>Select Trending Items</label>

                {/* <label>Select Category(s)</label> */}
                <Multiselect
                  placeholder="Select Trending Item(s)"
                  className="bg-defaul realfoodcolor"
                  onSelect={onSelect}
                  options={categories}
                  displayValue="name"
                  onRemove={onRemove}
                  ref={selectCategoryRef}
                  required
                />
              </div>

              <div className="col-md-12 text-right">
                <button
                  type="submit"
                  className="btn btn-default"
                  style={{background: "#0b0e8e", color: "white"}}>
                  Add Trending Items
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
