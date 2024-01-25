import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Multiselect from "multiselect-react-dropdown";
import {
  addHomeScreenItems,
  getStaticElements,
  getCategories,
  getItems,
  getSubCategories,
} from "../../rest/ApiService";

export default function AddAllHomeScreenItemsModal() {
  const [show, setShow] = useState(false);
  // const [preview, setPreview] = useState();
  const [error, setError] = useState(false);
  const [layoutType, selectLayoutType] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [homeScreenItems, setHomeScreenItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [staticElements, setStaticElements] = useState([]);
  const [hint, setHint] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const reload = () => window.location.reload();
  const handleClose = () => {
    setShow(false);
    selectLayoutType([]);
    setHomeScreenItems([]);
    setShowErrorMessage(false);
    setHint("");
    setDisplayName("");
    reload();
  };
  const handleShow = () => setShow(true);

  const onChangeDisplayName = e => {
    setDisplayName(e.target.value);
  };

  const onSelectDropDown = selectedValue => {
    setShowErrorMessage(false);

    let item = {};
    selectedValue.map(selectedItem => {
      if (selectedItem.collectionName) {
        if (selectedItem.collectionName === "items") {
          item["layoutType"] = "ITEMS";
        } else if (selectedItem.collectionName === "Categories") {
          item["layoutType"] = "CATEGORIES";
          setSelectedCategory(true);
        } else if (selectedItem.collectionName === "SubCategories") {
          item["layoutType"] = "SUB_CATEGORIES";
          setSelectedSubCategory(true);
        }
        item["listObject"] = selectedItem._id;
        item["onModel"] = selectedItem.collectionName;
      }
    });
    setHomeScreenItems(previousItems => [...previousItems, item]);
  };

  const onRemoveDropDown = (selectedValue, removedItem) => {
    if (
      layoutType === "GROUP_WITH_4_ITEMS" ||
      layoutType === "1_ITEM_WITH_1_GROUP" ||
      layoutType === "SINGLE_GROUP" ||
      layoutType === "SINGLE_CATEGORIES"
    ) {
      setSelectedCategory(false);
      setSelectedSubCategory(false);
    }

    let filteredHomeScreenItems = homeScreenItems.filter(
      item => item.listObject !== removedItem._id
    );

    setHomeScreenItems(filteredHomeScreenItems);
  };

  useEffect(() => {
    // console.log(homeScreenItems, "HSI");
  }, [homeScreenItems]);

  useEffect(() => {
    getItems(result => {
      // console.log(result);
      setItems(result.items);
    });
    getCategories(result => {
      setCategories(result.categories);
    });
    getSubCategories(result => {
      setSubCategories(result.subCategory);
    });
    getStaticElements(result => {
      setStaticElements(result.items);
    });
  }, []);

  const selectHomeScreenItemsType = e => {
    const value = e.target.value;
    selectLayoutType(value);
    setHomeScreenItems([]);
    setShowErrorMessage(false);
    setError(false);
    if (value === "Choose") {
      setHint("");
    }
    if (value === "BANNERS") {
      setHint("Select Categories or Sub Categories or Items");
    } else if (value === "STATIC_ELEMENTS") {
      setHint("Select Four Static Elements");
    } else if (value === "1_ITEM_WITH_1_GROUP") {
      setHint("Select One Category or Sub Category and One Item");
    } else if (value === "TWO_GROUP") {
      setHint(
        "Select Two Categories or Two Sub Categories or One Category and Sub Category"
      );
    } else if (value === "GROUP_WITH_4_ITEMS") {
      setHint("Select One Category or Sub Category and Four Items");
    } else if (value === "SINGLE_ITEM") {
      setHint("Select One Item");
    } else if (value === "GROUP_LIST") {
      setHint("Select Categories or Sub Categories");
    } else if (value === "CIRCULAR_GROUP") {
      setHint(
        "Select Six Categories or  Six Sub Categories or Six Combination of  Categories and Sub Categories"
      );
    } else if (value === "SINGLE_GROUP") {
      setHint("Select One Category or Sub Category");
    } else if (value === "ITEM_LIST") {
      setHint("Select Items");
    } else if (value === "SINGLE_CATEGORIES") {
      setHint("Select One Category or Sub Category");
    } else if (value === "OFFER_CARDS") {
      setHint(
        "Select Two Categories or Two Sub Categories or One Category and Sub Category"
      );
    }
  };

  const createHomeScreenItems = event => {
    event.preventDefault();
    var regEx = /^[A-Za-z][A-za-z\s]*$/;
    // var regEx1 = /^[A-Za-z0-9][A-za-z0-9_,-.\s]*$/;
    if (
      displayName == " " ||
      displayName.length == 0 ||
      !displayName.match(regEx)
    ) {
      setError(true);
    } else {
      if (
        layoutType === "BANNERS" ||
        layoutType === "GROUP_LIST" ||
        layoutType === "ITEM_LIST"
      ) {
        if (homeScreenItems && homeScreenItems.length > 0) {
          const body = {
            name: displayName,
            displayType: layoutType,
            homeItems: homeScreenItems,
          };

          addHomeScreenItems(body, result => {
            // console.log(result, "SDSDSD");
            if (result) {
              window.location.reload();
            }
          });
        } else {
          if (layoutType === "BANNERS") {
            setShowErrorMessage(true);
            setErrorMessage("Please Select any one Value");
          }
          if (layoutType === "GROUP_LIST") {
            setShowErrorMessage(true);
            setErrorMessage("Select Categories or Sub Categories");
          }
          if (layoutType === "ITEM_LIST") {
            setShowErrorMessage(true);
            setErrorMessage("Select Items");
          }
        }
      } else if (layoutType === "STATIC_ELEMENTS") {
        if (homeScreenItems && homeScreenItems.length === 4) {
          const body = {
            name: displayName,
            displayType: layoutType,
            homeItems: homeScreenItems,
          };

          addHomeScreenItems(body, result => {
            if (result) {
              window.location.reload();
            }
          });
        } else {
          setShowErrorMessage(true);
          setErrorMessage("Select Four Static Elements");
        }
      } else if (
        layoutType === "1_ITEM_WITH_1_GROUP" ||
        layoutType === "TWO_GROUP" ||
        layoutType === "OFFER_CARDS"
      ) {
        if (homeScreenItems && homeScreenItems.length === 2) {
          const body = {
            name: displayName,
            displayType: layoutType,
            homeItems: homeScreenItems,
          };

          addHomeScreenItems(body, result => {
            if (result) {
              window.location.reload();
            }
          });
        } else {
          if (layoutType === "TWO_GROUP" || layoutType === "OFFER_CARDS") {
            setShowErrorMessage(true);
            setErrorMessage(
              "Select Two Categories or Two Sub Categories or One Category and Sub Category"
            );
          }
          if (layoutType === "1_ITEM_WITH_1_GROUP") {
            setShowErrorMessage(true);
            setErrorMessage("Select One Category or Sub Category and One Item");
          }
        }
      } else if (layoutType === "GROUP_WITH_4_ITEMS") {
        if (homeScreenItems && homeScreenItems.length === 5) {
          const body = {
            name: displayName,
            displayType: layoutType,
            homeItems: homeScreenItems,
          };

          addHomeScreenItems(body, result => {
            if (result) {
              window.location.reload();
            }
          });
        } else {
          setShowErrorMessage(true);
          setErrorMessage("Select One Category or Sub Category and Four Items");
        }
      } else if (layoutType === "SINGLE_ITEM") {
        if (homeScreenItems && homeScreenItems.length === 1) {
          const body = {
            name: displayName,
            displayType: layoutType,
            homeItems: homeScreenItems,
          };

          addHomeScreenItems(body, result => {
            // console.log(result, "SDSDSD");
            if (result) {
              window.location.reload();
            }
          });
        } else {
          setShowErrorMessage(true);
          setErrorMessage("Select One Item");
        }
      } else if (layoutType === "CIRCULAR_GROUP") {
        if (homeScreenItems && homeScreenItems.length === 6) {
          const body = {
            name: displayName,
            displayType: layoutType,
            homeItems: homeScreenItems,
          };

          addHomeScreenItems(body, result => {
            if (result) {
              window.location.reload();
            }
          });
        } else {
          setShowErrorMessage(true);
          setErrorMessage(
            "Select Six Categories or  Six Sub Categories or Six Combination of Categories and Sub Categories"
          );
        }
      } else if (
        layoutType === "SINGLE_GROUP" ||
        layoutType === "SINGLE_CATEGORIES"
      ) {
        if (homeScreenItems && homeScreenItems.length === 1) {
          const body = {
            name: displayName,
            displayType: layoutType,
            homeItems: homeScreenItems,
          };

          addHomeScreenItems(body, result => {
            if (result) {
              window.location.reload();
            }
          });
        } else {
          setShowErrorMessage(true);
          setErrorMessage("Select One Category or Sub Category");
        }
      }
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
        <Modal.Header>
          <Modal.Title className="realfoodcolor">
            Add All Home Screen Items
          </Modal.Title>
          <div onClick={handleClose}>
            <i
              className="fa fa-window-close fa-2x"
              style={{color: "#0b0e8e"}}></i>
          </div>
        </Modal.Header>

        <Modal.Body>
          <form className="form-data" onSubmit={createHomeScreenItems}>
            <div className="form-group mb-0">
              <label>Select Home Screen Items Layout Type</label>

              <select
                className="form-control"
                onChange={selectHomeScreenItemsType}>
                <option value={"Choose"}>Choose Type</option>
                <option value={"BANNERS"}>Banners</option>
                <option value={"STATIC_ELEMENTS"}>Static Elements</option>
                <option value={"1_ITEM_WITH_1_GROUP"}>
                  1 Group With 1 Item
                </option>
                <option value={"TWO_GROUP"}>Two Group</option>
                <option value={"GROUP_WITH_4_ITEMS"}>Group with 4 Items</option>
                <option value={"SINGLE_ITEM"}>Single Item</option>
                <option value={"GROUP_LIST"}>Group List</option>
                <option value={"CIRCULAR_GROUP"}>Circular Group</option>
                <option value={"SINGLE_GROUP"}>Single Group</option>
                <option value={"ITEM_LIST"}>Items List</option>
                <option value={"SINGLE_CATEGORIES"}>Single Category</option>
                <option value={"OFFER_CARDS"}>Offer Cards</option>
              </select>
            </div>
            {hint ? (
              <div className="form-group">
                <label className="ml-1">*{hint}</label>{" "}
              </div>
            ) : null}

            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {" "}
                {layoutType === "BANNERS" ? (
                  categories && categories.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group ">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Categories</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={categories}
                        displayValue="name"
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "BANNERS" ? (
                  subCategories && subCategories.length > 0 ? (
                    <div className="form-group">
                      <label>Select Sub Categories</label>

                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={subCategories}
                        displayValue="name"
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "BANNERS" ? (
                  items && items.length > 0 ? (
                    <div className="form-group">
                      <label>Select Items</label>

                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={items}
                        displayValue="name"
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}

            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {" "}
                {layoutType === "STATIC_ELEMENTS" ? (
                  categories && categories.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group ">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Categories</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        selectionLimit="4"
                        options={staticElements}
                        displayValue="name"
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}

            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {" "}
                {layoutType === "1_ITEM_WITH_1_GROUP" ? (
                  categories && categories.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Category</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={categories}
                        selectionLimit="1"
                        // singleSelect={true}
                        displayValue="name"
                        disable={selectedSubCategory ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "1_ITEM_WITH_1_GROUP" ? (
                  subCategories && subCategories.length > 0 ? (
                    <div className="form-group">
                      <label>Select Sub Category</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={subCategories}
                        selectionLimit="1"
                        // singleSelect={true}
                        displayValue="name"
                        disable={selectedCategory ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "1_ITEM_WITH_1_GROUP" ? (
                  items && items.length > 0 ? (
                    <div className="form-group">
                      <label>Select Item</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={items}
                        selectionLimit="1"
                        // singleSelect={true}
                        displayValue="name"
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}

            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {" "}
                {layoutType === "TWO_GROUP" ? (
                  categories && categories.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group ">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Categories</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={categories}
                        selectionLimit="2"
                        displayValue="name"
                        // disable={twoSubCategoriesSelected ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "TWO_GROUP" ? (
                  subCategories && subCategories.length > 0 ? (
                    <div className="form-group">
                      <label>Select Sub Categories</label>

                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={subCategories}
                        selectionLimit="2"
                        displayValue="name"
                        // disable={twoCategoriesSelected ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}

            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {" "}
                {layoutType === "GROUP_WITH_4_ITEMS" ? (
                  categories && categories.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group ">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Category</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={categories}
                        selectionLimit="1"
                        // singleSelect={true}
                        displayValue="name"
                        disable={selectedSubCategory ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "GROUP_WITH_4_ITEMS" ? (
                  subCategories && subCategories.length > 0 ? (
                    <div className="form-group">
                      <label>Select Sub Category</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={subCategories}
                        selectionLimit="1"
                        // singleSelect={true}
                        displayValue="name"
                        disable={selectedCategory ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "GROUP_WITH_4_ITEMS" ? (
                  items && items.length > 0 ? (
                    <div className="form-group">
                      <label>Select Items</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={items}
                        selectionLimit="4"
                        // singleSelect={true}
                        displayValue="name"
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}

            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {layoutType === "SINGLE_ITEM" ? (
                  items && items.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group ">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Item</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={items}
                        selectionLimit="1"
                        // singleSelect={true}
                        displayValue="name"
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}

            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {" "}
                {layoutType === "GROUP_LIST" ? (
                  categories && categories.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Categories</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={categories}
                        displayValue="name"
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "GROUP_LIST" ? (
                  subCategories && subCategories.length > 0 ? (
                    <div className="form-group">
                      <label>Select Sub Categories</label>

                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={subCategories}
                        displayValue="name"
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}

            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {" "}
                {layoutType === "CIRCULAR_GROUP" ? (
                  categories && categories.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Categories</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={categories}
                        selectionLimit="6"
                        displayValue="name"
                        // disable={twoSubCategoriesSelected ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "CIRCULAR_GROUP" ? (
                  subCategories && subCategories.length > 0 ? (
                    <div className="form-group">
                      <label>Select Sub Categories</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={subCategories}
                        selectionLimit="6"
                        displayValue="name"
                        // disable={twoCategoriesSelected ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}
            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {" "}
                {layoutType === "SINGLE_GROUP" ? (
                  categories && categories.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group ">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Category</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={categories}
                        selectionLimit="1"
                        // singleSelect={true}
                        displayValue="name"
                        disable={selectedSubCategory ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "SINGLE_GROUP" ? (
                  subCategories && subCategories.length > 0 ? (
                    <div className="form-group">
                      <label>Select Sub Category</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={subCategories}
                        selectionLimit="1"
                        // singleSelect={true}
                        displayValue="name"
                        disable={selectedCategory ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}
            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {layoutType === "ITEM_LIST" ? (
                  items && items.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group ">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Items</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={items}
                        displayValue="name"
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}
            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {" "}
                {layoutType === "SINGLE_CATEGORIES" ? (
                  categories && categories.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group ">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Category</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={categories}
                        selectionLimit="1"
                        // singleSelect={true}
                        displayValue="name"
                        disable={selectedSubCategory ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "SINGLE_CATEGORIES" ? (
                  subCategories && subCategories.length > 0 ? (
                    <div className="form-group">
                      <label>Select Sub Category</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={subCategories}
                        selectionLimit="1"
                        // singleSelect={true}
                        displayValue="name"
                        disable={selectedCategory ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}
            {layoutType === "Choose" ? (
              ""
            ) : (
              <>
                {" "}
                {layoutType === "OFFER_CARDS" ? (
                  categories && categories.length > 0 ? (
                    <div className="form-group">
                      <div className="form-group ">
                        <label>Enter Display Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control mb-4"
                          value={displayName}
                          onChange={onChangeDisplayName}
                          placeholder="Display Name"
                        />
                        {(error && displayName.length <= 0) ||
                        (error &&
                          !displayName.match(/^[A-Za-z][A-za-z\s]*$/)) ? (
                          <label className="text-danger">
                            Please fill the details correctly..
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label>Select Categories</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={categories}
                        selectionLimit="2"
                        displayValue="name"
                        // disable={twoSubCategoriesSelected ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                {layoutType === "OFFER_CARDS" ? (
                  subCategories && subCategories.length > 0 ? (
                    <div className="form-group">
                      <label>Select Sub Categories</label>
                      <Multiselect
                        onSelect={onSelectDropDown}
                        onRemove={onRemoveDropDown}
                        options={subCategories}
                        selectionLimit="2"
                        displayValue="name"
                        // disable={twoCategoriesSelected ? true : false}
                      />
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
              </>
            )}

            <div className="col-md-12  text-right mt-4">
              <button
                type="submit"
                className="btn btn-default"
                style={{background: "#0b0e8e", color: "white"}}>
                Add Home Screen Item
              </button>
              {showErrorMessage ? (
                <div className="form-group">
                  {" "}
                  <label>*{errorMessage}</label>{" "}
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
