import React, {useEffect, useRef, useState} from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  CATEGORIES,
  ADD_PRODUCTS,
  SUBCATEGORIES_OF_CATEGORY,
  UPLOADS,
  USER,
} from "../js/ApiEnds";

import {API_SERVER} from "../rest/ApiService";

export default function AddProduct() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const selectCategoryRef = useRef();
  const [images, setImages] = useState([]);
  const [params, setParams] = useState({});
  useEffect(() => {
    //MultipleImageUpload();
  }, []);
  const onSelect = (selectedItemList, selectedItem) => {
    setSelectedCategories(selectedItemList);
    fetchSubCatagories(selectedItem, false);
  };

  const onSelectSubCategory = (selectedItemList, selectedItem) => {
    setSelectedSubCategories(selectedItemList);
  };

  const onRemoveSubCategory = (selectedItemList, selectedItem) => {
    setSelectedSubCategories(selectedItemList);
  };

  const fetchSubCatagories = (lastSelectedItem, isRemoved) => {
    console.log("Fetching sub categories of category : ", lastSelectedItem);
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
    })
      .then(res => {
        return res.json();
      })
      .then(jsondata => {
        if (jsondata.data.length > 0) {
          console.log(
            "Previous sub categories ",
            subCategories,
            " Present subcategory list : ",
            jsondata
          );
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

  const onRemove = (selectedList, removedItem) => {
    setSelectedCategories(selectedList);
    fetchSubCatagories(removedItem, true);
  };

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
      .then(res => {
        return res.json();
      })
      .then(jsondata => {
        setCategories(jsondata.categories);
        console.log(jsondata.categories);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const addItems = event => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      formData.append("productImages", image);
    }
    if (images && images.length > 0) {
      fetch(API_SERVER + UPLOADS + "/upload_multiple_files", {
        method: "POST",
        body: formData,
      })
        .then(res => {
          return res.json();
        })
        .then(result => {
          if (result.urls) {
            createItems(result.urls);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      createItems([]);
    }
  };

  const createItems = urls => {
    const selectedCatId = [];
    const selectedSubCatId = [];
    selectedCategories.map(item => {
      selectedCatId.push(item._id);
    });
    selectedSubCategories.map(item => {
      selectedSubCatId.push(item._id);
    });

    let myPayload = {
      categories: selectedCatId,
      subCategories: selectedSubCatId,
      name: params.name,
      price: params.price,
      discount: params.discount,
      presentStock: params.presentStock,
      image: urls,
      ownerId: localStorage.getItem("userId"),
      returnNotes: params.returnNotes,
      shippingInfo: params.shippingInfo,
      description: params.description,
      smallDescription: params.smallDescription,
    };
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(myPayload),
    };
    fetch(API_SERVER + ADD_PRODUCTS, requestOptions)
      .then(response => response.json())
      .then(data => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  function changeHandler(evt) {
    console.log(
      evt.target.value,
      " values changed here are .. ",
      evt.target.name
    );
    const value = evt.target.value;
    setParams({
      ...params,
      [evt.target.name]: value,
    });
  }

  function onImageChange(e) {
    console.log("Hi");
    setImages([...e.target.files]);
  }

  const MultipleImageUpload = () => {
    Dropzone.autoDiscover = false;

    var dropzone = new Dropzone("#mydropzone", {
      url: "#",
    });

    var minSteps = 6,
      maxSteps = 60,
      timeBetweenSteps = 100,
      bytesPerStep = 100000;

    dropzone.uploadFiles = function (files) {
      var self = this;

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        let totalSteps = Math.round(
          Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep))
        );

        for (var step = 0; step < totalSteps; step++) {
          var duration = timeBetweenSteps * (step + 1);
          setTimeout(
            (function (file, totalSteps, step) {
              return function () {
                file.upload = {
                  progress: (100 * (step + 1)) / totalSteps,
                  total: file.size,
                  bytesSent: ((step + 1) * file.size) / totalSteps,
                };

                self.emit(
                  "uploadprogress",
                  file,
                  file.upload.progress,
                  file.upload.bytesSent
                );
                if (file.upload.progress == 100) {
                  file.status = Dropzone.SUCCESS;
                  self.emit("success", file, "success", null);
                  self.emit("complete", file);
                  self.processQueue();
                }
              };
            })(file, totalSteps, step),
            duration
          );
        }
      }
    };
  };
  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Add Products</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="/">Dashboard</a>
            </div>
            <div className="breadcrumb-item">Add Products</div>
          </div>
        </div>
        <div className="section-body">
          <h2 className="section-title">Add your Products</h2>
          <p className="section-lead">
            Please fill all the below details and submit to see the changes.
          </p>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4>Enter all the details</h4>
                </div>
                <form onSubmit={addItems}>
                  <div className="card-body">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        onChange={changeHandler}
                        type="text"
                        name="name"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        onChange={changeHandler}
                        type="number"
                        name="price"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Discount</label>
                      <input
                        onChange={changeHandler}
                        type="number"
                        name="discount"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Available Stock</label>
                      <input
                        onChange={changeHandler}
                        type="number"
                        name="presentStock"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        onChange={changeHandler}
                        className="form-control"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label>Small Description</label>
                      <textarea
                        name="smallDescription"
                        onChange={changeHandler}
                        className="form-control"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <input
                        type="file"
                        name="image[]"
                        multiple
                        onChange={onImageChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Shipping notes</label>
                      <textarea
                        name="shippingInfo"
                        onChange={changeHandler}
                        className="form-control"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Return notes</label>
                      <textarea
                        name="returnNotes"
                        onChange={changeHandler}
                        className="form-control"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Select Category(s)</label>
                      <Multiselect
                        onSelect={onSelect}
                        options={categories}
                        displayValue="name"
                        onRemove={onRemove}
                        ref={selectCategoryRef}
                      />
                    </div>
                    {subCategories && subCategories.length > 0 ? (
                      <div className="form-group">
                        <label>Select Sub Category(s)</label>
                        <Multiselect
                          onSelect={onSelectSubCategory}
                          options={subCategories}
                          displayValue="name"
                          onRemove={onRemoveSubCategory}
                          ref={selectCategoryRef}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-md-12 text-right">
                      <button type="submit" className="btn btn-primary">
                        Add Items
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
