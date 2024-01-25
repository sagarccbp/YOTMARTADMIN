import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {storage} from "../../firebase";
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import Loader from "../../components/modals/Loader/Loader";

import {
  ADD_PRODUCTS,
  CATEGORIES,
  UPDATE_CATEGORIES,
  UPLOADS,
} from "../../js/ApiEnds";
import {API_SERVER} from "./../../rest/ApiService.js";
export default function EditCategoryForm(props) {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();
  const [error, setError] = useState(false);
  const handleShow = () => setShow(true);
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
  const [message, setMessage] = useState("");
  const [imageXL, setImageXL] = useState();
  const [imageL, setImageL] = useState();
  const [imageM, setImageM] = useState();
  const [imageS, setImageS] = useState();
  const [imageXS, setImageXS] = useState();
  const imageRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const reload = () => window.location.reload();
  const handleClose = () => {
    setShow(false);
    reload();
  };

  const [isUpload, setIsUpload] = useState(false);
  useEffect(() => {
    setState({
      name: props.item.name,
      price: props.item.price,
      discount: props.item.discount,
      description: props.item.description,
      smallDescription: props.item.smallDescription,
      image: {
        x_l_large: {
          url: props.item.image.x_l_large.url,
        },
        l_large: {
          url: props.item.image.l_large.url,
        },
        l_medium: {
          url: props.item.image.l_medium.url,
        },
        l_small: {
          url: props.item.image.l_small.url,
        },
        x_sm: {
          url: props.item.image.x_sm.url,
        },
      },
    });
  }, [props]);
  const [state, setState] = React.useState({
    name: props.item.name,
    price: props.item.price,
    discount: props.item.discount,
    description: props.item.description,
    smallDescription: props.item.smallDescription,
    image: {
      x_l_large: {
        url: props.item.image.x_l_large.url,
      },
      l_large: {
        url: props.item.image.l_large.url,
      },
      l_medium: {
        url: props.item.image.l_medium.url,
      },
      l_small: {
        url: props.item.image.l_small.url,
      },
      x_sm: {
        url: props.item.image.x_sm.url,
      },
    },
  });

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

  const editCategory = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
      body: JSON.stringify(state),
    };
    fetch(
      API_SERVER + CATEGORIES + "/" + UPDATE_CATEGORIES + "/" + props.item._id,
      requestOptions
    )
      .then(response => response.json())
      .then(data => {
        window.scrollTo({top: 0, behavior: "smooth"});
        setShow(false);
        setLoading(false);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateDetails = event => {
    event.preventDefault();
    setLoading(true);
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
    }
    // else if (
    //   !selectedImageXL ||
    //   !selectedImageL ||
    //   !selectedImageM ||
    //   !selectedImageS ||
    //   !selectedImageXS
    // ) {
    //   setMessage("You have not selected image");
    //   window.scrollTo({top: 0, behavior: "smooth"});
    //   return;
    // }
    else {
      setLoading(true);
      if (selectedImageXL) {
        const imageRefXL = ref(
          storage,
          `images/categories/x_l_large/${selectedImageXL.name + v4()}`
        );
        uploadBytes(imageRefXL, selectedImageXL)
          .then(() => {
            getDownloadURL(imageRefXL)
              .then(url => {
                state.image.x_l_large.url = url;
                setIsUpload(true);
              })
              .catch(error => {
                console.log(error.message, "error getting image url");
              });
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        setIsUpload(false);
      }

      if (selectedImageL) {
        const imageRefL = ref(
          storage,
          `images/categories/l_large/${selectedImageL.name + v4()}`
        );
        uploadBytes(imageRefL, selectedImageL)
          .then(() => {
            getDownloadURL(imageRefL)
              .then(url => {
                state.image.l_large.url = url;
                setIsUpload(true);
              })
              .catch(error => {
                console.log(error.message, "error getting image url");
              });
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        setIsUpload(false);
      }
      if (selectedImageM) {
        const imageRefM = ref(
          storage,
          `images/categories/l_medium/${selectedImageM.name + v4()}`
        );
        uploadBytes(imageRefM, selectedImageM)
          .then(() => {
            getDownloadURL(imageRefM)
              .then(url => {
                state.image.l_medium.url = url;
                setIsUpload(true);
              })
              .catch(error => {
                console.log(error.message, "error getting image url");
              });
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        setIsUpload(false);
      }
      if (selectedImageS) {
        const imageRefS = ref(
          storage,
          `images/categories/l_small/${selectedImageS.name + v4()}`
        );
        uploadBytes(imageRefS, selectedImageS)
          .then(() => {
            getDownloadURL(imageRefS)
              .then(url => {
                state.image.l_small.url = url;
                setIsUpload(true);
              })
              .catch(error => {
                console.log(error.message, "error getting image url");
              });
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        setIsUpload(false);
      }
      if (selectedImageXS) {
        const imageRefXS = ref(
          storage,
          `images/categories/x_sm/${selectedImageXS.name + v4()}`
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
      } else {
        setIsUpload(false);
      }
      setIsUpload(true);
    }
  };
  useEffect(() => {
    if (isUpload == true) {
      setTimeout(function () {
        editCategory();
      }, 5000);
    }
  }, [state, isUpload]);

  function changeHandler(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  return (
    <>
      <div onClick={handleShow}>
        <i className="fas fa-marker" style={{color: "#0b0e8e"}} />
      </div>
      <Modal show={show} size="lg" onHide={handleClose}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">Edit Category</Modal.Title>
              <div onClick={handleClose}>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{color: "#0b0e8e"}}></i>
              </div>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={updateDetails}>
                <div className="form-group" style={{marginBottom: "10px"}}>
                  <label>Category Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    value={state.name}
                    onChange={changeHandler}
                  />

                  {(error && state.name.length <= 0) ||
                  (error && !state.name.match(/^[A-Za-z][A-Za-z_%,-.\s]*$/)) ? (
                    <label className="text-danger">
                      Please fill the details correctly..
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group" style={{marginBottom: "10px"}}>
                      <label>Description</label>
                      <textarea
                        name="description"
                        className="form-control"
                        rows="6"
                        value={state.description}
                        onChange={changeHandler}
                        placeholder="Description"
                      />
                      {(error && state.description.length <= 0) ||
                      (error &&
                        !state.description.match(
                          /^[A-Za-z0-9][A-Za-z0-9_%,-.\s]*$/
                        )) ? (
                        <label className="text-danger">
                          Please fill the details correctly..
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
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group" style={{marginBottom: "10px"}}>
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
                        <label className="text-danger">
                          Please enter valid small description
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
                            <img
                              className="preview image"
                              src={state.image.x_l_large.url}
                              name="imgupdatedXL"
                              id="imgupdatedXL"
                              height="50px"
                              htmlFor="imagechangeXL"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="col text-center">
                            <img
                              className="preview image"
                              src={state.image.l_large.url}
                              name="imgupdatedL"
                              id="imgupdatedL"
                              htmlFor="imagechangeL"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="col text-center">
                            <img
                              className="preview image"
                              src={state.image.l_medium.url}
                              name="imgupdatedM"
                              id="imgupdatedM"
                              htmlFor="imagechangeM"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="col text-center">
                            <img
                              className="preview image"
                              src={state.image.l_small.url}
                              name="imgupdatedS"
                              id="imgupdatedS"
                              htmlFor="imagechangeS"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="col text-center">
                            <img
                              className="preview image"
                              src={state.image.x_sm.url}
                              name="imgupdatedXS"
                              id="imgupdatedXS"
                              htmlFor="imagechangeXS"
                            />
                          </div>
                        </td>
                      </tr>
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
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-12 text-right">
                  <button
                    style={{margin: "20px"}}
                    type="submit"
                    className="btn btn-warning justify-content-md-center">
                    Update
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
