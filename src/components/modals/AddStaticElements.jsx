import React, {useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {CATEGORIES, UPLOADS} from "../../js/ApiEnds";
import {API_SERVER, addStaticElements} from "./../../rest/ApiService.js";
import {storage} from "../../firebase";
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import Loader from "../../components/modals/Loader/Loader";

export default function AddStaticElements() {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
    reload();
  };
  const reload = () => window.location.reload();
  const handleShow = () => setShow(true);

  function changeHandler(evt) {
    const value = evt.target.value;
    // console.log(evt);
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const imageRef = useRef();

  const [state, setState] = React.useState({
    name: "",
    image: "",
    description: "",
  });

  function changeHandler(evt) {
    const value = evt.target.value;
    // console.log(evt);
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  function onSelectImage(e) {
    // console.log("Selected image here");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      setError(true);
      return;
    }
    setError(false);
    setSelectedImage(e.target.files[0]);
  }

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  useEffect(() => {
    // console.log("console  imageUrl", imageUrl);
    if (imageUrl) {
      // console.log("imageUrl1", imageUrl);
      state.image = imageUrl;
      // console.log("usefeect sstaTe", state.image);
      addStaticElements(state, result => {
        if (result) {
          window.location.reload();
        }
      });
    }
  }, [imageUrl]);

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
      state.description == " " ||
      state.description.length == 0 ||
      !state.description.match(regEx1)
    ) {
      setLoading(false);
      setError(true);
    } else if (selectedImage) {
      setLoading(true);
      setError(false);
      const imageRef = ref(
        storage,
        `images/StaticElements/${v4() + selectedImage.name}`
      );
      uploadBytes(imageRef, selectedImage)
        .then(() => {
          getDownloadURL(imageRef)
            .then(url => {
              setImageUrl(url);
            })
            .catch(error => {
              // console.log(error.message, "error getting image url");
            });
        })
        .catch(error => {
          // console.log(error.message);
        });
      // console.log("imageUrl", imageUrl);
    } else {
      setLoading(false);
      setError(true);
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">
                Add Static Element
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
                    <div className="form-group mb-2  fs-1">
                      <label>Static Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required
                        value={state.name}
                        onChange={changeHandler}
                        placeholder="Static Element Name"
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
                    <label
                      htmlFor="imagechange"
                      className="file-upload image-upload-wrap text-default fs-4 mb-2">
                      <div className="drag-text text-end" htmlFor="imagechange">
                        <h6 htmlFor="imagechange">Click here to add image</h6>
                        {selectedImage && (
                          <img
                            className="preview"
                            src={preview}
                            htmlFor="imagechange"
                          />
                        )}
                      </div>
                    </label>

                    <input
                      className="form-control mb-0 pb-0 bg-default  fs-4"
                      type="file"
                      ref={imageRef}
                      id="imagechange"
                      name="imagechange"
                      style={{display: "none"}}
                      onChange={onSelectImage}
                    />
                    {error && !selectedImage ? (
                      <lable className="text-danger">
                        Please select the image
                      </lable>
                    ) : (
                      ""
                    )}
                    {/* uma code  */}
                  </div>
                </div>

                <div className="form-group  mb-2">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="5"
                    value={state.description}
                    onChange={changeHandler}
                    placeholder="Description"
                    required
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

                <div className="col-md-12 text-right">
                  <button
                    type="submit"
                    className="btn btn-default"
                    style={{background: "#0b0e8e", color: "white"}}>
                    Add Static Element
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
