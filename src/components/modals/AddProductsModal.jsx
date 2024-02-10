import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Multiselect from "multiselect-react-dropdown";
import Loader from "../../components/modals/Loader/Loader";
import {storage} from "../../firebase";
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import {
  CATEGORIES,
  ADD_PRODUCTS,
  SUBCATEGORIES_OF_CATEGORY,
  UPLOADS,
  USER,
} from "../../js/ApiEnds";
import {useForm} from "react-hook-form";
import {API_SERVER, API_KEY} from "./../../rest/ApiService.js";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProductModal() {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();
  const [dropDownValues, setDropDownValues] = useState([]);
  const [layoutType, selectLayoutType] = useState([]);
  const reload = () => window.location.reload();
  const handleClose = () => {
    setShow(false);
    reload();
  };
  const handleShow = () => setShow(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [address, setAddress] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const selectCategoryRef = useRef();
  const [previewXL, setPreviewXL] = useState();
  const [previewL, setPreviewL] = useState();
  const [previewM, setPreviewM] = useState();
  const [previewS, setPreviewS] = useState();
  const [previewXS, setPreviewXS] = useState();
  const [selectedImageXL, setSelectedImageXL] = useState();
  const [selectedImageL, setSelectedImageL] = useState();
  const [selectedImageM, setSelectedImageM] = useState();
  const [selectedImageS, setSelectedImageS] = useState();
  const [selectedImageXS, setSelectedImageXS] = useState();
  const imageRefXL = useRef();
  const imageRefL = useRef();
  const imageRefM = useRef();
  const imageRefS = useRef();
  const imageRefXS = useRef();
  const [isUpload, setIsUpload] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [imageXL, setImageXL] = useState();
  const [imageL, setImageL] = useState();
  const [imageM, setImageM] = useState();
  const [imageS, setImageS] = useState();
  const [imageXS, setImageXS] = useState();
  const [params, setParams] = useState({});
  const [iserror, setIsError] = useState(false);
  const [inputVarr, setInputVarr] = useState([]);
  const [imageArray, setImageArray] = useState([]);
  const [imageArray2, setImageArray2] = useState([]);
  const [tempUrlXL, setTempUrlXL] = useState("");
  const [tempUrlL, setTempUrlL] = useState("");
  const [tempUrlM, setTempUrlM] = useState("");
  const [tempUrlS, setTempUrlS] = useState("");
  const [tempUrlXS, setTempUrlXS] = useState("");
  const [error, setError] = useState(false);

  const [inputVarient, setInputVarient] = useState({
    name: "",
    discount: "",
    description: "",
    price: "",
    isStockAvailable: true,
  });
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
    if (isRemoved) {
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
    const url = API_SERVER + CATEGORIES;
    // "/" +
    // USER +
    // "/" +
    // localStorage.getItem("userId");
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

  const addItems = event => {
    setLoading(true);
    event.preventDefault();
    var regEx = /^[A-Za-z][A-Za-z_%,-.\s]*$/;
    var regEx1 = /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/;
    if (
      params.name == " " ||
      params.name.length == 0 ||
      !params.name.match(regEx)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      !isNaN(params.description) ||
      params.description == " " ||
      params.description.length == 0 ||
      !params.description.match(regEx1)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      !isNaN(params.smallDescription) ||
      params.smallDescription == " " ||
      params.smallDescription.length == 0 ||
      !params.smallDescription.match(regEx1)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      !isNaN(params.shippingInfo) ||
      params.shippingInfo == " " ||
      params.shippingInfo.length == 0 ||
      !params.shippingInfo.match(regEx1)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      !isNaN(params.returnNotes) ||
      params.returnNotes == " " ||
      params.returnNotes.length == 0 ||
      !params.returnNotes.match(regEx1)
    ) {
      setLoading(false);
      setError(true);
    } else if (selectedCategories == "" || selectedCategories.length == 0) {
      setLoading(false);
      setError(true);
    } else if (
      selectedSubCategories == "" ||
      selectedSubCategories.length == 0
    ) {
      setLoading(false);
      setError(true);
    } else {
      setLoading(true);
      const selectedCatId = [];
      const selectedSubCatId = [];
      selectedCategories.map(item => {
        selectedCatId.push(item._id);
      });
      selectedSubCategories.map(item => {
        selectedSubCatId.push(item._id);
      });
      let myPayload = "";
      if (inputVarr == "") {
        let defaultvariant = [
          {
            name: params.name,
            description: params.description,
            price: params.price,
            isStockAvailable: true,
            discount: params.discount,
          },
        ];
        myPayload = {
          categories: selectedCatId,
          subCategories: selectedSubCatId,
          name: params.name,
          price: params.price,
          discount: params.discount,
          presentStock: params.presentStock,
          ownerId: localStorage.getItem("userId"),
          returnNotes: params.returnNotes,
          shippingInfo: params.shippingInfo,
          description: params.description,
          smallDescription: params.smallDescription,
          shippingCharges: params.shippingCharges,
          varients: defaultvariant,
          // varients: inputVarr,
          shippingCharges: "0",
        };
      } else {
        // console.log("submit-inputVarr", inputVarr);
        myPayload = {
          categories: selectedCatId,
          subCategories: selectedSubCatId,
          name: params.name,
          price: params.price,
          discount: params.discount,
          presentStock: params.presentStock,
          ownerId: localStorage.getItem("userId"),
          returnNotes: params.returnNotes,
          shippingInfo: params.shippingInfo,
          description: params.description,
          smallDescription: params.smallDescription,
          shippingCharges: params.shippingCharges,
          varients: inputVarr,
          shippingCharges: "0",
        };
      }

      // console.log("submit", myPayload);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
        body: JSON.stringify(myPayload),
      };
      fetch(API_SERVER + ADD_PRODUCTS, requestOptions)
        .then(response => response.json())
        .then(data => {
          window.location.reload();
          // console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  // const createItems = urls => {
  //   alert("Inside2");
  //   console.log("urls console", urls);

  // };

  function changeHandler(evt) {
    // console.log(
    //   evt.target.value,
    //   " values changed here are .. ",
    //   evt.target.name
    // );
    const value = evt.target.value;
    setParams({
      ...params,
      [evt.target.name]: value,
    });
  }
  // console.log("params", params);

  function onSelectImageXL(e) {
    // console.log("Selected image here");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImageXL(undefined);
      return;
    }
    setSelectedImageXL(e.target.files[0]);
    // console.log("images", selectedImageXL);
  }
  function onSelectImageL(e) {
    // console.log("Selected image here");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImageL(undefined);
      return;
    }
    setSelectedImageL(e.target.files[0]);
  }
  function onSelectImageM(e) {
    // console.log("Selected image here");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImageM(undefined);
      return;
    }
    setSelectedImageM(e.target.files[0]);
  }
  function onSelectImageS(e) {
    // console.log("Selected image here");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImageS(undefined);
      return;
    }
    setSelectedImageS(e.target.files[0]);
  }
  function onSelectImageXS(e) {
    // console.log("Selected image here");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImageXS(undefined);
      return;
    }
    setSelectedImageXS(e.target.files[0]);
  }

  useEffect(() => {
    if (!selectedImageXL) {
      setPreviewXL(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImageXL);
    setPreviewXL(objectUrl);
    // console.log("images2nd", selectedImageXL);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImageXL]);

  useEffect(() => {
    if (!selectedImageL) {
      setPreviewL(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImageL);
    setPreviewL(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImageL]);

  useEffect(() => {
    if (!selectedImageM) {
      setPreviewM(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImageM);
    setPreviewM(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImageM]);

  useEffect(() => {
    if (!selectedImageS) {
      setPreviewS(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImageS);
    setPreviewS(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImageS]);

  useEffect(() => {
    if (!selectedImageXS) {
      setPreviewXS(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImageXS);
    setPreviewXS(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImageXS]);

  const handleDelete = name => {
    var index = inputVarr
      .map(function (e) {
        return e.name;
      })
      .indexOf(name);
    inputVarr.splice(index, 1);
    setInputVarient(inputVarr => inputVarr + 1);
  };

  const handleDeleteImage = (x_l_large, l_large, l_medium, l_small, x_sm) => {
    var index = imageArray
      .map(function (e) {
        return e.x_l_large;
      })
      .indexOf(x_l_large, l_large, l_medium, l_small, x_sm);
    imageArray.splice(index, 1);
    setInputVarient(imageArray => imageArray + 1);
  };

  function varientNumber(e) {
    var regEx1 = /^[0-9]*$/;
    if (e.target.value.match(regEx1)) {
      setInputVarient({
        ...inputVarient,
        [e.target.name]: e.target.value,
      });
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      toast("Please enter positive number");
    }
  }

  function varientText(e) {
    var regEx1 = /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/;
    if (e.target.value.match(regEx1)) {
      setInputVarient({
        ...inputVarient,
        [e.target.name]: e.target.value,
      });
    } else {
      setInputVarient("");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      // toast("Please enter positive number");
    }
  }
  // console.log("inputVarient.discount", inputVarient.discount);
  // console.log("inputVarient.price", inputVarient.price);

  function addImages() {
    if (
      selectedImageXL &&
      selectedImageL &&
      selectedImageM &&
      selectedImageS &&
      selectedImageXS
    ) {
      setImageArray([
        ...imageArray,
        {
          x_l_large: selectedImageXL,
          l_large: selectedImageL,
          l_medium: selectedImageM,
          l_small: selectedImageS,
          x_sm: selectedImageXS,
        },
      ]);
      setSelectedImageXL("");
      setSelectedImageL("");
      setSelectedImageM("");
      setSelectedImageS("");
      setSelectedImageXS("");
      // console.log("array of images", imageArray);
    }
  }
  function addvarientText() {
    if (
      inputVarient &&
      inputVarient.name &&
      inputVarient.description &&
      inputVarient.price &&
      inputVarient.discount &&
      parseInt(inputVarient.price) >= parseInt(inputVarient.discount)
    ) {
      setInputVarr([
        ...inputVarr,
        {
          name: inputVarient.name,
          description: inputVarient.description,
          price: inputVarient.price,
          isStockAvailable: true,
          discount: inputVarient.discount,
        },
      ]);
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      // toast("Please fill all the details correctly to add new varient");
    }
    setInputVarient({
      ...inputVarient,
      name: "",
      discount: "",
      description: "",
      price: "",
      isStockAvailable: "",
    });
  }
  // console.log("arrayelements", inputVarr);

  return (
    <>
      <ToastContainer />
      <div
        onClick={handleShow}
        className="btn btn-default ml-1"
        style={{background: "#0b0e8e", color: "white"}}>
        <i className="fas fa-plus m-0">
          <span className="ml-1">Add</span>
        </i>
      </div>
      <Modal size="xl" show={show} onHide={handleClose}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">Add Products</Modal.Title>
              <div onClick={handleClose} style={{cursor: "pointer"}}>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{color: "#0b0e8e"}}></i>
              </div>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={addItems}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Product Name</label>
                        <input
                          // onChange={e => setProductName(e.target.value)}
                          onChange={changeHandler}
                          name="name"
                          placeholder="Product Name"
                          className="form-control"
                          required
                        />

                        {error && params.name.length <= 0 ? (
                          <label className="text-danger">
                            Product name can't be empty
                          </label>
                        ) : error &&
                          !params.name.match(/^[A-Za-z][A-Za-z_%,-.\s]*$/) ? (
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
                        <label>Select Category(s)</label>
                        <Multiselect
                          placeholder="Select Category(s)"
                          className="bg-defaul realfoodcolor"
                          onSelect={onSelect}
                          options={categories}
                          displayValue="name"
                          onRemove={onRemove}
                          ref={selectCategoryRef}
                          required
                        />
                        {error && selectedCategories.length == 0 ? (
                          <label className="text-danger">
                            Please select the Categories and subcategories
                          </label>
                        ) : error && selectedSubCategories.length == 0 ? (
                          <label className="text-danger">
                            Please select the SubCategories
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      {subCategories && subCategories.length > 0 ? (
                        <div className="form-group">
                          <label>Select Sub Category(s)</label>
                          <Multiselect
                            placeholder="Select Sub Category(s)"
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
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label>Select Address</label>
                        <select
                          name="role"
                          id="roles"
                          className="form-control"
                          // value={userData.role}
                          // onChange={changeHandler}
                        >
                          <option value="ADD1">
                            {" "}
                            Sagar,9849252590,534123,penugonda,D no:2-175/4,deva
                            village,penugonda mandal,west godavari
                            district,andhrapradesh,near bus stand,9030189967
                          </option>
                          <option value="ADD2">
                            {" "}
                            Sagar,9849252590,534123,penugonda,D no:2-175/4,deva
                            village,penugonda mandal,west godavari
                            district,andhrapradesh,near bus stand,9030189967
                          </option>
                          <option value="ADD3">
                            {" "}
                            Sagar,9849252590,534123,penugonda,D no:2-175/4,deva
                            village,penugonda mandal,west godavari
                            district,andhrapradesh,near bus stand,9030189967
                          </option>
                          <option value="ADD4">
                            {" "}
                            Sagar,9849252590,534123,penugonda,D no:2-175/4,deva
                            village,penugonda mandal,west godavari
                            district,andhrapradesh,near bus stand,9030189967
                          </option>
                        </select>
                        {/* {error && selectedCategories.length == 0 ? (
                          <label className="text-danger">
                            Please select the Categories and subcategories
                          </label>
                        ) : error && selectedSubCategories.length == 0 ? (
                          <label className="text-danger">
                            Please select the SubCategories
                          </label>
                        ) : (
                          ""
                        )} */}
                      </div>
                    </div>
                  </div>

                  <p>
                    <a
                      data-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      className="btn btn-default ml-1"
                      style={{background: "#0b0e8e", color: "white"}}>
                      Add Variants
                    </a>
                  </p>
                  <div className="collapse" id="collapseExample">
                    <div className="card card-body p-0">
                      <table className="table table-sm">
                        <thead
                          style={{
                            backgroundColor: "#ffe6b3",
                            borderLeft: "1px solid #e5e5e5",
                          }}>
                          <tr>
                            <th
                              scope="col"
                              className="p-1 text-center"
                              style={{height: "15px"}}>
                              Name
                            </th>
                            <th
                              scope="col"
                              className="p-1 text-center"
                              style={{height: "15px"}}>
                              Discount
                            </th>
                            <th
                              scope="col"
                              className="p-1 text-center"
                              style={{height: "15px"}}>
                              Description
                            </th>
                            <th
                              scope="col"
                              className="p-1 text-center"
                              style={{height: "15px"}}>
                              Price
                            </th>
                            {/* <th
                          scope="col"
                          className="p-1 text-center"
                          style={{ height: "15px" }}
                        >
                          IS Stock Available
                        </th> */}
                            <th
                              scope="col"
                              className="p-1 text-center"
                              style={{height: "15px"}}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {inputVarr && inputVarr.length > 0
                            ? inputVarr.map((vitem, index) => (
                                <tr key={index}>
                                  <td
                                    className=" m-1 p-1 text-center"
                                    style={{height: "15px"}}>
                                    {vitem.name}
                                  </td>
                                  <td
                                    className=" m-1 p-1 text-center"
                                    style={{height: "15px"}}>
                                    {vitem.discount}
                                  </td>
                                  <td
                                    className=" m-1 p-1 text-center"
                                    style={{height: "15px"}}>
                                    {vitem.description}
                                  </td>
                                  <td
                                    className=" m-1 p-1 text-center"
                                    style={{height: "15px"}}>
                                    {vitem.price}
                                  </td>

                                  <td
                                    className=" m-1 p-1 text-center"
                                    style={{height: "15px"}}>
                                    <div>
                                      <a
                                        className="btn btn-default"
                                        style={{
                                          background: "#ffffff",
                                          color: "white",
                                          margin: "0px",
                                          padding: "0px",
                                        }}
                                        onClick={() =>
                                          handleDelete(vitem.name)
                                        }>
                                        <i
                                          className="fa fa-trash fa-lg"
                                          style={{
                                            color: "#0b0e8e",
                                            margin: "0px",
                                            padding: "0px",
                                          }}
                                        />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                          <tr>
                            <td>
                              <input
                                type="text"
                                name="name"
                                className="form-control form-control-sm p-1 text-center"
                                value={inputVarient.name}
                                placeholder="Name"
                                onChange={varientText}
                              />
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <div>
                                  <input
                                    type="number"
                                    min="0"
                                    max={inputVarient.price}
                                    // pattern="^[0-9]*$"
                                    name="discount"
                                    className="form-control form-control-sm p-1 text-center"
                                    placeholder="discount"
                                    value={inputVarient.discount}
                                    onChange={varientNumber}
                                  />
                                </div>
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                name="description"
                                className="form-control form-control-sm p-1 text-center"
                                value={inputVarient.description}
                                placeholder="Description"
                                onChange={varientText}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="price"
                                min="0"
                                // pattern="^[0-9]*$"
                                className="form-control form-control-sm p-1 text-center"
                                value={inputVarient.price}
                                placeholder="Price"
                                onChange={varientNumber}
                              />
                            </td>
                            <td className="text-center">
                              <div>
                                <a
                                  className="btn btn-default"
                                  style={{
                                    background: "#ffffff",
                                    color: "white",
                                    margin: "0px",
                                    padding: "0px",
                                  }}
                                  onClick={addvarientText}>
                                  <i
                                    className="fa fa-plus-circle fa-2x"
                                    style={{
                                      color: "#0b0e8e",
                                      margin: "0px",
                                      padding: "0px",
                                    }}
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {iserror && inputVarient.name == "" ? (
                        <div class="alert text-danger m-2 p-0">
                          Please validate the variants value.
                        </div>
                      ) : iserror &&
                        inputVarient.discount <= inputVarient.price ? (
                        <div class="alert text-danger m-2 p-0">
                          Please Check the discount price, Discount price should
                          be lesser than acutal price
                        </div>
                      ) : iserror && inputVarient.description == "" ? (
                        <div class="alert text-danger m-2 p-0">
                          Please validate the variants value.
                        </div>
                      ) : iserror &&
                        inputVarient.discount <= inputVarient.price ? (
                        <div class="alert text-danger m-2 p-0">
                          Please validate the variants value.
                        </div>
                      ) : iserror ? (
                        <div className="alert text-danger m-2 p-0">
                          Please fill all the variant details correctly.
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-sm-12">
                      <div className="form-group">
                        <label>Price</label>
                        <input
                          placeholder="Price"
                          onChange={changeHandler}
                          type="number"
                          name="price"
                          className="form-control"
                          min="0"
                          pattern="^[0-9]*$"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <div className="form-group">
                        <label>Discount</label>
                        <input
                          placeholder="Flat discount amount(Rs)"
                          onChange={changeHandler}
                          type="number"
                          name="discount"
                          className="form-control"
                          min="0"
                          max={params.price}
                          pattern="^[0-9]*$"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <div className="form-group">
                        <label>Available Stock</label>
                        <input
                          placeholder="Available Stock"
                          onChange={changeHandler}
                          type="number"
                          name="presentStock"
                          className="form-control"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <div className="form-group">
                        <label>Shipping Charges</label>
                        <input
                          placeholder="Shipping Charges"
                          onChange={changeHandler}
                          type="number"
                          name="shippingCharges"
                          className="form-control"
                          min="0"
                          required
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
                          required></textarea>
                        {error && params.description.length <= 0 ? (
                          <label className="text-danger">
                            Description can't be empty
                          </label>
                        ) : error &&
                          !params.description.match(
                            /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/
                          ) ? (
                          <label className="text-danger">
                            Please enter valid description
                          </label>
                        ) : error && !isNaN(params.description) ? (
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
                          required></textarea>
                        {error && params.smallDescription.length <= 0 ? (
                          <label className="text-danger">
                            Small description can't be empty
                          </label>
                        ) : error &&
                          !params.smallDescription.match(
                            /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/
                          ) ? (
                          <label className="text-danger">
                            Please enter valid Small description
                          </label>
                        ) : error && !isNaN(params.smallDescription) ? (
                          <label className="text-danger">
                            Please enter valid Small description
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
                        <label>Shipping notes</label>
                        <textarea
                          placeholder="Shipping information"
                          name="shippingInfo"
                          onChange={changeHandler}
                          className="form-control"
                          required></textarea>
                        {error && params.shippingInfo.length <= 0 ? (
                          <label className="text-danger">
                            Shipping information can't be empty
                          </label>
                        ) : error &&
                          !params.shippingInfo.match(
                            /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/
                          ) ? (
                          <label className="text-danger">
                            Please enter valid shipping information
                          </label>
                        ) : error && !isNaN(params.shippingInfo) ? (
                          <label className="text-danger">
                            Please enter valid shipping information
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      {" "}
                      <div className="form-group">
                        <label>Return notes</label>
                        <textarea
                          placeholder="Return notes"
                          name="returnNotes"
                          onChange={changeHandler}
                          className="form-control"
                          required></textarea>
                        {error && params.returnNotes.length <= 0 ? (
                          <label className="text-danger">
                            Return notes can't be empty
                          </label>
                        ) : error &&
                          !params.returnNotes.match(
                            /^[A-Za-z0-9_%,-.][A-Za-z0-9_%,-.\s]*$/
                          ) ? (
                          <label className="text-danger">
                            Please enter valid return notes
                          </label>
                        ) : error && !isNaN(params.returnNotes) ? (
                          <label className="text-danger">
                            Please enter valid return notes
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 text-right">
                    <button
                      type="submit"
                      className="btn btn-default"
                      style={{background: "#0b0e8e", color: "white"}}>
                      Add Products
                    </button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}
