import React, { useEffect, useRef, useState } from "react";
import { CATEGORIES, SUB_CATEGORIES, UPLOADS, USER } from "../js/ApiEnds";
import { API_SERVER } from "../rest/ApiService";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Multiselect from "multiselect-react-dropdown";

const CreateSubCategory = () => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const imageRef = useRef();
  const selectCategoryRef = useRef();
  const [preview, setPreview] = useState();
  const [categories, setCategories] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);

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
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);

  const handleSelect = (e) => {
    setState({
      ...state,
      uiTheme: e,
    });
    console.log(state);
  };

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

  useEffect(() => {
    const url =
      API_SERVER +
      CATEGORIES +
      "/" +
      USER +
      "/" +
      localStorage.getItem("userId");
    console.log(url);
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((jsondata) => {
        setCategories(jsondata.categories);
        console.log(jsondata.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateDetails = (event) => {
    event.preventDefault();
    if (selectedCategories.length <= 0) {
      setMessage("Categories not specified");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    console.log(selectedImage);
    if (!selectedImage) {
      setMessage("You have not selected image");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          };
          fetch(API_SERVER + SUB_CATEGORIES, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              imageRef.current.value = "";
              setMessage(data.message);
              setState({
                name: "",
                description: "",
                smallDescription: "",
                uiTheme: "Select Ui Theme",
              });
              setSelectedImage("");
              setPreview("");
              setSelectedCategories([]);
              selectCategoryRef.current.resetSelectedValues();
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  };

  const onSelect = (selectedItemList) => {
    setSelectedCategories(selectedItemList);
    console.log(selectedCategories);
  };

  const onRemove = (removedItem) => {
    setSelectedCategories(removedItem);
    console.log(selectedCategories);
  };

  function onSelectImage(e) {
    console.log("Selected image here");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    setSelectedImage(e.target.files[0]);
  }

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Create Sub-Categories</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>
            <div className="breadcrumb-item">Create Sub-Categories</div>
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
          <h2 className="section-title">
            Sub Group your items into categories
          </h2>
          <p className="section-lead">
            Please fill all the below details and submit to see the changes.
          </p>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-12">
              <div
                className="card"
                style={{
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                {/* <div className="card-header">
                  <h4>Enter all the details</h4>
                </div> */}

                <div className="card-body">
                  <form onSubmit={updateDetails}>
                    <div className="form-group mb-2">
                      {/* <label>Name</label> */}
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required
                        value={state.name}
                        onChange={changeHandler}
                        placeholder="Sub-Category Name"
                      />
                    </div>
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

                    <div className="form-group mb-2">
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
                    <div className="form-group mb-2">
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
                      {/* <label>Select Category(s)</label> */}
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
                    </div>

                    {/* <div className="form-group">
                      <DropdownButton
                        name="uiTheme"
                        alignRight
                        title={state.uiTheme}
                        id="selectDisplayType"
                        onSelect={handleSelect}
                      >
                        <Dropdown.Item eventKey="1:1">
                          Display type 1:1
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="16:9">
                          Display type 16:9
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="3:8">
                          Display type 3:8
                        </Dropdown.Item>
                      </DropdownButton>
                    </div> */}

                    <div className="col-md-12 text-center  d-grid gap-2">
                      <button type="submit" className="btn btn-primary">
                        Create Sub-Category
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

export default CreateSubCategory;
