import React, {useEffect, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {
  ADD_PRODUCTS,
  SUBCATEGORIES_OF_CATEGORY,
  CATEGORIES,
  USER,
} from "../../js/ApiEnds";
import {API_SERVER, API_KEY} from "./../../rest/ApiService.js";
import Multiselect from "multiselect-react-dropdown";

export default function EditProductForm(props) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const reload = () => window.location.reload();
  const selectCategoryRef = useRef();
  const [state, setState] = useState([]);
  const [tempCat, setTempCat] = useState([]);
  const [tempSubCat, setTempSubCat] = useState([]);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const [error, setError] = useState(false);
  const [iserror, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
    reload();
  };
  const [isChecked, setIsChecked] = useState(false);
  // console.log("Coming props here : ", props);
  useEffect(() => {
    setState({
      itemid: props.item._id,
      name: props.item.name,
      price: props.item.price,
      discount: props.item.discount,
      description: props.item.description,
      smallDescription: props.item.smallDescription,
      images: props.item.image,
      shippingInfo: props.item.shippingInfo,
      returnNotes: props.item.returnNotes,
      presentStock: props.item.presentStock,
      categories: props.item.categories,
      subCategories: props.item.subCategories,
    });

    setTempCat(props.item.categories);

    setTempSubCat(props.item.subCategories);
    // console.log("temp vaules", tempCat, tempSubCat);
  }, [props]);

  const handelChecked = e => {
    // console.log("eeeee", e);
    // console.log("ischecked log", isChecked);

    if (e == false) {
      setIsChecked(false);
    } else if (e == true) {
      setIsChecked(true);
    }
    // console.log("ischecked log", isChecked);
  };

  const onSelect = (selectedItemList, selectedItem) => {
    setSelectedCategories(selectedItemList);
    fetchSubCatagories(selectedItem, false);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedCategories(selectedList);
    fetchSubCatagories(removedItem, true);
  };

  const onSelectSubCategory = (selectedItemList, selectedItem) => {
    setSelectedSubCategories(selectedItemList);
  };

  const onRemoveSubCategory = (selectedItemList, selectedItem) => {
    setSelectedSubCategories(selectedItemList);
  };

  const fetchSubCatagories = (lastSelectedItem, isRemoved) => {
    // console.log(
    //   "lastSelectedItem Fetching sub categories of category : ",
    //   lastSelectedItem
    // );

    // console.log("isRemoved sub categories of category : ", isRemoved);

    if (isRemoved) {
      // console.log("isremoved subCategories", subCategories);
      setSubCategories(
        subCategories.filter(item => item._id === lastSelectedItem._id)
      );

      return;
    }
    const url =
      API_SERVER +
      SUBCATEGORIES_OF_CATEGORY +
      "?categoryId=" +
      lastSelectedItem._id;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        API_KEY: API_KEY,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(jsondata => {
        if (jsondata.data.length > 0) {
          // console.log(
          //   "Previous sub categories ",
          //   subCategories,
          //   " Present subcategory list : ",
          //   jsondata
          // );
          if (subCategories.length > 0) {
            setSubCategories([...subCategories, ...jsondata.data]);
          } else {
            setSubCategories(jsondata.data);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    const url =
      API_SERVER +
      CATEGORIES +
      "/" +
      USER +
      "/" +
      localStorage.getItem("userId");
    // console.log(url);

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        API_KEY: API_KEY,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(jsondata => {
        setCategories(jsondata.categories);
        // console.log(jsondata.categories);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const updateDetails = event => {
    setLoading(true);
    event.preventDefault();
    var regEx = /^[A-Za-z][A-Za-z_%,-.\s]*$/;
    var regEx1 = /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/;
    if (
      state.name == " " ||
      state.name.length == 0 ||
      !state.name.match(regEx)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      state.price == " " ||
      !state.price ||
      !state.discount ||
      !parseInt(state.price) >= parseInt(state.discount)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      !isNaN(state.description) ||
      state.description == " " ||
      state.description.length == 0 ||
      !state.description.match(regEx1)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      !isNaN(state.smallDescription) ||
      state.smallDescription == " " ||
      state.smallDescription.length == 0 ||
      !state.smallDescription.match(regEx1)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      !isNaN(state.shippingInfo) ||
      state.shippingInfo == " " ||
      state.shippingInfo.length == 0 ||
      !state.shippingInfo.match(regEx1)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      !isNaN(state.returnNotes) ||
      state.returnNotes == " " ||
      state.returnNotes.length == 0 ||
      !state.returnNotes.match(regEx1)
    ) {
      setLoading(false);
      setError(true);
    } else {
      setLoading(true);
      event.preventDefault();
      // console.log("isChecked", isChecked);
      const selectedCatId = [];
      const selectedSubCatId = [];
      if (isChecked == true) {
        if (selectedCategories || selectedSubCategories) {
          selectedCategories.map(item => {
            selectedCatId.push(item._id);
          });
          selectedSubCategories.map(item => {
            selectedSubCatId.push(item._id);
          });
        }
      } else if (isChecked == false) {
        state.categories.map(item => {
          selectedCatId.push(item._id);
        });
        selectedCategories.map(item => {
          selectedCatId.push(item._id);
        });
        state.subCategories.map(item => {
          selectedSubCatId.push(item._id);
        });
        selectedSubCategories.map(item => {
          selectedSubCatId.push(item._id);
        });
      }

      state.categories = selectedCatId;
      state.subCategories = selectedSubCatId;

      // console.log("selectedSubCatId", selectedSubCatId);
      // console.log("selectedCatId", selectedCatId);

      // alert("hello product");

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
        body: JSON.stringify(state),
      };

      fetch(API_SERVER + ADD_PRODUCTS + "/" + props.item._id, requestOptions)
        .then(response => response.json())
        .then(data => {
          window.scrollTo({top: 0, behavior: "smooth"});
          setShow(false);
          window.location.reload();
          window.location.href = `/products`;
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  function changeHandler(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  function varientNumber(e) {
    var regEx1 = /^[0-9]*$/;
    if (e.target.value.match(regEx1)) {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      // toast("Please enter positive number");
    }
  }

  return (
    <>
      <div
        onClick={handleShow}
        style={{cursor: "pointer", marginBottom: "10px"}}>
        <i
          className="fas fa-marker"
          style={{color: "#0b0e8e", marginRight: "10px"}}
        />
        Product
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="realfoodcolor">Edit Product</Modal.Title>
          <div onClick={handleClose}>
            <i
              className="fa fa-window-close fa-2x"
              style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={updateDetails}>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label>Product name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    value={state.name}
                    onChange={changeHandler}
                  />
                  {error && state.name.length <= 0 ? (
                    <label className="text-danger">
                      Product name should not be empty
                    </label>
                  ) : error &&
                    !state.name.match(/^[A-Za-z][A-Za-z_%,-.\s]*$/) ? (
                    <label className="text-danger">
                      Please enter valid product name
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  <label>Selected Category(s)</label>
                  <div
                    style={{
                      border: "1px solid #0b0e8e30",
                      borderRadius: "4px",
                      minHeight: "22px",
                      padding: "5px",
                    }}>
                    {state.categories && state.categories.length > 0
                      ? state.categories.map((tcat, index) => (
                          <span
                            key={index}
                            style={{
                              borderRadius: "25px",
                              color: "#0b0e8e",
                              alignItems: "center",
                              background: "#0b0e8e",
                              borderRadius: "11px",
                              color: "#fff",
                              display: "inlineFlex",
                              fontSize: "13px",
                              lineHeight: "19px",
                              marginBottom: "5px",
                              marginRight: "5px",
                              padding: "4px 10px",
                            }}>
                            {tcat.name}
                          </span>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  <label>Selected Sub Category(s)</label>
                  <div
                    style={{
                      border: "1px solid #0b0e8e30",
                      borderRadius: "4px",
                      minHeight: "22px",
                      padding: "5px",
                      position: "relative",
                    }}>
                    {state.subCategories && state.subCategories.length > 0
                      ? state.subCategories.map((tscat, index) => (
                          <span
                            key={index}
                            style={{
                              borderRadius: "25px",
                              color: "#0b0e8e",
                              alignItems: "center",
                              background: "#0b0e8e",
                              borderRadius: "11px",
                              color: "#fff",
                              display: "inlineFlex",
                              fontSize: "13px",
                              lineHeight: "19px",
                              marginBottom: "5px",
                              marginRight: "5px",
                              padding: "4px 10px",
                            }}>
                            {tscat.name}
                          </span>
                        ))
                      : "No Sub Category(s)"}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-sm-12 m-1">
                <div
                  style={{
                    // border: "1px solid #0b0e8e30",
                    borderRadius: "4px",
                    // minHeight: "22px",
                    padding: "5px",
                    position: "relative",
                  }}>
                  <div className="form-group m-0">
                    <label htmlFor="checkbox">
                      Update only with new categories and sub-categories
                    </label>
                    <input
                      type="checkbox"
                      id="checkbox"
                      onChange={e => handelChecked(e.target.checked)}
                      className="m-1"
                      style={{width: "20px", height: "20px"}}
                    />
                    <br />
                    <label>Select Category(s)</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  {/* <label>Select Category(s)</label>  */}

                  <Multiselect
                    placeholder="Update Category(s)"
                    className="bg-defaul realfoodcolor"
                    onSelect={onSelect}
                    options={categories}
                    displayValue="name"
                    onRemove={onRemove}
                    ref={selectCategoryRef}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                {subCategories && subCategories.length > 0 ? (
                  <div className="form-group">
                    {/* <label>Select Sub Category(s)</label>  */}
                    <Multiselect
                      placeholder="Update Sub Category(s)"
                      onSelect={onSelectSubCategory}
                      options={subCategories}
                      displayValue="name"
                      onRemove={onRemoveSubCategory}
                      ref={selectCategoryRef}
                      required
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-sm-12">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    pattern="^[0-9]+$"
                    className="form-control"
                    value={state.price}
                    onChange={varientNumber}
                  />
                  {error &&
                  parseInt(state.price) <= parseInt(state.discount) ? (
                    <label className="text-danger">
                      Price should be greater than discount amount
                    </label>
                  ) : error && state.price == "" ? (
                    <label className="text-danger">
                      Price should not be empty
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="form-group">
                  <label>Discount</label>
                  <input
                    type="number"
                    name="discount"
                    min="0"
                    pattern="^[0-9]+$"
                    className="form-control"
                    required
                    value={state.discount}
                    onChange={varientNumber}
                  />
                  {error &&
                  parseInt(state.price) <= parseInt(state.discount) ? (
                    <label className="text-danger">
                      Discount amount should be lesser than price
                    </label>
                  ) : error && state.discount == "" ? (
                    <label className="text-danger">
                      Discount should not be empty
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="form-group">
                  <label>Available Stock</label>
                  <input
                    type="number"
                    name="presentStock"
                    min="0"
                    pattern="^[0-9]+$"
                    className="form-control"
                    required
                    value={state.presentStock}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Description"
                    name="description"
                    onChange={changeHandler}
                    className="form-control"
                    required
                    value={state.description}></textarea>
                  {error && state.description.length <= 0 ? (
                    <label className="text-danger">
                      Description should not be empty
                    </label>
                  ) : error &&
                    !state.description.match(
                      /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/
                    ) ? (
                    <label className="text-danger">
                      Please enter valid Description
                    </label>
                  ) : error && !isNaN(state.description) ? (
                    <label className="text-danger">
                      Please enter valid description
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  <label>Small Description</label>
                  <textarea
                    placeholder="Small Description"
                    name="smallDescription"
                    onChange={changeHandler}
                    className="form-control"
                    required
                    value={state.smallDescription}></textarea>
                  {error && state.smallDescription.length <= 0 ? (
                    <label className="text-danger">
                      Small description should not be empty
                    </label>
                  ) : error &&
                    !state.smallDescription.match(
                      /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/
                    ) ? (
                    <label className="text-danger">
                      Please enter valid small description
                    </label>
                  ) : error && !isNaN(state.smallDescription) ? (
                    <label className="text-danger">
                      Please enter valid small description
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  <label>Shipping Information</label>
                  <textarea
                    placeholder="Shipping Info"
                    name="shippingInfo"
                    onChange={changeHandler}
                    className="form-control"
                    required
                    value={state.shippingInfo}></textarea>
                  {error && state.shippingInfo.length <= 0 ? (
                    <label className="text-danger">
                      Shipping information should not be empty
                    </label>
                  ) : error &&
                    !state.shippingInfo.match(
                      /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/
                    ) ? (
                    <label className="text-danger">
                      Please enter valid shipping information
                    </label>
                  ) : error && !isNaN(state.shippingInfo) ? (
                    <label className="text-danger">
                      Please enter valid shipping information
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  <label>Return Notes</label>
                  <textarea
                    placeholder="Return Notes"
                    name="returnNotes"
                    onChange={changeHandler}
                    className="form-control"
                    required
                    value={state.returnNotes}></textarea>
                  {error && state.returnNotes.length <= 0 ? (
                    <label className="text-danger">
                      Return notes should not be empty
                    </label>
                  ) : error &&
                    !state.returnNotes.match(
                      /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/
                    ) ? (
                    <label className="text-danger">
                      Please enter valid return notes
                    </label>
                  ) : error && !isNaN(state.returnNotes) ? (
                    <label className="text-danger">
                      Please enter valid return notes
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-right">
                <button
                  style={{margin: "20px"}}
                  type="submit"
                  className="btn btn-warning">
                  Update
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
