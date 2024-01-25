import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {
  getDietCategories,
  getDietSubCategoriesOfCategory,
  getDietItemsOfSubCategory,
  getDietItemDetails,
  createDietPlan,
} from "../../rest/ApiService";
import Loader from "./Loader/Loader";
import Multiselect from "multiselect-react-dropdown";

export default function PrepareDietChartModal({item}) {
  const [show, setShow] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [productDetails, setProductDetails] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [filteredCategoryList, setFilteredCategoryList] = useState();
  const [filteredSubCategoryList, setFilteredSubCategoryList] = useState();
  const [filteredProductList, setFilteredProductList] = useState();
  const [dietName, setDietName] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [dietPlan, setDietPlan] = useState([]);

  const handleClose = () => {
    setShow(false);
    setShowErrorMessage(false);
  };
  const reload = () => window.location.reload();
  const handleShow = () => setShow(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    getDietCategories(result => {
      // console.log(result, "CAT");
      setCategories(result.categories);
      setFilteredCategoryList(result.categories);
    });
  }, []);

  const filterByCategoryName = event => {
    const query = event.target.value;

    var updatedList = [...categories];

    updatedList = updatedList.filter(item => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredCategoryList(updatedList);
  };
  const filterBySubCategoryName = event => {
    const query = event.target.value;

    var updatedList = [...subCategories];

    updatedList = updatedList.filter(item => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredSubCategoryList(updatedList);
  };
  const filterByProductName = event => {
    const query = event.target.value;

    var updatedList = [...products];

    updatedList = updatedList.filter(item => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredProductList(updatedList);
  };

  const onSelectForms = selectedItemList => {
    setShowErrorMessage(false);
    let formIds = [];
    selectedItemList.map(selectedItem => {
      if (selectedItem && selectedItem._id) {
        formIds.push(selectedItem._id);
      }
    });
    setSelectedProductIds(formIds);
  };
  const onRemove = (selectedValue, removedItem) => {
    let filteredFormIds = selectedProductIds.filter(
      formId => formId !== removedItem._id
    );
    setSelectedProductIds(filteredFormIds);
  };
  const onClickCategory = categoryId => {
    getDietSubCategoriesOfCategory(categoryId, result => {
      setSubCategories(result.data);
      setFilteredSubCategoryList(result.data);
      setFilteredProductList([]);
      setProductDetails();
    });
  };

  const onClickSubCategory = subCategoryId => {
    getDietItemsOfSubCategory(subCategoryId, result => {
      setProducts(result.data);
      setFilteredProductList(result.data);
      setProductDetails();
    });
  };

  const onClickProduct = productId => {
    getDietItemDetails(productId, result => {
      setProductDetails(result.data);
      console.log(result.data, "ITEMD");
      setSuggestions("");
    });
  };

  const onClickSave = () => {
    let newObject = {
      ingredient: productDetails._id,
      quantity: suggestions,
    };
    setDietPlan(prev => [...prev, newObject]);
  };

  const onClickSubmit = () => {
    let body = {
      name: dietName,
      customer: item.user._id,
      disease: item.disease._id,
      diatePlan: dietPlan,
    };
    createDietPlan(body, result => {
      if (result.message === "Diate plan is inserted") {
        reload();
      }
    });
  };

  // useEffect(() => {
  //   console.log(dietName, "NAME");
  //   console.log(suggestions, "SUGG");
  //   console.log(dietPlan, "PLAN");
  //   console.log(item, "ROW");
  // }, [dietName, suggestions, dietPlan]);

  // const submitForm = event => {
  //   event.preventDefault();
  // };

  return (
    <>
      <div
        onClick={handleShow}
        className="btn btn-default ml-1"
        style={{background: "#0b0e8e", color: "white"}}>
        <span className="ml-1">Prepare Diet Chart</span>
      </div>
      <Modal dialogClassName="my-modal" show={show} onHide={handleClose}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="realfoodcolor">
                Prepare Diet Chart
              </Modal.Title>
              <div onClick={handleClose}>
                <i
                  className="fa fa-window-close fa-2x"
                  style={{color: "#0b0e8e"}}></i>
              </div>
            </Modal.Header>

            <Modal.Body>
              <div className="diet-chart-main-container">
                <div className="diet-chart-name-container">
                  <label htmlFor="">Diet Plan Name</label>
                  <input
                    className="suggestions-input"
                    type="text"
                    placeholder="Enter Diet Plan Name"
                    onChange={e => setDietName(e.target.value)}
                  />
                </div>
              </div>
              <div className="diet-chart-container">
                <div className="diet-chart-cat-container">
                  <input
                    type="text"
                    className="diet-chart-search"
                    onChange={filterByCategoryName}
                    placeholder="Search Category By Name"
                  />
                  <div className="diet-chart-cat">
                    {filteredCategoryList && filteredCategoryList.length > 0
                      ? filteredCategoryList.map((category, index) => {
                          return (
                            <div
                              key={category._id}
                              className="diet-category"
                              onClick={() => onClickCategory(category._id)}>
                              <img
                                className="diet-cat-image"
                                src={
                                  category &&
                                  category.image &&
                                  category.image.x_sm &&
                                  category.image.x_sm.url
                                    ? category.image.x_sm.url
                                    : ""
                                }
                              />
                              <div className="diet-cat-name">
                                {category.name}
                              </div>
                            </div>
                          );
                        })
                      : ""}
                  </div>
                </div>
                <div className="diet-chart-cat-container">
                  <input
                    type="text"
                    className="diet-chart-search"
                    onChange={filterBySubCategoryName}
                    placeholder="Search Sub-Category By Name"
                  />
                  <div className="diet-chart-cat">
                    {filteredSubCategoryList &&
                    filteredSubCategoryList.length > 0 ? (
                      filteredSubCategoryList.map((subCategory, index) => {
                        return (
                          <div
                            key={subCategory._id}
                            className="diet-category"
                            onClick={() => onClickSubCategory(subCategory._id)}>
                            <img
                              className="diet-cat-image"
                              src={
                                subCategory &&
                                subCategory.image &&
                                subCategory.image.x_sm &&
                                subCategory.image.x_sm.url
                                  ? subCategory.image.x_sm.url
                                  : ""
                              }
                            />
                            <div className="diet-cat-name">
                              {subCategory.name}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="no-records-found">No Records Found</div>
                    )}
                  </div>
                </div>
                <div className="diet-chart-cat-container">
                  <input
                    type="text"
                    className="diet-chart-search"
                    onChange={filterByProductName}
                    placeholder="Search Product By Name"
                  />
                  <div className="diet-chart-cat">
                    {filteredProductList && filteredProductList.length > 0 ? (
                      filteredProductList.map((product, index) => {
                        return (
                          <div
                            key={product._id}
                            className="diet-category"
                            onClick={() => onClickProduct(product._id)}>
                            <img
                              className="diet-cat-image"
                              src={
                                product &&
                                product.image &&
                                product.image.length > 0 &&
                                product.image[0].x_sm &&
                                product.image[0].x_sm.url
                                  ? product.image[0].x_sm.url
                                  : ""
                              }
                            />
                            <div className="diet-cat-name">{product.name}</div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="no-records-found">No Records Found</div>
                    )}
                  </div>
                </div>
                <div className="diet-chart-cat-container">
                  <div className="diet-chart-cat">
                    {productDetails ? (
                      <>
                        {" "}
                        <div className="diet-image-name-container">
                          <div>
                            <img
                              className="diet-cat-image"
                              src={
                                productDetails.image.length > 0
                                  ? productDetails.image[0].x_sm.url
                                  : ""
                              }
                            />
                          </div>
                          <div className="diet-name-container">
                            <div className="diet-name">
                              {productDetails.name}
                            </div>
                            <div className="diet-name">
                              &#8377;{productDetails.price}
                            </div>
                            <div className="diet-name">
                              Stock: {productDetails.presentStock} Only
                            </div>
                          </div>
                        </div>
                        <div className="diet-item-varients-container">
                          {/* {productDetails.varients &&
                          productDetails.varients.length > 0
                            ? productDetails.varients.map((varient, index) => {
                                return (
                                  <div className="diet-item-varient">
                                    {varient.name}
                                  </div>
                                );
                              })
                            : ""} */}
                          <label htmlFor="">Suggestions</label>
                          <input
                            className="suggestions-input"
                            type="text"
                            placeholder="Give Suggestions Here..."
                            onChange={e => setSuggestions(e.target.value)}
                            required
                            value={suggestions}
                          />
                        </div>
                        <div className="diet-item-description-container">
                          <h6 className="diet-item-description-title">
                            Product Description
                          </h6>
                          <p className="diet-item-description">
                            {productDetails.smallDescription}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="no-records-found">No Records Found</div>
                    )}
                  </div>
                  <div className="diet-item-buttons-container">
                    <button
                      type="button"
                      onClick={onClickSave}
                      className="diet-save">
                      SAVE
                    </button>
                    <button
                      type="button"
                      onClick={onClickSubmit}
                      className="diet-save">
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}
