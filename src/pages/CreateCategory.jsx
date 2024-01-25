import React, { useEffect, useRef, useState } from "react";
import { CATEGORIES, UPLOADS } from "../js/ApiEnds";
import { API_SERVER } from "../rest/ApiService";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/CreateCategory.css";
const CreateCategory = () => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const imageRef = useRef();

  const [preview, setPreview] = useState();

  const [state, setState] = React.useState({
    name: "",
    image: "",
    description: "",
    smallDescription: "",
    ownerId: localStorage.getItem("userId"),
    uiTheme: "Select Ui Theme",
  });

  function changeHandler(evt) {
    const value = evt.target.value;
    console.log(evt);
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  // const handleSelect = (e) => {
  //   setState({
  //     ...state,
  //     uiTheme: e,
  //   });
  //   console.log(state);
  // };

  function onSelectImage(e) {
    console.log("Selected image here");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    setSelectedImage(e.target.files[0]);
  }

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const updateDetails = (event) => {
    event.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append("productImage", selectedImage);
      formData.append("name", selectedImage.name);

      fetch(API_SERVER + UPLOADS, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          const imageUrl = result.data.productImage;
          console.log(imageUrl);
          state.image = imageUrl;

          console.log(state);
          if (imageUrl) {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(state),
            };
            fetch(API_SERVER + CATEGORIES, requestOptions)
              .then((response) => response.json())
              .then((data) => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                imageRef.current.value = "";
                setState({
                  name: "",
                  description: "",
                  smallDescription: "",
                  uiTheme: "Select Ui Theme",
                });
                setSelectedImage("");
                setPreview("");
                setMessage(data.message);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    }
  };

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Create Categories</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>
            <div className="breadcrumb-item">Create Categories</div>
          </div>
        </div>
        {message && (
          <div className="alert alert-info alert-dismissible show fade">
            <div className="alert-body">
              <button className="close" data-dismiss="alert">
                <span>&times;</span>
              </button>
              {message}
            </div>
          </div>
        )}
        <div className="section-body">
          <h2 className="section-title">Group your items into categories</h2>
          <p className="section-lead">
            Please fill all the below details and submit to see the changes.
          </p>

          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 ">
              <div
                className="card"
                style={{
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                {/* <div className="card-header text-center">
                  <h4>Category details</h4>
                </div> */}

                <div className="card-body">
                  <form onSubmit={updateDetails}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mb-2  fs-1">
                          {/* <label>Name</label> */}
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            required
                            value={state.name}
                            onChange={changeHandler}
                            placeholder="Category Name"
                          />
                        </div>
                        {/* uma code */}
                        <label
                          for="imagechange"
                          className="file-upload image-upload-wrap text-default fs-4 mb-2"
                        >
                          <div className="drag-text text-end" for="imagechange">
                            <h6 for="imagechange">Click here to add image</h6>
                            {selectedImage && (
                              <img
                                className="preview"
                                src={preview}
                                for="imagechange"
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
                          style={{ display: "none" }}
                          onChange={onSelectImage}
                        />

                        {/* uma code  */}
                      </div>
                    </div>
                    {/* <div className="form-group">
                      <label>Select Image</label>
                      <br />
                      <input
                        ref={imageRef}
                        accept="image/*"
                        type="file"
                        onChange={onSelectImage}
                      />
                      {selectedImage && (
                        <img
                          className="preview"
                          height={100}
                          width={100}
                          src={preview}
                        />
                      )}
                    </div> */}

                    <div className="form-group  mb-2">
                      {/* <label>Description</label> */}
                      <textarea
                        name="description"
                        className="form-control"
                        rows="5"
                        value={state.description}
                        onChange={changeHandler}
                        placeholder="Description"
                      />
                    </div>

                    <div className="form-group  mb-2">
                      {/* <label>Small Description</label> */}
                      <textarea
                        name="smallDescription"
                        className="form-control"
                        rows="4"
                        value={state.smallDescription}
                        onChange={changeHandler}
                        placeholder="Small Description"
                      />
                    </div>

                    <div className="form-group">
                      {/* <DropdownButton
                        name="uiTheme"
                        alignRight
                        title={state.uiTheme}
                        id="selectDisplayType"
                        onSelect={handleSelect}
                      >
                        <Dropdown.Item eventKey="1:1">1:1</Dropdown.Item>
                        <Dropdown.Item eventKey="16:9">16:9</Dropdown.Item>
                        <Dropdown.Item eventKey="3:8">3:8</Dropdown.Item>
                      </DropdownButton> */}
                    </div>
                    <div className="text-center  d-grid gap-2">
                      <button type="submit" className="btn btn-primary">
                        Create Categories
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateCategory;
