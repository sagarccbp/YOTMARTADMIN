import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import {
  ADD_PRODUCTS,
  CATEGORIES,
  UPDATE_CATEGORIES,
  UPLOADS,
} from "../../js/ApiEnds";

import { API_SERVER } from "../../rest/ApiService";
export default function EditCategoryForm(props) {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const imageRef = useRef();
  console.log("Props are : ", props);
  useEffect(() => {
    setState({
      item_id: props.item._id,
      name: props.item.name,
      price: props.item.price,
      discount: props.item.discount,
      description: props.item.description,
      smallDescription: props.item.smallDescription,
      image: props.item.image,
    });
  }, [props]);
  const [state, setState] = React.useState({
    item_id: props.item._id,
    name: props.item.name,
    price: props.item.price,
    discount: props.item.discount,
    description: props.item.description,
    smallDescription: props.item.smallDescription,
    image: props.item.image,
  });
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);

      return;
    } else {
      setPreview(undefined);
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  function onSelectImage(e) {
    console.log("Selected image here");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    setSelectedImage(e.target.files[0]);
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
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShow(false);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteCategory = categoryId => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    fetch(API_SERVER + CATEGORIES + "/" + props.item._id, requestOptions)
      .then(response => response.json())
      .then(data => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShow(false);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const updateDetails = event => {
    event.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append("productImage", selectedImage);
      formData.append("name", selectedImage.name);
      console.log("!inside update details.. ");
      fetch(API_SERVER + UPLOADS, {
        method: "POST",
        body: formData,
      })
        .then(res => {
          return res.json();
        })
        .then(result => {
          console.log("!inside result.. ", result);
          const imageUrl = result.data.productImage;
          state.image = imageUrl;
          if (imageUrl) {
            editCategory();
          }
        });
    } else {
      editCategory();
    }
  };

  function changeHandler(evt) {
    const value = evt.target.value;
    console.log(value);
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  return (
    <>
      <div onClick={handleShow}>
        <i className="fas fa-marker" />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Category</Modal.Title>
          <button
            onClick={handleClose}
            type="button"
            className="btn btn-link"
            style={{ textDecoration: "none" }}
          >
            <i class="fa fa-window-close fa-2x"></i>
          </button>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={updateDetails}>
            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label>Category Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                value={state.name}
                onChange={changeHandler}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={state.description}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label>Small Description</label>
              <input
                type="text"
                className="form-control"
                name="smallDescription"
                value={state.smallDescription}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label>Image</label>
              <br />
              <img
                className="preview image"
                src={state.image}
                name="imgupdated"
                id="imgupdated"
                for="imagechange"
              />
            </div>

            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label
                for="imagechange"
                className="file-upload image-upload-wrap text-default fs-4 mb-2"
              >
                <div className="drag-text text-end" for="imagechange">
                  <h6 for="imagechange">Click here to add image</h6>
                  {selectedImage && (
                    <img className="preview" src={preview} for="imagechange" />
                  )}
                </div>
              </label>

              {/* image: props.item.image, */}
              <input
                className="form-control mb-0 pb-0 bg-default  fs-4"
                src={state.image}
                type="file"
                ref={imageRef}
                id="imagechange"
                name="imagechange"
                style={{ display: "none" }}
                onChange={onSelectImage}
              />
            </div>

            <div className="col-md-12 text-right">
              {/* <button
                onClick={handleClose}
                type="button"
                className="btn btn-primary"
              >
                Close
              </button> */}
              <button
                style={{ margin: "20px" }}
                type="submit"
                className="btn btn-warning justify-content-md-center"
              >
                Update
              </button>

              {/* <button
                style={{ margin: "20px" }}
                type="button"
                className="btn btn-danger"
                onClick={() => deleteCategory(props._id)}
              >
                Delete
              </button> */}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
