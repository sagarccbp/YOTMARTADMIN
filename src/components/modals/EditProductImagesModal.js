import React, {useEffect, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {
  ADD_PRODUCTS,
  SUBCATEGORIES_OF_CATEGORY,
  CATEGORIES,
  USER,
} from "../../js/ApiEnds";
import Loader from "../../components/modals/Loader/Loader";
import {API_SERVER, API_KEY} from "./../../rest/ApiService.js";
import Multiselect from "multiselect-react-dropdown";
import {storage} from "../../firebase";
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";

export default function EditProductImagesModal(props) {
  const reload = () => window.location.reload();
  const selectCategoryRef = useRef();
  const [state, setState] = useState([]);
  const [tempCat, setTempCat] = useState([]);
  const [tempSubCat, setTempSubCat] = useState([]);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
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
  const [isUpload, setIsUpload] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);

  const handleClose = () => {
    setShow(false);
    reload();
  };
  useEffect(() => {
    setState(props.item.image);
    if (props.item.image) {
      setImageArray(props.item.image);
    }
    console.log("props.item.image", props.item.image);
  }, [props]);

  const handleDeleteImage = x_l_large => {
    var index = imageArray
      .map(function (e) {
        return e.x_l_large.url;
      })
      .indexOf(x_l_large);
    imageArray.splice(index, 1);
    setImageArray2(imageArray => imageArray + 1);
  };
  console.log("imageArray", imageArray);
  useEffect(() => {}, [imageArray]);
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

  function addImages() {
    if (
      selectedImageXL &&
      selectedImageL &&
      selectedImageM &&
      selectedImageS &&
      selectedImageXS
    ) {
      setMessage(true);
      setLoading(true);
      setError(false);
      const imageRefXL = ref(
        storage,
        `images/products/x_l_large/${v4() + selectedImageXL.name}`
      );
      uploadBytes(imageRefXL, selectedImageXL)
        .then(() => {
          getDownloadURL(imageRefXL)
            .then(url => {
              setImageXL(url);
              // setIsUpload(false);
            })
            .catch(error => {
              console.log(error.message, "error getting image url");
            });
        })
        .catch(error => {
          console.log(error.message);
        });

      const imageRefL = ref(
        storage,
        `images/products/l_large/${v4() + selectedImageL.name}`
      );

      uploadBytes(imageRefL, selectedImageL)
        .then(() => {
          getDownloadURL(imageRefL)
            .then(url => {
              setImageL(url);

              setIsUpload(false);
            })
            .catch(error => {
              console.log(error.message, "error getting image url");
            });
        })
        .catch(error => {
          console.log(error.message);
        });

      const imageRefM = ref(
        storage,
        `images/products/l_medium/${v4() + selectedImageM.name}`
      );

      uploadBytes(imageRefM, selectedImageM)
        .then(() => {
          getDownloadURL(imageRefM)
            .then(url => {
              setImageM(url);

              setIsUpload(false);
            })
            .catch(error => {
              console.log(error.message, "error getting image url");
            });
        })
        .catch(error => {
          console.log(error.message);
        });

      const imageRefS = ref(
        storage,
        `images/products/l_small/${v4() + selectedImageS.name}`
      );

      uploadBytes(imageRefS, selectedImageS)
        .then(() => {
          getDownloadURL(imageRefS)
            .then(url => {
              setImageS(url);
              setIsUpload(false);
            })
            .catch(error => {
              console.log(error.message, "error getting image url");
            });
        })
        .catch(error => {
          console.log(error.message);
        });

      const imageRefXS = ref(
        storage,
        `images/products/x_sm/${v4() + selectedImageXS.name}`
      );

      uploadBytes(imageRefXS, selectedImageXS).then(() => {
        getDownloadURL(imageRefXS)
          .then(url => {
            setImageXS(url);
          })
          .catch(error => {
            console.log(error.message);
          });
      });

      setSelectedImageXL("");
      setSelectedImageL("");
      setSelectedImageM("");
      setSelectedImageS("");
      setSelectedImageXS("");
      setLoading(false);
      setTimeout(function () {
        setMessage(false);
      }, 5000);
    } else {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    if (imageXL && imageL && imageM && imageS && imageXS) {
      setImageArray([
        ...imageArray,
        {
          x_l_large: {url: imageXL},
          l_large: {url: imageL},
          l_medium: {url: imageM},
          l_small: {url: imageS},
          x_sm: {url: imageXS},
        },
      ]);
      setImageXL("");
      setImageL("");
      setImageM("");
      setImageS("");
      setImageXS("");
    }
  }, [imageXL, imageL, imageM, imageS, imageXS, imageArray]);
  console.log("props.item._id", props.item);

  const updateDetails = event => {
    console.log("inside imagearray", imageArray);
    setLoading(true);
    event.preventDefault();
    let myPayload = "";
    if (imageArray.length == 0) {
      myPayload = {
        image: null,
      };
    } else {
      myPayload = {
        image: imageArray,
      };
    }
    console.log("mypayload", myPayload);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
      body: JSON.stringify(myPayload),
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
    setLoading(false);
  };

  return (
    <>
      <div
        onClick={handleShow}
        style={{cursor: "pointer", marginBottom: "10px"}}>
        <i
          className="fas fa-marker"
          style={{color: "#0b0e8e", marginRight: "10px"}}
        />
        Images
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">
                Add/Delete Images
              </Modal.Title>
              <div onClick={handleClose}>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{color: "#0b0e8e"}}></i>
              </div>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={updateDetails}>
                <div className="row">
                  <div className="col-lg-12">
                    <p>
                      <a
                        data-toggle="collapse"
                        href="#collapseExampleImage"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                        className="btn btn-default ml-1"
                        style={{background: "#0b0e8e", color: "white"}}>
                        Add Images
                      </a>
                    </p>
                    <div className="collapse" id="collapseExampleImage">
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
                                className="p-1 text-left"
                                style={{height: "15px"}}>
                                Extra large
                              </th>
                              <th
                                scope="col"
                                className="p-1 text-left"
                                style={{height: "15px"}}>
                                Large
                              </th>
                              <th
                                scope="col"
                                className="p-1 text-left"
                                style={{height: "15px"}}>
                                Medium
                              </th>
                              <th
                                scope="col"
                                className="p-1 text-left"
                                style={{height: "15px"}}>
                                Small
                              </th>
                              <th
                                scope="col"
                                className="p-1 text-left"
                                style={{height: "15px"}}>
                                Extra small
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
                                className="p-1 text-left"
                                style={{height: "15px"}}>
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {imageArray && imageArray.length > 0
                              ? imageArray.map((imageI, index) => (
                                  <tr key={index}>
                                    <td className="p-1 text-left">
                                      <img
                                        style={{border: "1px solid gray"}}
                                        className="preview text-left"
                                        src={
                                          !imageArray ||
                                          !imageI ||
                                          !imageI.x_l_large ||
                                          !imageI.x_l_large.url
                                            ? "No image"
                                            : imageI.x_l_large.url
                                        }
                                      />
                                    </td>
                                    <td className="p-1 text-left">
                                      <img
                                        style={{border: "1px solid gray"}}
                                        className="preview text-left"
                                        src={
                                          !imageArray ||
                                          !imageI ||
                                          !imageI.l_large ||
                                          !imageI.l_large.url
                                            ? ""
                                            : imageI.l_large.url
                                        }
                                      />
                                    </td>
                                    <td className="p-1 text-left">
                                      <img
                                        style={{border: "1px solid gray"}}
                                        className="preview"
                                        src={
                                          !imageArray ||
                                          !imageI ||
                                          !imageI.l_medium ||
                                          !imageI.l_medium.url
                                            ? ""
                                            : imageI.l_medium.url
                                        }
                                      />
                                    </td>
                                    <td className="p-1 text-left">
                                      <img
                                        style={{border: "1px solid gray"}}
                                        className="preview"
                                        src={
                                          !imageArray ||
                                          !imageI ||
                                          !imageI.l_small ||
                                          !imageI.l_small.url
                                            ? ""
                                            : imageI.l_small.url
                                        }
                                      />
                                    </td>
                                    <td className="p-1 text-left">
                                      <img
                                        style={{border: "1px solid gray"}}
                                        className="preview"
                                        src={
                                          !imageArray ||
                                          !imageI ||
                                          !imageI.x_sm ||
                                          !imageI.x_sm.url
                                            ? ""
                                            : imageI.x_sm.url
                                        }
                                      />
                                    </td>
                                    {/* {imageArray && imageArray.length == 1 ? (
                                      ""
                                    ) : ( */}
                                    <td className="p-1 text-left">
                                      <div
                                        onClick={() =>
                                          handleDeleteImage(
                                            imageI.x_l_large.url
                                          )
                                        }
                                        alt="Delete images">
                                        <i
                                          className="fa fa-trash"
                                          style={{
                                            color: "#0b0e8e",
                                            marginRight: "10px",
                                          }}
                                        />
                                      </div>
                                    </td>
                                    {/* )} */}
                                  </tr>
                                ))
                              : ""}

                            <tr>
                              <td>
                                <label
                                  htmlFor="x_l_large"
                                  className="file-upload image-upload-wrap text-default fs-4 mb-2">
                                  <div
                                    className="drag-text text-end"
                                    htmlFor="x_l_large">
                                    <h6 htmlFor="x_l_large">Click here</h6>
                                    {selectedImageXL && (
                                      <img
                                        className="preview"
                                        src={previewXL}
                                        htmlFor="x_l_large"
                                      />
                                    )}
                                  </div>
                                </label>

                                <input
                                  className="form-control mb-0 pb-0 bg-default  fs-4"
                                  type="file"
                                  ref={imageRefXL}
                                  id="x_l_large"
                                  name="x_l_large"
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
                              </td>
                              <td>
                                <label
                                  htmlFor="l_large"
                                  className="file-upload image-upload-wrap text-default fs-4 mb-2">
                                  <div
                                    className="drag-text text-end"
                                    htmlFor="l_large">
                                    <h6 htmlFor="l_large">Click here</h6>
                                    {selectedImageL && (
                                      <img
                                        className="preview"
                                        src={previewL}
                                        htmlFor="l_large"
                                      />
                                    )}
                                  </div>
                                </label>

                                <input
                                  className="form-control mb-0 pb-0 bg-default  fs-4"
                                  type="file"
                                  ref={imageRefL}
                                  id="l_large"
                                  name="l_large"
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
                              </td>
                              <td>
                                <label
                                  htmlFor="l_medium"
                                  className="file-upload image-upload-wrap text-default fs-4 mb-2">
                                  <div
                                    className="drag-text text-end"
                                    htmlFor="l_medium">
                                    <h6 htmlFor="l_medium">Click here</h6>
                                    {selectedImageM && (
                                      <img
                                        className="preview"
                                        src={previewM}
                                        htmlFor="l_medium"
                                      />
                                    )}
                                  </div>
                                </label>

                                <input
                                  className="form-control mb-0 pb-0 bg-default  fs-4"
                                  type="file"
                                  ref={imageRefM}
                                  id="l_medium"
                                  name="l_medium"
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
                              </td>
                              <td>
                                <label
                                  htmlFor="l_sm"
                                  className="file-upload image-upload-wrap text-default fs-4 mb-2">
                                  <div
                                    className="drag-text text-end"
                                    htmlFor="l_sm">
                                    <h6 htmlFor="l_sm">Click here</h6>
                                    {selectedImageS && (
                                      <img
                                        className="preview"
                                        src={previewS}
                                        htmlFor="l_sm"
                                      />
                                    )}
                                  </div>
                                </label>

                                <input
                                  className="form-control mb-0 pb-0 bg-default  fs-4"
                                  type="file"
                                  ref={imageRefS}
                                  id="l_sm"
                                  name="l_sm"
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
                              </td>
                              <td>
                                <label
                                  htmlFor="x_sm"
                                  className="file-upload image-upload-wrap text-default fs-4 mb-2">
                                  <div
                                    className="drag-text text-end"
                                    htmlFor="x_sm">
                                    <h6 htmlFor="x_sm">Click here</h6>
                                    {selectedImageXS && (
                                      <img
                                        className="preview"
                                        src={previewXS}
                                        htmlFor="x_sm"
                                      />
                                    )}
                                  </div>
                                </label>

                                <input
                                  className="form-control mb-0 pb-0 bg-default  fs-4"
                                  type="file"
                                  ref={imageRefXS}
                                  id="x_sm"
                                  name="x_sm"
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
                              </td>
                              <td>
                                <div>
                                  <div onClick={addImages} alt="Add Image">
                                    <i
                                      className="fa fa-plus-circle fa-2x"
                                      style={{
                                        color: "#0b0e8e",
                                        marginLeft: "10px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {message ? (
                          <label className="text-danger">
                            Please wait, images are loading
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
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
          </>
        )}
      </Modal>
    </>
  );
}
