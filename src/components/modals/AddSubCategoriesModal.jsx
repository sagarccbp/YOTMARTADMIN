import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {CATEGORIES, SUB_CATEGORIES, UPLOADS, USER} from "../../js/ApiEnds";
import {storage} from "../../firebase";
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import Loader from "../../components/modals/Loader/Loader";
import Multiselect from "multiselect-react-dropdown";
import {API_SERVER} from "../../rest/ApiService";

// import {
//   CATEGORIES,
//   ADD_PRODUCTS,
//   SUBCATEGORIES_OF_CATEGORY,
//   UPLOADS,
//   USER,
// } from "../js/ApiEnds";

export default function AddSubCategoriesModal() {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();
  const [dropDownValues, setDropDownValues] = useState([]);
  const [layoutType, selectLayoutType] = useState([]);
  const handleClose = () => {
    setShow(false);
    reload();
  };
  const reload = () => window.location.reload();
  const handleShow = () => setShow(true);
  const [setBanners, setBannerItems] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const imageRef = useRef();
  const selectCategoryRef = useRef();
  const [categories, setCategories] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);
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
  const [state, setState] = React.useState({
    name: "",
    image: {
      x_l_large: {
        url: "",
      },
      l_large: {
        url: "",
      },
      l_medium: {
        url: "",
      },
      l_small: {
        url: "",
      },
      x_sm: {
        url: "",
      },
    },
    description: "",
    smallDescription: "",
    ownerId: localStorage.getItem("userId"),
  });

  function changeHandler(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  useEffect(() => {}, [selectedCategories]);

  const handleSelect = e => {
    setState({
      ...state,
      uiTheme: e,
    });
  };

  function onSelectImageXL(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImageXL(undefined);
      return;
    }
    setSelectedImageXL(e.target.files[0]);
  }
  function onSelectImageL(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImageL(undefined);
      return;
    }
    setSelectedImageL(e.target.files[0]);
  }
  function onSelectImageM(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImageM(undefined);
      return;
    }
    setSelectedImageM(e.target.files[0]);
  }
  function onSelectImageS(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImageS(undefined);
      return;
    }
    setSelectedImageS(e.target.files[0]);
  }
  function onSelectImageXS(e) {
    if (!e.target.files || e.target.files.length == 0) {
      setSelectedImageXS(undefined);
      setError(true);
      return;
    }
    setError(false);
    setSelectedImageXS(e.target.files[0]);
  }

  useEffect(() => {
    if (!selectedImageXL) {
      setPreviewXL(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImageXL);
    setPreviewXL(objectUrl);

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

  useEffect(() => {
    const url =
      API_SERVER +
      CATEGORIES +
      "/" +
      USER +
      "/" +
      localStorage.getItem("userId");
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
    })
      .then(res => {
        return res.json();
      })
      .then(jsondata => {
        setCategories(jsondata.categories);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const updateDetails = event => {
    setLoading(true);
    event.preventDefault();
    if (selectedCategories.length <= 0) {
      setLoading(false);
      setError(true);
      setMessage("Categories not specified");
      window.scrollTo({top: 0, behavior: "smooth"});
      return;
    }

    var regEx = /^[A-Za-z][A-Za-z_%,-.\s]*$/;
    var regEx1 = /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/;
    if (
      !selectedImageXL ||
      !selectedImageL ||
      !selectedImageM ||
      !selectedImageS ||
      !selectedImageXS
    ) {
      setLoading(false);
      setError(true);
      setMessage("You have not selected image");
      window.scrollTo({top: 0, behavior: "smooth"});
      return;
    } else if (
      state.name == " " ||
      state.name.length == 0 ||
      !state.name.match(regEx)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      state.description == " " ||
      state.description.length == 0 ||
      !state.description.match(regEx1)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      state.smallDescription == " " ||
      state.smallDescription.length == 0 ||
      !state.smallDescription.match(regEx1)
    ) {
      setLoading(false);
      setError(true);
    } else if (
      selectedImageXL &&
      selectedImageL &&
      selectedImageM &&
      selectedImageS &&
      selectedImageXS
    ) {
      setLoading(true);
      setMessage("");
      setError(false);
      let i;
      for (i = 1; i < 6; i++) {
        if (i == 1) {
          const imageRefXL = ref(
            storage,
            `images/subcategories/x_l_large/${v4() + selectedImageXL.name}`
          );
          uploadBytes(imageRefXL, selectedImageXL)
            .then(() => {
              getDownloadURL(imageRefXL)
                .then(url => {
                  state.image.x_l_large.url = url;

                  setIsUpload(false);
                })
                .catch(error => {
                  console.log(error.message, "error getting image url");
                });
            })
            .catch(error => {
              console.log(error.message);
            });
        } else if (i == 2) {
          const imageRefL = ref(
            storage,
            `images/subcategories/l_large/${v4() + selectedImageL.name}`
          );
          uploadBytes(imageRefL, selectedImageL)
            .then(() => {
              getDownloadURL(imageRefL)
                .then(url => {
                  state.image.l_large.url = url;

                  setIsUpload(false);
                })
                .catch(error => {
                  console.log(error.message, "error getting image url");
                });
            })
            .catch(error => {
              console.log(error.message);
            });
        } else if (i == 3) {
          const imageRefM = ref(
            storage,
            `images/subcategories/l_medium/${v4() + selectedImageM.name}`
          );
          uploadBytes(imageRefM, selectedImageM)
            .then(() => {
              getDownloadURL(imageRefM)
                .then(url => {
                  state.image.l_medium.url = url;

                  setIsUpload(false);
                })
                .catch(error => {
                  console.log(error.message, "error getting image url");
                });
            })
            .catch(error => {
              console.log(error.message);
            });
        } else if (i == 4) {
          const imageRefS = ref(
            storage,
            `images/subcategories/l_small/${v4() + selectedImageS.name}`
          );
          uploadBytes(imageRefS, selectedImageS)
            .then(() => {
              getDownloadURL(imageRefS)
                .then(url => {
                  state.image.l_small.url = url;

                  setIsUpload(false);
                })
                .catch(error => {
                  console.log(error.message, "error getting image url");
                });
            })
            .catch(error => {
              console.log(error.message);
            });
        } else if (i == 5) {
          setTimeout(function () {
            const imageRefXS = ref(
              storage,
              `images/subcategories/x_sm/${v4() + selectedImageXS.name}`
            );
            uploadBytes(imageRefXS, selectedImageXS)
              .then(() => {
                getDownloadURL(imageRefXS)
                  .then(url => {
                    state.image.x_sm.url = url;
                    setIsUpload(true);
                  })
                  .catch(error => {
                    console.log(error.message, "error getting image url");
                  });
              })
              .catch(error => {
                console.log(error.message);
              });
          }, 2000);
        }
      }
    }
  };
  useEffect(() => {
    if (isUpload == true) {
      setIsUpload(false);
      const requestBody = {
        name: state.name,
        image: state.image,
        description: state.description,
        smallDescription: state.smallDescription,
        categories: selectedCategories,
        ownerId: state.ownerId,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
        body: JSON.stringify(requestBody),
      };
      fetch(API_SERVER + SUB_CATEGORIES, requestOptions)
        .then(response => response.json())
        .then(data => {
          window.scrollTo({top: 0, behavior: "smooth"});
          // imageRef.current.value = "";
          setMessage(data.message);
          setState({
            name: "",
            description: "",
            smallDescription: "",
            image: {
              x_l_large: {
                url: "",
              },
              l_large: {
                url: "",
              },
              l_medium: {
                url: "",
              },
              l_small: {
                url: "",
              },
              x_sm: {
                url: "",
              },
            },
          });
          setSelectedImageXL("");
          setSelectedImageL("");
          setSelectedImageM("");
          setSelectedImageS("");
          setSelectedImageXS("");
          setPreviewXL("");
          setPreviewL("");
          setPreviewM("");
          setPreviewS("");
          setPreviewXS("");
          setSelectedCategories([]);
          // selectCategoryRef.current.resetSelectedValues();
          setLoading(false);
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
  const onSelect = selectedItemList => {
    setSelectedCategories(selectedItemList);
  };

  const onRemove = removedItem => {
    setSelectedCategories(removedItem);
  };

  // function onSelectImage(e) {
  //   console.log("Selected image here");
  //   if (!e.target.files || e.target.files.length === 0) {
  //     setSelectedImage(undefined);
  //     return;
  //   }
  //   setSelectedImage(e.target.files[0]);
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
      <Modal show={show} size="lg" onHide={handleClose}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">
                Add SubCategory
              </Modal.Title>
              <div onClick={handleClose}>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{color: "#0b0e8e"}}></i>
              </div>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={updateDetails}>
                <div className="form-group mb-2">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    value={state.name}
                    onChange={changeHandler}
                    placeholder="Sub-Category Name"
                  />
                  {error && state.name.length <= 0 ? (
                    <lable className="text-danger">
                      Please fill the details correctly..
                    </lable>
                  ) : error &&
                    !state.name.match(/^[A-Za-z][A-Za-z_%,-.\s]*$/) ? (
                    <lable className="text-danger">
                      Please fill the details correctly..
                    </lable>
                  ) : (
                    ""
                  )}
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group mb-2">
                      <label>Description</label>
                      <textarea
                        name="description"
                        className="form-control"
                        rows="6"
                        value={state.description}
                        onChange={changeHandler}
                        placeholder="Description"
                      />
                      {error && state.description.length <= 0 ? (
                        <lable className="text-danger">
                          Please fill the details correctly..
                        </lable>
                      ) : error &&
                        !state.description.match(
                          /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/
                        ) ? (
                        <lable className="text-danger">
                          Please fill the details correctly..
                        </lable>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group mb-2">
                      <label>Small Description</label>
                      <textarea
                        name="smallDescription"
                        className="form-control"
                        rows="6"
                        value={state.smallDescription}
                        onChange={changeHandler}
                        placeholder="Small Description"
                      />
                      {error && state.smallDescription.length <= 0 ? (
                        <lable className="text-danger">
                          Please fill the details correctly..
                        </lable>
                      ) : error &&
                        !state.smallDescription.match(
                          /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/
                        ) ? (
                        <lable className="text-danger">
                          Please fill the details correctly..
                        </lable>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Select Category(s)</label>
                  <Multiselect
                    style={{
                      backgroundColor: " #fdfdff",
                      borderColor: " #e4e6fc",
                      border: "1px solid #ced4da",
                      borderRadius: ".25rem",
                      transition:
                        "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                    }}
                    onSelect={onSelect}
                    options={categories}
                    displayValue="name"
                    onRemove={onRemove}
                    ref={selectCategoryRef}
                    placeholder="Select Categories"
                  />
                  {error && selectedCategories.length <= 0 ? (
                    <lable className="text-danger">
                      Please fill the details correctly..
                    </lable>
                  ) : (
                    ""
                  )}
                </div>

                <div className="row mb-2" style={{padding: "0px 15px"}}>
                  <label className="realfoodcolor">Select images</label>
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
                          Extra large
                        </th>
                        <th
                          scope="col"
                          className="p-1 text-center"
                          style={{height: "15px"}}>
                          Large
                        </th>
                        <th
                          scope="col"
                          className="p-1 text-center"
                          style={{height: "15px"}}>
                          Medium
                        </th>
                        <th
                          scope="col"
                          className="p-1 text-center"
                          style={{height: "15px"}}>
                          Small
                        </th>
                        <th
                          scope="col"
                          className="p-1 text-center"
                          style={{height: "15px"}}>
                          Extra small
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="col text-center">
                            <label
                              htmlFor="imagechangeXL"
                              className="file-upload image-upload-wrap text-default fs-4 mb-2">
                              <div
                                className="drag-text text-end"
                                htmlFor="imagechangeXL">
                                <h6 htmlFor="imagechangeXL">Click here</h6>
                                {selectedImageXL && (
                                  <img
                                    className="preview"
                                    src={previewXL}
                                    htmlFor="imagechangeXL"
                                  />
                                )}
                              </div>
                            </label>

                            <input
                              className="form-control mb-0 pb-0 bg-default  fs-4"
                              type="file"
                              ref={imageRefXL}
                              id="imagechangeXL"
                              name="imagechangeXL"
                              style={{display: "none"}}
                              onChange={onSelectImageXL}
                            />
                            {error && !selectedImageXL ? (
                              <lable className="text-danger">
                                Please select the image
                              </lable>
                            ) : (
                              ""
                            )}
                            {/* code  */}
                          </div>
                        </td>
                        <td>
                          <div className="col text-center">
                            <label
                              htmlFor="imagechangeL"
                              className="file-upload image-upload-wrap text-default fs-4 mb-2">
                              <div
                                className="drag-text text-end"
                                htmlFor="imagechangeL">
                                <h6 htmlFor="imagechangeL">Click here</h6>
                                {selectedImageL && (
                                  <img
                                    className="preview"
                                    src={previewL}
                                    htmlFor="imagechangeL"
                                  />
                                )}
                              </div>
                            </label>

                            <input
                              className="form-control mb-0 pb-0 bg-default  fs-4"
                              type="file"
                              ref={imageRefL}
                              id="imagechangeL"
                              name="imagechangeL"
                              style={{display: "none"}}
                              onChange={onSelectImageL}
                            />
                            {error && !selectedImageL ? (
                              <lable className="text-danger">
                                Please select the image
                              </lable>
                            ) : (
                              ""
                            )}
                            {/* uma code  */}
                          </div>
                        </td>
                        <td>
                          <div className="col text-center">
                            <label
                              htmlFor="imagechangeM"
                              className="file-upload image-upload-wrap text-default fs-4 mb-2">
                              <div
                                className="drag-text text-end"
                                htmlFor="imagechangeM">
                                <h6 htmlFor="imagechangeM">Click here</h6>
                                {selectedImageM && (
                                  <img
                                    className="preview"
                                    src={previewM}
                                    htmlFor="imagechangeM"
                                  />
                                )}
                              </div>
                            </label>

                            <input
                              className="form-control mb-0 pb-0 bg-default  fs-4"
                              type="file"
                              ref={imageRefM}
                              id="imagechangeM"
                              name="imagechangeM"
                              style={{display: "none"}}
                              onChange={onSelectImageM}
                            />
                            {error && !selectedImageM ? (
                              <lable className="text-danger">
                                Please select the image
                              </lable>
                            ) : (
                              ""
                            )}
                            {/* uma code  */}
                          </div>
                        </td>
                        <td>
                          <div className="col text-center">
                            <label
                              htmlFor="imagechangeS"
                              className="file-upload image-upload-wrap text-default fs-4 mb-2">
                              <div
                                className="drag-text text-end"
                                htmlFor="imagechangeS">
                                <h6 htmlFor="imagechangeS">Click here</h6>
                                {selectedImageS && (
                                  <img
                                    className="preview"
                                    src={previewS}
                                    htmlFor="imagechangeS"
                                  />
                                )}
                              </div>
                            </label>

                            <input
                              className="form-control mb-0 pb-0 bg-default  fs-4"
                              type="file"
                              ref={imageRefS}
                              id="imagechangeS"
                              name="imagechangeS"
                              style={{display: "none"}}
                              onChange={onSelectImageS}
                            />
                            {error && !selectedImageS ? (
                              <lable className="text-danger">
                                Please select the image
                              </lable>
                            ) : (
                              ""
                            )}
                            {/* uma code  */}
                          </div>
                        </td>
                        <td>
                          <div className="col text-center">
                            <label
                              htmlFor="imagechangeXS"
                              className="file-upload image-upload-wrap text-default fs-4 mb-2">
                              <div
                                className="drag-text text-end"
                                htmlFor="imagechangeXS">
                                <h6 htmlFor="imagechangeXS">Click here</h6>
                                {selectedImageXS && (
                                  <img
                                    className="preview"
                                    src={previewXS}
                                    htmlFor="imagechangeXS"
                                  />
                                )}
                              </div>
                            </label>

                            <input
                              className="form-control mb-0 pb-0 bg-default  fs-4"
                              type="file"
                              ref={imageRefXS}
                              id="imagechangeXS"
                              name="imagechangeXS"
                              style={{display: "none"}}
                              onChange={onSelectImageXS}
                            />
                            {error && !selectedImageXS ? (
                              <lable className="text-danger">
                                Please select the image
                              </lable>
                            ) : (
                              ""
                            )}
                            {/* code  */}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12 text-center  d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-default"
                    style={{background: "#0b0e8e", color: "white"}}>
                    Add Sub-Category
                  </button>
                </div>
              </form>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}
